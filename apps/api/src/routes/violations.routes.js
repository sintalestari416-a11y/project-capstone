import { Router } from 'express';
import prisma from '../config/database.js';

const router = Router();

// GET /api/v1/violations
router.get('/', async (req, res, next) => {
  try {
    const {
      status,
      severity,
      ruleType,
      districtId,
      entityId,
      search,
      page = 1,
      limit = 10,
    } = req.query;

    const where = {};

    const allowedStatuses = ['ACTIVE', 'UNDER_REVIEW', 'RESOLVED'];
    const allowedSeverities = ['CRITICAL', 'WARNING', 'ELEVATED', 'STABLE'];
    const allowedRuleTypes = ['PROXIMITY', 'DENSITY', 'CAPACITY'];

    if (status) {
      const upperStatus = status.toUpperCase();
      if (!allowedStatuses.includes(upperStatus)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid violation status',
        });
      }
      where.status = upperStatus;
    }

    if (severity) {
      const upperSeverity = severity.toUpperCase();
      if (!allowedSeverities.includes(upperSeverity)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid severity',
        });
      }
      where.severity = upperSeverity;
    }

    if (ruleType) {
      const upperRuleType = ruleType.toUpperCase();
      if (!allowedRuleTypes.includes(upperRuleType)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid rule type',
        });
      }
      where.ruleType = upperRuleType;
    }

    if (districtId) where.districtId = districtId;
    if (entityId) where.entityId = entityId;

    if (search) {
      where.OR = [
        { code: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const pageNumber = Math.max(parseInt(page), 1);
    const limitNumber = Math.min(Math.max(parseInt(limit), 1), 100);
    const skip = (pageNumber - 1) * limitNumber;

    const [violations, total] = await Promise.all([
      prisma.violation.findMany({
        where,
        skip,
        take: limitNumber,
        include: {
          entity: {
            select: {
              id: true,
              name: true,
              type: true,
              store: true,
              address: true,
            },
          },
          district: {
            select: {
              id: true,
              name: true,
              code: true,
            },
          },
          zoningRule: {
            select: {
              id: true,
              name: true,
              ruleType: true,
              minDistanceMeters: true,
              maxEntitiesPerZone: true,
            },
          },
        },
        orderBy: {
          detectedAt: 'desc',
        },
      }),
      prisma.violation.count({ where }),
    ]);

    res.json({
      success: true,
      data: violations,
      meta: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
      },
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/violations/summary
router.get('/summary', async (req, res, next) => {
  try {
    const [byStatus, bySeverity, byRuleType, totalActive, totalResolved] = await Promise.all([
      prisma.violation.groupBy({
        by: ['status'],
        _count: {
          status: true,
        },
      }),
      prisma.violation.groupBy({
        by: ['severity'],
        _count: {
          severity: true,
        },
      }),
      prisma.violation.groupBy({
        by: ['ruleType'],
        _count: {
          ruleType: true,
        },
      }),
      prisma.violation.count({
        where: { status: 'ACTIVE' },
      }),
      prisma.violation.count({
        where: { status: 'RESOLVED' },
      }),
    ]);

    res.json({
      success: true,
      data: {
        totalActive,
        totalResolved,
        byStatus: byStatus.map(item => ({
          status: item.status,
          count: item._count.status,
        })),
        bySeverity: bySeverity.map(item => ({
          severity: item.severity,
          count: item._count.severity,
        })),
        byRuleType: byRuleType.map(item => ({
          ruleType: item.ruleType,
          count: item._count.ruleType,
        })),
      },
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/violations/:id
router.get('/:id', async (req, res, next) => {
  try {
    const violation = await prisma.violation.findUnique({
      where: { id: req.params.id },
      include: {
        entity: { include: { district: true } },
        district: true,
        zoningRule: true,
      },
    });
    if (!violation) return res.status(404).json({ success: false, error: 'Violation not found' });
    res.json({ success: true, data: violation });
  } catch (err) { next(err); }
});

// PATCH /api/v1/violations/:id/resolve
router.patch('/:id/resolve', async (req, res, next) => {
  try {
    const existingViolation = await prisma.violation.findUnique({
      where: { id: req.params.id },
    });

    if (!existingViolation) {
      return res.status(404).json({
        success: false,
        error: 'Violation not found',
      });
    }

    const violation = await prisma.violation.update({
      where: { id: req.params.id },
      data: {
        status: 'RESOLVED',
        resolvedAt: new Date(),
      },
    });

    const activeCount = await prisma.violation.count({
      where: {
        entityId: violation.entityId,
        status: 'ACTIVE',
      },
    });

    if (activeCount === 0) {
      await prisma.entity.update({
        where: { id: violation.entityId },
        data: {
          isFlagged: false,
        },
      });
    }

    res.json({
      success: true,
      message: 'Violation resolved successfully',
      data: violation,
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/v1/violations
router.post('/', async (req, res, next) => {
  try {
    const {
      code,
      description,
      ruleType = 'PROXIMITY',
      severity = 'WARNING',
      status = 'ACTIVE',
      distanceM,
      entityId,
      districtId,
      zoningRuleId,
    } = req.body;

    const entity = await prisma.entity.findUnique({
      where: { id: entityId },
    });

    if (!entity) {
      return res.status(404).json({
        success: false,
        error: 'Entity not found',
      });
    }

    const district = await prisma.district.findUnique({
      where: { id: districtId },
    });

    if (!district) {
      return res.status(404).json({
        success: false,
        error: 'District not found',
      });
    }

    if (zoningRuleId) {
      const zoningRule = await prisma.zoningRule.findUnique({
        where: { id: zoningRuleId },
      });

      if (!zoningRule) {
        return res.status(404).json({
          success: false,
          error: 'Zoning rule not found',
        });
      }
    }

    const violation = await prisma.violation.create({
      data: {
        code,
        description,
        ruleType,
        severity,
        status,
        distanceM: distanceM !== undefined ? Number(distanceM) : null,
        entityId,
        districtId,
        zoningRuleId: zoningRuleId || null,
      },
      include: {
        entity: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
        district: {
          select: {
            id: true,
            name: true,
            status: true,
          },
        },
        zoningRule: true,
      },
    });

    if (status === 'ACTIVE') {
      await prisma.entity.update({
        where: { id: entityId },
        data: { isFlagged: true },
      });
    }

    res.status(201).json({
      success: true,
      message: 'Violation created successfully',
      data: violation,
    });
  } catch (err) {
    next(err);
  }
});

// PUT /api/v1/violations/:id
router.put('/:id', async (req, res, next) => {
  try {
    const {
      code,
      description,
      ruleType,
      severity,
      status,
      distanceM,
      entityId,
      districtId,
      zoningRuleId,
      resolvedAt,
    } = req.body;

    const existingViolation = await prisma.violation.findUnique({
      where: { id: req.params.id },
    });

    if (!existingViolation) {
      return res.status(404).json({
        success: false,
        error: 'Violation not found',
      });
    }

    if (entityId) {
      const entity = await prisma.entity.findUnique({
        where: { id: entityId },
      });

      if (!entity) {
        return res.status(404).json({
          success: false,
          error: 'Entity not found',
        });
      }
    }

    if (districtId) {
      const district = await prisma.district.findUnique({
        where: { id: districtId },
      });

      if (!district) {
        return res.status(404).json({
          success: false,
          error: 'District not found',
        });
      }
    }

    if (zoningRuleId) {
      const zoningRule = await prisma.zoningRule.findUnique({
        where: { id: zoningRuleId },
      });

      if (!zoningRule) {
        return res.status(404).json({
          success: false,
          error: 'Zoning rule not found',
        });
      }
    }

    const violation = await prisma.violation.update({
      where: { id: req.params.id },
      data: {
        ...(code !== undefined && { code }),
        ...(description !== undefined && { description }),
        ...(ruleType !== undefined && { ruleType }),
        ...(severity !== undefined && { severity }),
        ...(status !== undefined && { status }),
        ...(distanceM !== undefined && { distanceM: Number(distanceM) }),
        ...(entityId !== undefined && { entityId }),
        ...(districtId !== undefined && { districtId }),
        ...(zoningRuleId !== undefined && { zoningRuleId }),
        ...(resolvedAt !== undefined && {
          resolvedAt: resolvedAt ? new Date(resolvedAt) : null,
        }),
      },
      include: {
        entity: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
        district: {
          select: {
            id: true,
            name: true,
          },
        },
        zoningRule: true,
      },
    });

    res.json({
      success: true,
      message: 'Violation updated successfully',
      data: violation,
    });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/v1/violations/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const violation = await prisma.violation.findUnique({
      where: { id: req.params.id },
    });

    if (!violation) {
      return res.status(404).json({
        success: false,
        error: 'Violation not found',
      });
    }

    await prisma.violation.delete({
      where: { id: req.params.id },
    });

    const activeCount = await prisma.violation.count({
      where: {
        entityId: violation.entityId,
        status: 'ACTIVE',
      },
    });

    if (activeCount === 0) {
      await prisma.entity.update({
        where: { id: violation.entityId },
        data: {
          isFlagged: false,
        },
      });
    }

    res.json({
      success: true,
      message: 'Violation deleted successfully',
    });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/v1/violations/:id/status
router.patch('/:id/status', async (req, res, next) => {
  try {
    const { status } = req.body;

    const allowedStatuses = ['ACTIVE', 'UNDER_REVIEW', 'RESOLVED'];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid violation status',
      });
    }

    const existingViolation = await prisma.violation.findUnique({
      where: { id: req.params.id },
    });

    if (!existingViolation) {
      return res.status(404).json({
        success: false,
        error: 'Violation not found',
      });
    }

    const violation = await prisma.violation.update({
      where: { id: req.params.id },
      data: {
        status,
        resolvedAt: status === 'RESOLVED' ? new Date() : null,
      },
    });

    if (status === 'ACTIVE') {
      await prisma.entity.update({
        where: { id: violation.entityId },
        data: { isFlagged: true },
      });
    }

    if (status === 'RESOLVED') {
      const activeCount = await prisma.violation.count({
        where: {
          entityId: violation.entityId,
          status: 'ACTIVE',
        },
      });

      if (activeCount === 0) {
        await prisma.entity.update({
          where: { id: violation.entityId },
          data: { isFlagged: false },
        });
      }
    }

    res.json({
      success: true,
      message: 'Violation status updated successfully',
      data: violation,
    });
  } catch (err) {
    next(err);
  }
});

export default router;

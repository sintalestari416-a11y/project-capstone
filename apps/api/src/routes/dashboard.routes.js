import { Router } from 'express';
import prisma from '../config/database.js';

const router = Router();

// GET /api/v1/dashboard/kpis
router.get('/kpis', async (req, res, next) => {
  try {
    const [
      totalPasar,
      totalMinimarket,
      totalSupermarket,
      totalEntities,
      totalViolations,
      activeViolations,
      overSaturatedZones,
      totalDistricts,
      flaggedEntities,
      approvedPermits,
    ] = await Promise.all([
      prisma.entity.count({ where: { type: 'PASAR' } }),
      prisma.entity.count({ where: { type: 'MINIMARKET' } }),
      prisma.entity.count({ where: { type: 'SUPERMARKET' } }),
      prisma.entity.count(),
      prisma.violation.count(),
      prisma.violation.count({ where: { status: 'ACTIVE' } }),
      prisma.district.count({ where: { saturationPercent: { gte: 80 } } }),
      prisma.district.count(),
      prisma.entity.count({ where: { isFlagged: true } }),
      prisma.entity.count({ where: { permitStatus: 'APPROVED' } }),
    ]);

    const permitApprovalRate = totalEntities > 0
      ? Math.round((approvedPermits / totalEntities) * 100)
      : 0;

    res.json({
      success: true,
      data: {
        totalPasar: {
          value: totalPasar,
          label: 'Total pasar terdaftar',
        },
        totalMinimarket: {
          value: totalMinimarket,
          label: 'Total minimarket terdaftar',
        },
        totalSupermarket: {
          value: totalSupermarket,
          label: 'Total supermarket terdaftar',
        },
        totalEntities: {
          value: totalEntities,
          label: 'Total seluruh entity',
        },
        activeViolations: {
          value: activeViolations,
          label: 'Pelanggaran aktif',
        },
        totalViolations: {
          value: totalViolations,
          label: 'Total pelanggaran terdeteksi',
        },
        overSaturatedZones: {
          value: overSaturatedZones,
          label: `Dari ${totalDistricts} district`,
        },
        flaggedEntities: {
          value: flaggedEntities,
          label: 'Entity yang ditandai bermasalah',
        },
        permitApprovalRate: {
          value: permitApprovalRate,
          label: 'Persentase izin disetujui',
        },
      },
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/dashboard/heatmap
router.get('/heatmap', async (req, res, next) => {
  try {
    const districts = await prisma.district.findMany({
      select: {
        id: true,
        name: true,
        code: true,
        latitude: true,
        longitude: true,
        saturationPercent: true,
        status: true,
        _count: {
          select: {
            entities: true,
            violations: true,
            audits: true,
          },
        },
      },
      orderBy: {
        saturationPercent: 'desc',
      },
    });

    const data = districts.map(d => ({
      id: d.id,
      name: d.name,
      code: d.code,
      latitude: d.latitude,
      longitude: d.longitude,
      saturationPercent: d.saturationPercent,
      status: d.status,
      entityCount: d._count.entities,
      violationCount: d._count.violations,
      auditCount: d._count.audits,
    }));

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/dashboard/forecast
router.get('/forecast', async (req, res, next) => {
  try {
    const forecasts = await prisma.aiForecast.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
      include: {
        district: {
          select: {
            name: true,
            status: true,
            saturationPercent: true,
          },
        },
      },
    });

    res.json({
      success: true,
      data: forecasts,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/dashboard/top-districts
router.get('/top-districts', async (req, res, next) => {
  try {
    const districts = await prisma.district.findMany({
      orderBy: {
        saturationPercent: 'desc',
      },
      take: 5,
      select: {
        id: true,
        name: true,
        code: true,
        saturationPercent: true,
        status: true,
        _count: {
          select: {
            entities: true,
            violations: true,
          },
        },
      },
    });

    const data = districts.map(d => ({
      id: d.id,
      name: d.name,
      code: d.code,
      saturationPercent: d.saturationPercent,
      status: d.status,
      entityCount: d._count.entities,
      violationCount: d._count.violations,
    }));

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/dashboard/recent-violations
router.get('/recent-violations', async (req, res, next) => {
  try {
    const violations = await prisma.violation.findMany({
      orderBy: {
        detectedAt: 'desc',
      },
      take: 10,
      select: {
        id: true,
        code: true,
        description: true,
        ruleType: true,
        severity: true,
        status: true,
        distanceM: true,
        detectedAt: true,
        entity: {
          select: {
            id: true,
            name: true,
            type: true,
            address: true,
          },
        },
        district: {
          select: {
            id: true,
            name: true,
            status: true,
          },
        },
      },
    });

    res.json({
      success: true,
      data: violations,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/dashboard/entity-summary
router.get('/entity-summary', async (req, res, next) => {
  try {
    const result = await prisma.entity.groupBy({
      by: ['type'],
      _count: {
        type: true,
      },
    });

    const data = result.map(item => ({
      type: item.type,
      count: item._count.type,
    }));

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/dashboard/permit-summary
router.get('/permit-summary', async (req, res, next) => {
  try {
    const result = await prisma.entity.groupBy({
      by: ['permitStatus'],
      _count: {
        permitStatus: true,
      },
    });

    const data = result.map(item => ({
      status: item.permitStatus,
      count: item._count.permitStatus,
    }));

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/dashboard/violation-summary
router.get('/violation-summary', async (req, res, next) => {
  try {
    const [byStatus, bySeverity] = await Promise.all([
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
    ]);

    res.json({
      success: true,
      data: {
        byStatus: byStatus.map(item => ({
          status: item.status,
          count: item._count.status,
        })),
        bySeverity: bySeverity.map(item => ({
          severity: item.severity,
          count: item._count.severity,
        })),
      },
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/dashboard/audit-summary
router.get('/audit-summary', async (req, res, next) => {
  try {
    const [byPriority, byStatus] = await Promise.all([
      prisma.audit.groupBy({
        by: ['priority'],
        _count: {
          priority: true,
        },
      }),
      prisma.audit.groupBy({
        by: ['status'],
        _count: {
          status: true,
        },
      }),
    ]);

    res.json({
      success: true,
      data: {
        byPriority: byPriority.map(item => ({
          priority: item.priority,
          count: item._count.priority,
        })),
        byStatus: byStatus.map(item => ({
          status: item.status,
          count: item._count.status,
        })),
      },
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/dashboard/flagged-clusters
router.get('/flagged-clusters', async (req, res, next) => {
  try {
    const clusters = await prisma.flaggedCluster.findMany({
      orderBy: {
        entityCount: 'desc',
      },
      take: 10,
      include: {
        district: {
          select: {
            id: true,
            name: true,
            status: true,
          },
        },
      },
    });

    res.json({
      success: true,
      data: clusters,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/dashboard/map-entities
router.get('/map-entities', async (req, res, next) => {
  try {
    const entities = await prisma.entity.findMany({
      select: {
        id: true,
        name: true,
        type: true,
        address: true,
        latitude: true,
        longitude: true,
        permitStatus: true,
        complianceScore: true,
        isFlagged: true,
        district: {
          select: {
            id: true,
            name: true,
            status: true,
          },
        },
      },
    });

    res.json({
      success: true,
      data: entities,
    });
  } catch (err) {
    next(err);
  }
});



// GET /api/v1/dashboard/top-districts
router.get('/top-districts', async (req, res, next) => {
  try {
    const districts = await prisma.district.findMany({
      orderBy: { saturationPercent: 'desc' },
      take: 5,
      select: { name: true, saturationPercent: true, status: true },
    });
    res.json({ success: true, data: districts });
  } catch (err) { next(err); }
});

// GET /api/v1/dashboard/recent-violations
router.get('/recent-violations', async (req, res, next) => {
  try {
    const violations = await prisma.violation.findMany({
      orderBy: { detectedAt: 'desc' },
      take: 10,
      include: {
        entity: { select: { name: true, type: true } },
        district: { select: { name: true } },
      },
    });
    res.json({ success: true, data: violations });
  } catch (err) { next(err); }
});

export default router;

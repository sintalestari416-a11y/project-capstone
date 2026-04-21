import { Router } from 'express';
import prisma from '../config/database.js';

const router = Router();

// GET /api/v1/violations
router.get('/', async (req, res, next) => {
  try {
    const { status, severity, districtId, page = 1, limit = 10 } = req.query;
    const where = {};
    if (status) where.status = status.toUpperCase();
    if (severity) where.severity = severity.toUpperCase();
    if (districtId) where.districtId = districtId;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [violations, total] = await Promise.all([
      prisma.violation.findMany({
        where,
        skip,
        take: parseInt(limit),
        include: {
          entity: { select: { name: true, type: true, store: true } },
          district: { select: { name: true } },
        },
        orderBy: { detectedAt: 'desc' },
      }),
      prisma.violation.count({ where }),
    ]);

    res.json({
      success: true,
      data: violations,
      meta: { total, page: parseInt(page), limit: parseInt(limit), totalPages: Math.ceil(total / parseInt(limit)) },
    });
  } catch (err) { next(err); }
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
    const violation = await prisma.violation.update({
      where: { id: req.params.id },
      data: { status: 'RESOLVED', resolvedAt: new Date() },
    });
    // Unflag the entity if no more active violations
    const activeCount = await prisma.violation.count({
      where: { entityId: violation.entityId, status: 'ACTIVE' },
    });
    if (activeCount === 0) {
      await prisma.entity.update({
        where: { id: violation.entityId },
        data: { isFlagged: false },
      });
    }
    res.json({ success: true, data: violation });
  } catch (err) { next(err); }
});

export default router;

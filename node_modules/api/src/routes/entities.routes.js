import { Router } from 'express';
import prisma from '../config/database.js';

const router = Router();

// GET /api/v1/entities
router.get('/', async (req, res, next) => {
  try {
    const { districtId, type, isFlagged, page = 1, limit = 50 } = req.query;
    const where = {};
    if (districtId) where.districtId = districtId;
    if (type) where.type = type.toUpperCase();
    if (isFlagged !== undefined) where.isFlagged = isFlagged === 'true';

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [entities, total] = await Promise.all([
      prisma.entity.findMany({
        where,
        skip,
        take: parseInt(limit),
        include: { district: { select: { name: true, code: true } } },
        orderBy: { name: 'asc' },
      }),
      prisma.entity.count({ where }),
    ]);

    res.json({
      success: true,
      data: entities,
      meta: { total, page: parseInt(page), limit: parseInt(limit), totalPages: Math.ceil(total / parseInt(limit)) },
    });
  } catch (err) { next(err); }
});

// GET /api/v1/entities/:id
router.get('/:id', async (req, res, next) => {
  try {
    const entity = await prisma.entity.findUnique({
      where: { id: req.params.id },
      include: {
        district: true,
        violations: { orderBy: { detectedAt: 'desc' } },
        audits: { orderBy: { createdAt: 'desc' }, take: 5 },
      },
    });
    if (!entity) return res.status(404).json({ success: false, error: 'Entity not found' });
    res.json({ success: true, data: entity });
  } catch (err) { next(err); }
});

// GET /api/v1/entities/:id/nearby — PostGIS-style distance calculation using Haversine
router.get('/:id/nearby', async (req, res, next) => {
  try {
    const { radius = 500 } = req.query;
    const entity = await prisma.entity.findUnique({ where: { id: req.params.id } });
    if (!entity) return res.status(404).json({ success: false, error: 'Entity not found' });

    // Use raw SQL with PostGIS ST_DWithin for accurate spatial query
    const radiusMeters = parseFloat(radius);
    const nearby = await prisma.$queryRaw`
      SELECT 
        e.id, e.name, e.type, e.latitude, e.longitude, e.store, e.kelurahan,
        e."isFlagged", e."complianceScore", e."districtId",
        (6371000 * acos(
          cos(radians(${entity.latitude})) * cos(radians(e.latitude)) *
          cos(radians(e.longitude) - radians(${entity.longitude})) +
          sin(radians(${entity.latitude})) * sin(radians(e.latitude))
        )) AS distance_meters
      FROM entities e
      WHERE e.id != ${entity.id}
        AND (6371000 * acos(
          cos(radians(${entity.latitude})) * cos(radians(e.latitude)) *
          cos(radians(e.longitude) - radians(${entity.longitude})) +
          sin(radians(${entity.latitude})) * sin(radians(e.latitude))
        )) <= ${radiusMeters}
      ORDER BY distance_meters
      LIMIT 20
    `;

    res.json({ success: true, data: nearby });
  } catch (err) { next(err); }
});

export default router;

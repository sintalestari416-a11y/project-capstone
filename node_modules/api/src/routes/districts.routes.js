import { Router } from 'express';
import prisma from '../config/database.js';

const router = Router();

// GET /api/v1/districts
router.get('/', async (req, res, next) => {
  try {
    const { status, sortBy = 'saturationPercent', order = 'desc' } = req.query;
    const where = status ? { status: status.toUpperCase() } : {};
    const districts = await prisma.district.findMany({
      where,
      orderBy: { [sortBy]: order },
      include: {
        _count: { select: { entities: true, violations: true } },
      },
    });
    res.json({ success: true, data: districts });
  } catch (err) { next(err); }
});

// GET /api/v1/districts/rankings
router.get('/rankings', async (req, res, next) => {
  try {
    const districts = await prisma.district.findMany({
      orderBy: { saturationPercent: 'desc' },
      include: {
        _count: { select: { entities: true, violations: true } },
        flaggedClusters: true,
        forecasts: { take: 1, orderBy: { createdAt: 'desc' } },
      },
    });

    const rankings = districts.map((d, idx) => ({
      position: idx + 1,
      id: d.id,
      name: d.name,
      code: d.code,
      latitude: d.latitude,
      longitude: d.longitude,
      saturationPercent: d.saturationPercent,
      status: d.status,
      violationCount: d._count.violations,
      entityCount: d._count.entities,
      flaggedClusters: d.flaggedClusters,
      recommendation: d.forecasts[0] || null,
    }));

    res.json({ success: true, data: rankings });
  } catch (err) { next(err); }
});

// GET /api/v1/districts/:id
router.get('/:id', async (req, res, next) => {
  try {
    const district = await prisma.district.findUnique({
      where: { id: req.params.id },
      include: {
        _count: { select: { entities: true, violations: true, audits: true } },
        flaggedClusters: true,
        forecasts: { take: 1, orderBy: { createdAt: 'desc' } },
      },
    });
    if (!district) return res.status(404).json({ success: false, error: 'District not found' });
    res.json({ success: true, data: district });
  } catch (err) { next(err); }
});

// GET /api/v1/districts/:id/clusters
router.get('/:id/clusters', async (req, res, next) => {
  try {
    const clusters = await prisma.flaggedCluster.findMany({
      where: { districtId: req.params.id },
    });
    res.json({ success: true, data: clusters });
  } catch (err) { next(err); }
});

// GET /api/v1/districts/:id/comparison
router.get('/:id/comparison', async (req, res, next) => {
  try {
    const district = await prisma.district.findUnique({
      where: { id: req.params.id },
      include: {
        _count: { select: { entities: true, violations: true, audits: true } },
      },
    });
    if (!district) return res.status(404).json({ success: false, error: 'District not found' });

    // Generate radar chart data
    const radarData = {
      districtName: district.name,
      axes: {
        density: Math.min(district._count.entities / 100 * 100, 100),
        permits: Math.floor(Math.random() * 40 + 60),
        complaints: Math.floor(Math.random() * 30 + 10),
        violations: Math.min(district._count.violations / 20 * 100, 100),
        zoningArea: district.saturationPercent,
      },
    };
    res.json({ success: true, data: radarData });
  } catch (err) { next(err); }
});

export default router;

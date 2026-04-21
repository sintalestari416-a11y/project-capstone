import { Router } from 'express';
import prisma from '../config/database.js';

const router = Router();

// GET /api/v1/dashboard/kpis
router.get('/kpis', async (req, res, next) => {
  try {
    const [totalPasar, totalMinimarket, totalViolations, overSaturatedZones] = await Promise.all([
      prisma.entity.count({ where: { type: 'PASAR' } }),
      prisma.entity.count({ where: { type: 'MINIMARKET' } }),
      prisma.violation.count({ where: { status: 'ACTIVE' } }),
      prisma.district.count({ where: { saturationPercent: { gte: 80 } } }),
    ]);

    res.json({
      success: true,
      data: {
        totalPasar: { value: totalPasar, trend: -2, label: 'from last quarter' },
        totalMinimarket: { value: totalMinimarket, trend: 12, label: 'from last quarter' },
        violationsDetected: { value: totalViolations, trend: null, label: 'Critical action required' },
        overSaturatedZones: { value: overSaturatedZones, trend: null, label: `Across ${overSaturatedZones} districts` },
      },
    });
  } catch (err) { next(err); }
});

// GET /api/v1/dashboard/heatmap
router.get('/heatmap', async (req, res, next) => {
  try {
    const districts = await prisma.district.findMany({
      select: { name: true, latitude: true, longitude: true, saturationPercent: true, status: true },
    });
    res.json({ success: true, data: districts });
  } catch (err) { next(err); }
});

// GET /api/v1/dashboard/forecast
router.get('/forecast', async (req, res, next) => {
  try {
    const forecast = await prisma.aiForecast.findFirst({
      orderBy: { createdAt: 'desc' },
      include: { district: { select: { name: true } } },
    });
    res.json({ success: true, data: forecast });
  } catch (err) { next(err); }
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

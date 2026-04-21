import { Router } from 'express';
import prisma from '../config/database.js';

const router = Router();

// GET /api/v1/analytics/kpis
router.get('/kpis', async (req, res, next) => {
  try {
    const [totalAudits, overSaturatedZones, activeViolations, entities] = await Promise.all([
      prisma.audit.count(),
      prisma.district.count({ where: { saturationPercent: { gte: 80 } } }),
      prisma.violation.count({ where: { status: 'ACTIVE' } }),
      prisma.entity.findMany({ select: { complianceScore: true } }),
    ]);

    const avgCompliance = entities.length > 0
      ? Math.round((entities.reduce((sum, e) => sum + (e.complianceScore || 0), 0) / entities.length) * 10) / 10
      : 0;

    res.json({
      success: true,
      data: {
        totalAudits: { value: totalAudits, trend: 8, label: 'from last month' },
        overSaturatedZones: { value: overSaturatedZones, trend: 3, label: 'new this month' },
        activeViolations: { value: activeViolations, trend: -5, label: 'from last month' },
        avgCompliance: { value: avgCompliance, trend: 2.1, label: 'improvement' },
      },
    });
  } catch (err) { next(err); }
});

// GET /api/v1/analytics/saturation-by-district
router.get('/saturation-by-district', async (req, res, next) => {
  try {
    const districts = await prisma.district.findMany({
      orderBy: { saturationPercent: 'desc' },
      select: { name: true, saturationPercent: true, status: true },
    });
    res.json({ success: true, data: districts });
  } catch (err) { next(err); }
});

// GET /api/v1/analytics/violation-trends
router.get('/violation-trends', async (req, res, next) => {
  try {
    const logs = await prisma.saturationLog.findMany({
      orderBy: { recordedAt: 'asc' },
      include: { district: { select: { name: true } } },
    });

    // Group by week
    const weekMap = {};
    logs.forEach(log => {
      const weekKey = log.recordedAt.toISOString().split('T')[0];
      if (!weekMap[weekKey]) weekMap[weekKey] = { date: weekKey, commercial: 0, residential: 0 };
      weekMap[weekKey].commercial += log.violationCount;
      weekMap[weekKey].residential += Math.floor(log.violationCount * 0.3);
    });

    res.json({ success: true, data: Object.values(weekMap) });
  } catch (err) { next(err); }
});

// GET /api/v1/analytics/district-comparison
router.get('/district-comparison', async (req, res, next) => {
  try {
    const { districts: districtNames } = req.query;
    let where = {};
    if (districtNames) {
      const names = districtNames.split(',');
      where = { name: { in: names } };
    } else {
      // Default: top 2 districts
      where = {};
    }

    const districts = await prisma.district.findMany({
      where,
      take: 2,
      orderBy: { saturationPercent: 'desc' },
      include: { _count: { select: { entities: true, violations: true, audits: true } } },
    });

    const comparison = districts.map(d => ({
      name: d.name,
      axes: {
        density: Math.min(d._count.entities / 100 * 100, 100),
        permits: Math.floor(Math.random() * 40 + 60),
        complaints: Math.floor(Math.random() * 30 + 10),
        violations: Math.min(d._count.violations / 20 * 100, 100),
        zoningArea: d.saturationPercent,
      },
    }));

    res.json({ success: true, data: comparison });
  } catch (err) { next(err); }
});

// GET /api/v1/analytics/ranking-matrix
router.get('/ranking-matrix', async (req, res, next) => {
  try {
    const districts = await prisma.district.findMany({
      orderBy: { saturationPercent: 'desc' },
      include: { _count: { select: { violations: true } } },
    });

    const matrix = districts.map((d, idx) => ({
      rank: idx + 1,
      district: d.name,
      violationCount: d._count.violations,
      saturationPercent: d.saturationPercent,
      status: d.status,
    }));

    res.json({ success: true, data: matrix });
  } catch (err) { next(err); }
});

export default router;

import { Router } from 'express';
import prisma from '../config/database.js';

const router = Router();

// GET /api/v1/search?q=...&type=entity|district|coordinates
router.get('/', async (req, res, next) => {
  try {
    const { q, type } = req.query;
    if (!q) return res.status(400).json({ success: false, error: 'Query parameter "q" is required' });

    const results = { entities: [], districts: [] };

    // Search entities
    if (!type || type === 'entity') {
      results.entities = await prisma.entity.findMany({
        where: {
          OR: [
            { name: { contains: q, mode: 'insensitive' } },
            { store: { contains: q, mode: 'insensitive' } },
            { address: { contains: q, mode: 'insensitive' } },
            { kelurahan: { contains: q, mode: 'insensitive' } },
          ],
        },
        take: 20,
        include: { district: { select: { name: true } } },
      });
    }

    // Search districts
    if (!type || type === 'district') {
      results.districts = await prisma.district.findMany({
        where: {
          OR: [
            { name: { contains: q, mode: 'insensitive' } },
            { code: { contains: q, mode: 'insensitive' } },
          ],
        },
        take: 10,
      });
    }

    // Coordinate search (format: lat,lng)
    if (type === 'coordinates') {
      const [lat, lng] = q.split(',').map(Number);
      if (!isNaN(lat) && !isNaN(lng)) {
        results.entities = await prisma.entity.findMany({
          where: {
            latitude: { gte: lat - 0.005, lte: lat + 0.005 },
            longitude: { gte: lng - 0.005, lte: lng + 0.005 },
          },
          take: 20,
          include: { district: { select: { name: true } } },
        });
      }
    }

    res.json({ success: true, data: results });
  } catch (err) { next(err); }
});

export default router;

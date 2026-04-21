import { Router } from 'express';
import prisma from '../config/database.js';

const router = Router();

// GET /api/v1/settings
router.get('/', async (req, res, next) => {
  try {
    const settings = await prisma.systemSetting.findMany();
    const settingsObj = {};
    settings.forEach(s => { settingsObj[s.key] = s.value; });
    res.json({ success: true, data: settingsObj });
  } catch (err) { next(err); }
});

// PATCH /api/v1/settings
router.patch('/', async (req, res, next) => {
  try {
    const updates = req.body;
    for (const [key, value] of Object.entries(updates)) {
      await prisma.systemSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
    }
    res.json({ success: true, data: updates });
  } catch (err) { next(err); }
});

// POST /api/v1/settings/sync
router.post('/sync', async (req, res, next) => {
  try {
    await prisma.systemSetting.upsert({
      where: { key: 'lastSyncAt' },
      update: { value: new Date().toISOString() },
      create: { key: 'lastSyncAt', value: new Date().toISOString() },
    });
    res.json({ success: true, data: { synced: true, timestamp: new Date().toISOString() } });
  } catch (err) { next(err); }
});

export default router;

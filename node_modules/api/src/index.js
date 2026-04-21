import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import dashboardRoutes from './routes/dashboard.routes.js';
import districtRoutes from './routes/districts.routes.js';
import entityRoutes from './routes/entities.routes.js';
import violationRoutes from './routes/violations.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';
import settingsRoutes from './routes/settings.routes.js';
import searchRoutes from './routes/search.routes.js';

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Middleware ──────────────────────────────────────────
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174'], credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

// ─── API Routes ─────────────────────────────────────────
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/districts', districtRoutes);
app.use('/api/v1/entities', entityRoutes);
app.use('/api/v1/violations', violationRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/settings', settingsRoutes);
app.use('/api/v1/search', searchRoutes);

// ─── Health Check ───────────────────────────────────────
app.get('/api/v1/health', (req, res) => {
  res.json({ success: true, data: { status: 'ok', timestamp: new Date().toISOString() } });
});

// ─── Error Handler ──────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error',
  });
});

// ─── Start Server ───────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Zonify API running at http://localhost:${PORT}`);
  console.log(`📡 API Base: http://localhost:${PORT}/api/v1`);
  console.log(`💚 Health:   http://localhost:${PORT}/api/v1/health\n`);
});

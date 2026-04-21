import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

// ─── CSV Parser ──────────────────────────────────────────
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') { inQuotes = !inQuotes; }
    else if (ch === ',' && !inQuotes) { result.push(current.trim()); current = ''; }
    else { current += ch; }
  }
  result.push(current.trim());
  return result;
}

function readCSV(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const lines = text.split('\n').filter(l => l.trim());
  const header = parseCSVLine(lines[0]);
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = parseCSVLine(lines[i]);
    const row = {};
    header.forEach((h, idx) => {
      // Handle duplicate place_id column
      const key = idx === 8 ? 'place_id_2' : h;
      row[key] = cols[idx] || '';
    });
    rows.push(row);
  }
  return rows;
}

// ─── District Metadata ────────────────────────────────────
const DISTRICT_META = {
  'Cilandak':           { code: 'JKT-S-CLK-01', lat: -6.2850, lng: 106.7920, saturation: 78 },
  'Jagakarsa':          { code: 'JKT-S-JGK-02', lat: -6.3400, lng: 106.8250, saturation: 92 },
  'Kebayoran Baru':     { code: 'JKT-S-KBB-03', lat: -6.2420, lng: 106.7830, saturation: 82 },
  'Kebayoran Lama':     { code: 'JKT-S-KBL-04', lat: -6.2500, lng: 106.7750, saturation: 88 },
  'Mampang Prapatan':   { code: 'JKT-S-MPP-05', lat: -6.2470, lng: 106.8250, saturation: 74 },
  'Pancoran':           { code: 'JKT-S-PCR-06', lat: -6.2480, lng: 106.8400, saturation: 68 },
  'Pasar Minggu':       { code: 'JKT-S-PMG-07', lat: -6.2850, lng: 106.8450, saturation: 71 },
  'Pesanggrahan':       { code: 'JKT-S-PSG-08', lat: -6.2650, lng: 106.7600, saturation: 85 },
  'Setiabudi':          { code: 'JKT-S-STB-09', lat: -6.2190, lng: 106.8300, saturation: 98 },
  'Tebet':              { code: 'JKT-S-TBT-10', lat: -6.2270, lng: 106.8520, saturation: 65 },
};

function getDistrictStatus(saturation) {
  if (saturation >= 90) return 'CRITICAL';
  if (saturation >= 80) return 'WARNING';
  if (saturation >= 70) return 'ELEVATED';
  if (saturation >= 50) return 'STABLE';
  return 'SAFE';
}

// ─── Main Seed Function ──────────────────────────────────
async function main() {
  console.log('🌱 Starting Zonify Database Seeder...\n');

  // ── 1. Clean existing data ──
  console.log('🗑️  Cleaning existing data...');
  await prisma.flaggedCluster.deleteMany();
  await prisma.aiForecast.deleteMany();
  await prisma.saturationLog.deleteMany();
  await prisma.audit.deleteMany();
  await prisma.violation.deleteMany();
  await prisma.entity.deleteMany();
  await prisma.zoningRule.deleteMany();
  await prisma.district.deleteMany();
  await prisma.systemSetting.deleteMany();

  // ── 2. Seed Districts ──
  console.log('📍 Seeding districts...');
  const districtMap = {};
  for (const [name, meta] of Object.entries(DISTRICT_META)) {
    const district = await prisma.district.create({
      data: {
        name,
        code: meta.code,
        latitude: meta.lat,
        longitude: meta.lng,
        saturationPercent: meta.saturation,
        status: getDistrictStatus(meta.saturation),
      },
    });
    districtMap[name] = district;
  }
  console.log(`   ✅ Created ${Object.keys(districtMap).length} districts`);

  // ── 3. Seed Entities from CSV ──
  console.log('🏪 Importing entities from CSV...');
  const csvPath = path.join(__dirname, 'data', 'DATA_JAKSEL_FIXED_CLEANED.csv');
  const rows = readCSV(csvPath);
  console.log(`   📄 Found ${rows.length} rows in CSV`);

  let importedCount = 0;
  let skippedCount = 0;
  const seenPlaceIds = new Set();

  for (const row of rows) {
    const kecamatan = row.nama_kecamatan;
    const district = districtMap[kecamatan];
    if (!district) {
      skippedCount++;
      continue;
    }

    const placeId = row.place_id;
    if (seenPlaceIds.has(placeId)) {
      skippedCount++;
      continue;
    }
    seenPlaceIds.add(placeId);

    const lat = parseFloat(row.latitude);
    const lng = parseFloat(row.longitude);
    if (isNaN(lat) || isNaN(lng)) {
      skippedCount++;
      continue;
    }

    // Map store type: Alfamart/Indomaret → MINIMARKET
    const entityType = 'MINIMARKET';
    const storeName = row.store || 'Unknown';
    const entityName = row.nama_tempat || storeName;

    await prisma.entity.create({
      data: {
        name: entityName,
        type: entityType,
        store: storeName,
        address: row.alamat_tempat || null,
        latitude: lat,
        longitude: lng,
        placeId: placeId || null,
        kelurahan: row.nama_kelurahan || null,
        rating: parseFloat(row.rating_tempat) || 0,
        totalRatings: parseInt(row.user_ratings_total) || 0,
        permitStatus: 'APPROVED',
        complianceScore: Math.floor(Math.random() * 30) + 70, // 70-100
        isFlagged: false,
        districtId: district.id,
      },
    });
    importedCount++;
  }
  console.log(`   ✅ Imported ${importedCount} minimarket entities (skipped ${skippedCount})`);

  // ── 4. Seed Pasar (Traditional Markets) ──
  console.log('🏬 Seeding traditional markets (Pasar)...');
  const pasarData = [
    { name: 'Pasar Santa',          district: 'Kebayoran Baru',     lat: -6.2430, lng: 106.7940, kelurahan: 'Senayan' },
    { name: 'Pasar Cipulir',        district: 'Kebayoran Lama',     lat: -6.2550, lng: 106.7700, kelurahan: 'Cipulir' },
    { name: 'Pasar Minggu',         district: 'Pasar Minggu',       lat: -6.2840, lng: 106.8440, kelurahan: 'Pasar Minggu' },
    { name: 'Pasar Lenteng Agung',  district: 'Jagakarsa',          lat: -6.3350, lng: 106.8300, kelurahan: 'Lenteng Agung' },
    { name: 'Pasar Cilandak',       district: 'Cilandak',           lat: -6.2900, lng: 106.7950, kelurahan: 'Cilandak Barat' },
    { name: 'Pasar Tebet',          district: 'Tebet',              lat: -6.2280, lng: 106.8500, kelurahan: 'Tebet Barat' },
    { name: 'Pasar Mampang',        district: 'Mampang Prapatan',   lat: -6.2470, lng: 106.8220, kelurahan: 'Mampang Prapatan' },
    { name: 'Pasar Pancoran',       district: 'Pancoran',           lat: -6.2510, lng: 106.8420, kelurahan: 'Pancoran' },
    { name: 'Pasar Bata Putih',     district: 'Setiabudi',          lat: -6.2200, lng: 106.8350, kelurahan: 'Karet Kuningan' },
    { name: 'Pasar Pesanggrahan',   district: 'Pesanggrahan',       lat: -6.2680, lng: 106.7550, kelurahan: 'Pesanggrahan' },
    { name: 'Pasar Bintaro',        district: 'Pesanggrahan',       lat: -6.2720, lng: 106.7620, kelurahan: 'Bintaro' },
    { name: 'Pasar Kebayoran Lama', district: 'Kebayoran Lama',     lat: -6.2450, lng: 106.7800, kelurahan: 'Kebayoran Lama Selatan' },
    { name: 'Pasar Rumput',         district: 'Setiabudi',          lat: -6.2150, lng: 106.8380, kelurahan: 'Guntur' },
    { name: 'Pasar Jagakarsa',      district: 'Jagakarsa',          lat: -6.3420, lng: 106.8200, kelurahan: 'Jagakarsa' },
    { name: 'Pasar Kalibata',       district: 'Pancoran',           lat: -6.2580, lng: 106.8520, kelurahan: 'Kalibata' },
  ];

  for (const p of pasarData) {
    const dist = districtMap[p.district];
    if (!dist) continue;
    await prisma.entity.create({
      data: {
        name: p.name,
        type: 'PASAR',
        address: `${p.name}, ${p.district}, Jakarta Selatan`,
        latitude: p.lat,
        longitude: p.lng,
        kelurahan: p.kelurahan,
        rating: Math.round((Math.random() * 2 + 3) * 10) / 10, // 3.0-5.0
        totalRatings: Math.floor(Math.random() * 500) + 50,
        permitStatus: 'APPROVED',
        complianceScore: 95,
        isFlagged: false,
        districtId: dist.id,
      },
    });
  }
  console.log(`   ✅ Created ${pasarData.length} traditional markets`);

  // ── 5. Seed Zoning Rules ──
  console.log('📏 Seeding zoning rules...');
  const rules = await Promise.all([
    prisma.zoningRule.create({
      data: {
        name: 'Minimarket Proximity to Pasar',
        ruleType: 'PROXIMITY',
        minDistanceMeters: 400,
        targetEntityType: 'MINIMARKET',
        referenceEntityType: 'PASAR',
      },
    }),
    prisma.zoningRule.create({
      data: {
        name: 'Minimarket Mutual Proximity',
        ruleType: 'PROXIMITY',
        minDistanceMeters: 100,
        targetEntityType: 'MINIMARKET',
        referenceEntityType: 'MINIMARKET',
      },
    }),
    prisma.zoningRule.create({
      data: {
        name: 'Zone Capacity Limit',
        ruleType: 'CAPACITY',
        maxEntitiesPerZone: 15,
        targetEntityType: 'MINIMARKET',
      },
    }),
  ]);
  console.log(`   ✅ Created ${rules.length} zoning rules`);

  // ── 6. Generate Violations ──
  console.log('⚠️  Generating violations...');
  const minimarkets = await prisma.entity.findMany({
    where: { type: 'MINIMARKET' },
    take: 50,
    include: { district: true },
  });

  const violationCodes = [];
  let vCount = 0;
  for (let i = 0; i < Math.min(47, minimarkets.length); i++) {
    const entity = minimarkets[i];
    const code = `#V-${8800 + i}`;
    violationCodes.push(code);
    const severity = i < 12 ? 'CRITICAL' : i < 25 ? 'WARNING' : 'ELEVATED';
    const status = i < 35 ? 'ACTIVE' : 'RESOLVED';

    await prisma.violation.create({
      data: {
        code,
        description: i % 2 === 0
          ? `${entity.name} is within 400m of a traditional market`
          : `${entity.name} exceeds zone minimarket density limit`,
        ruleType: i % 2 === 0 ? 'PROXIMITY' : 'DENSITY',
        severity,
        status,
        distanceM: Math.floor(Math.random() * 350) + 50,
        entityId: entity.id,
        districtId: entity.districtId,
        zoningRuleId: i % 2 === 0 ? rules[0].id : rules[2].id,
        detectedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        resolvedAt: status === 'RESOLVED' ? new Date() : null,
      },
    });
    vCount++;

    // Flag the entity
    if (status === 'ACTIVE') {
      await prisma.entity.update({
        where: { id: entity.id },
        data: { isFlagged: true, complianceScore: Math.floor(Math.random() * 40) + 20 },
      });
    }
  }
  console.log(`   ✅ Created ${vCount} violations`);

  // ── 7. Seed Audits ──
  console.log('📋 Seeding audits...');
  const auditEntities = minimarkets.slice(0, 20);
  for (let i = 0; i < auditEntities.length; i++) {
    const entity = auditEntities[i];
    await prisma.audit.create({
      data: {
        code: `#MZ-${9900 + i}-X`,
        priority: i < 5 ? 'HIGH' : i < 12 ? 'MEDIUM' : 'LOW',
        status: i < 10 ? 'COMPLETED' : 'PENDING',
        findings: i < 10 ? `Audit completed. ${i % 2 === 0 ? 'Violation confirmed' : 'Compliant'}` : null,
        entityId: entity.id,
        districtId: entity.districtId,
        completedAt: i < 10 ? new Date() : null,
      },
    });
  }
  console.log(`   ✅ Created ${auditEntities.length} audits`);

  // ── 8. Seed Saturation Logs (4 weeks of history) ──
  console.log('📊 Seeding saturation history...');
  let logCount = 0;
  for (const [name, district] of Object.entries(districtMap)) {
    const baseSaturation = DISTRICT_META[name].saturation;
    for (let week = 0; week < 4; week++) {
      const date = new Date();
      date.setDate(date.getDate() - (week * 7));
      await prisma.saturationLog.create({
        data: {
          saturationPercent: baseSaturation + (Math.random() * 10 - 5),
          violationCount: Math.floor(Math.random() * 15) + 3,
          districtId: district.id,
          recordedAt: date,
        },
      });
      logCount++;
    }
  }
  console.log(`   ✅ Created ${logCount} saturation log entries`);

  // ── 9. Seed Flagged Clusters ──
  console.log('🔴 Seeding flagged clusters...');
  const clusterData = [
    { district: 'Setiabudi',        street: 'Jl. Rasuna Said',      desc: '8 unzoned commercial entities within 200m', count: 8 },
    { district: 'Jagakarsa',        street: 'Jl. Raya Jagakarsa',   desc: '12 minimarkets exceeding zone capacity', count: 12 },
    { district: 'Kebayoran Lama',   street: 'Jl. Cipulir Raya',     desc: '6 Alfamart/Indomaret within 100m radius', count: 6 },
    { district: 'Kebayoran Baru',   street: 'Jl. Senopati',         desc: '5 retail stores near Pasar Santa', count: 5 },
    { district: 'Pesanggrahan',     street: 'Jl. Bintaro Utama',    desc: '9 minimarkets in residential zone', count: 9 },
    { district: 'Tebet',            street: 'Jl. Tebet Raya',       desc: '4 stores violating proximity to Pasar Tebet', count: 4 },
    { district: 'Pancoran',         street: 'Jl. Kalibata Raya',    desc: '7 unzoned commercial near Pasar Kalibata', count: 7 },
    { district: 'Mampang Prapatan', street: 'Jl. Mampang Prapatan', desc: '42 unzoned commercial', count: 42 },
  ];

  for (const c of clusterData) {
    const dist = districtMap[c.district];
    if (!dist) continue;
    await prisma.flaggedCluster.create({
      data: {
        streetName: c.street,
        description: c.desc,
        entityCount: c.count,
        districtId: dist.id,
      },
    });
  }
  console.log(`   ✅ Created ${clusterData.length} flagged clusters`);

  // ── 10. Seed AI Forecasts ──
  console.log('🤖 Seeding AI forecasts...');
  const forecastData = [
    { district: 'Tebet',      prob: 92, pred: 'Minimarket saturation projected to exceed critical threshold. Recommend moratorium on new permits.', months: 6 },
    { district: 'Setiabudi',  prob: 88, pred: 'High density zone reaching capacity. Enforcement action recommended within 3 months.', months: 3 },
    { district: 'Jagakarsa',  prob: 76, pred: 'Moderate growth trajectory. Monitor Lenteng Agung corridor for emerging clusters.', months: 6 },
  ];

  for (const f of forecastData) {
    const dist = districtMap[f.district];
    if (!dist) continue;
    await prisma.aiForecast.create({
      data: {
        probability: f.prob,
        prediction: f.pred,
        timeframeMonths: f.months,
        districtId: dist.id,
      },
    });
  }
  console.log(`   ✅ Created ${forecastData.length} AI forecasts`);

  // ── 11. Seed System Settings ──
  console.log('⚙️  Seeding system settings...');
  const settings = [
    { key: 'defaultBasemap', value: 'satellite-streets' },
    { key: 'telemetryZoom', value: 14 },
    { key: 'auditRadiusRings', value: true },
    { key: 'alertCriticalViolations', value: true },
    { key: 'alertAuditSync', value: true },
    { key: 'alertEngineUpdates', value: false },
    { key: 'interfaceTheme', value: 'dark' },
    { key: 'lastSyncAt', value: new Date().toISOString() },
  ];

  for (const s of settings) {
    await prisma.systemSetting.create({
      data: { key: s.key, value: s.value },
    });
  }
  console.log(`   ✅ Created ${settings.length} system settings`);

  // ── Summary ──
  const counts = {
    districts: await prisma.district.count(),
    entities: await prisma.entity.count(),
    violations: await prisma.violation.count(),
    audits: await prisma.audit.count(),
    zoningRules: await prisma.zoningRule.count(),
    saturationLogs: await prisma.saturationLog.count(),
    flaggedClusters: await prisma.flaggedCluster.count(),
    forecasts: await prisma.aiForecast.count(),
    settings: await prisma.systemSetting.count(),
  };

  console.log('\n🎉 Seeding complete!');
  console.log('═══════════════════════════════════════');
  console.log(`   Districts:        ${counts.districts}`);
  console.log(`   Entities:         ${counts.entities}`);
  console.log(`   Violations:       ${counts.violations}`);
  console.log(`   Audits:           ${counts.audits}`);
  console.log(`   Zoning Rules:     ${counts.zoningRules}`);
  console.log(`   Saturation Logs:  ${counts.saturationLogs}`);
  console.log(`   Flagged Clusters: ${counts.flaggedClusters}`);
  console.log(`   AI Forecasts:     ${counts.forecasts}`);
  console.log(`   System Settings:  ${counts.settings}`);
  console.log('═══════════════════════════════════════\n');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

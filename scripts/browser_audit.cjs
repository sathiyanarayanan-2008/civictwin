const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://127.0.0.1:5173';
const SCREENSHOT_DIR = path.resolve(__dirname, '..', 'docs', 'screenshots');

const ROUTES = [
  { path: '/', name: '01_landing_page' },
  { path: '/app/command-centre', name: '02_command_centre' },
  { path: '/app/digital-twin', name: '03_digital_twin_3d' },
  { path: '/app/risk-map', name: '04_predictive_risk_map' },
  { path: '/app/agents', name: '05_ai_agent_centre' },
  { path: '/app/simulation-lab', name: '06_simulation_lab' },
  { path: '/app/prevention-comparator', name: '07_prevention_comparator' },
  { path: '/app/resource-planner', name: '08_resource_planner' },
  { path: '/app/citizen-reporting', name: '09_citizen_reporting' },
  { path: '/app/weather', name: '10_weather_intelligence' },
  { path: '/app/infrastructure', name: '11_infrastructure_monitoring' },
  { path: '/app/explainable-ai', name: '12_explainable_ai' },
  { path: '/app/alerts', name: '13_alerts_notifications' },
  { path: '/app/analytics', name: '14_analytics_reports' },
  { path: '/app/architecture', name: '15_project_architecture' },
  { path: '/app/settings', name: '16_settings_data_sources' },
  { path: '/app/profile', name: '17_user_profile' },
  { path: '/app/about', name: '18_about_project' }
];

async function runAudit() {
  console.log('=== COMMENCING CIVICTWIN AI PLAYWRIGHT BROWSER AUDIT ===');
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  const auditReport = {
    timestamp: new Date().toISOString(),
    routesTested: [],
    consoleErrors: [],
    failedRequests: []
  };

  page.on('console', msg => {
    if (msg.type() === 'error') {
      const text = msg.text();
      // Ignore innocuous React / WebGL warnings if any
      auditReport.consoleErrors.push({ url: page.url(), message: text });
      console.error(`[Console Error] ${text.slice(0, 120)}`);
    }
  });

  page.on('requestfailed', req => {
    auditReport.failedRequests.push({
      url: req.url(),
      failure: req.failure() ? req.failure().errorText : 'unknown'
    });
    console.warn(`[Failed Request] ${req.url()}`);
  });

  for (const route of ROUTES) {
    const targetUrl = `${BASE_URL}${route.path}`;
    process.stdout.write(`Testing [${route.name}] (${route.path}) ... `);
    try {
      const resp = await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
      const status = resp ? resp.status() : 200;
      
      // Wait slightly for canvas/animations to stabilize
      await page.waitForTimeout(2000);

      const shotPath = path.join(SCREENSHOT_DIR, `${route.name}.png`);
      await page.screenshot({ path: shotPath, fullPage: false });

      auditReport.routesTested.push({
        name: route.name,
        path: route.path,
        status: status,
        screenshot: shotPath,
        passed: status >= 200 && status < 400
      });
      console.log(`PASS (${status}) - Saved screenshot`);
    } catch (err) {
      console.log(`FAIL: ${err.message}`);
      auditReport.routesTested.push({
        name: route.name,
        path: route.path,
        error: err.message,
        passed: false
      });
    }
  }

  // Responsive Tests on Command Centre
  console.log('\n--- Testing Responsive Viewports on Command Centre ---');
  // Tablet
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto(`${BASE_URL}/app/command-centre`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'responsive_tablet_768px.png') });
  console.log('Tablet (768px) screenshot captured.');

  // Mobile
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${BASE_URL}/app/command-centre`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'responsive_mobile_375px.png') });
  console.log('Mobile (375px) screenshot captured.');

  await browser.close();

  const outJsonPath = path.resolve(__dirname, 'browser_audit_results.json');
  fs.writeFileSync(outJsonPath, JSON.stringify(auditReport, null, 2));
  console.log(`\nAudit finished! Results written to ${outJsonPath}`);
}

runAudit().catch(err => {
  console.error('Fatal audit failure:', err);
  process.exit(1);
});

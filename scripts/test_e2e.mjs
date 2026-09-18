// Informational Website Verification Script
const BASE_URL = "http://localhost:3000";

async function runTests() {
  console.log("=== STARTING INFORMATIONAL WEBSITE VERIFICATION ===\n");
  let passed = 0;
  let failed = 0;

  function assert(condition, testName, details = "") {
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${testName} - ${details}`);
      failed++;
    }
  }

  // TEST 1: GET /api/health
  try {
    const res = await fetch(`${BASE_URL}/api/health`);
    const data = await res.json();
    assert(res.status === 200, "GET /api/health returns 200 OK", `Status: ${res.status}`);
    assert(data.status === "ok", "Health status is ok", `Got: ${data.status}`);
    assert(data.service.includes("AI Unleashed"), "Service reports AI Unleashed", `Got: ${data.service}`);
  } catch (err) {
    assert(false, "GET /api/health connection", err.message);
  }

  // TEST 2: GET / (Homepage HTML)
  try {
    const res = await fetch(`${BASE_URL}/`);
    const html = await res.text();
    assert(res.status === 200, "GET / returns 200 OK", `Status: ${res.status}`);
    assert(html.includes("AI"), "Homepage contains AI heading");
    assert(html.includes("UNLEASHED"), "Homepage contains UNLEASHED heading");
    assert(!html.includes("VERIFY TEAM STATUS"), "Homepage does NOT contain VERIFY TEAM STATUS");
  } catch (err) {
    assert(false, "GET / homepage verification", err.message);
  }

  console.log(`\n=== RESULTS: ${passed} PASSED, ${failed} FAILED ===\n`);
  if (failed > 0) {
    process.exit(1);
  }
}

runTests();

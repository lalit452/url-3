// const express = require('express');
// const { handleGenerateNewShortURL, handleGetAnalytics } = require('../controllers/url.controllers');
// const router = express.Router();

// router.post("/", handleGenerateNewShortURL);
// router.get("/analytics/:shortId", handleGetAnalytics )


// module.exports = router;

const express = require('express');
const { handleGenerateNewShortURL, handleGetAnalytics } = require('../controllers/url.controllers'); // ✅ Import the function

const router = express.Router();

router.post("/", handleGenerateNewShortURL);
router.get("/analytics/:shortId", handleGetAnalytics);  // ✅ Correctly define route

module.exports = router; 

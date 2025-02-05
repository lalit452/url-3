const shortid = require("shortid");
const URL = require("../models/url.models");

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    
    if (!body.url) {
        return res.status(400).json({ error: "url is required" });
    }

    const shortId = shortid(); // ✅ Generate a short ID

    await URL.create({
        shortId: shortId, // ✅ Correct: Matches Mongoose schema
        redirectURL: body.url,
        visitHistory: []
    });

    return res.json({ id: shortId }); // ✅ Correct variable name
}

// async function handleGetAnalytics(req, res){
// const shortId = req.params.shortId;
// const result = await URL.findOne({shortId});
// return res.json({
//     totalClicks: result.visitHistory.length, 
//     analytics: result.visitHistory,
// })
// }

async function handleGetAnalytics(req, res){
    try {
        const shortId = req.params.shortId;
        const result = await URL.findOne({ shortId });

        if (!result) {
            return res.status(404).json({ error: "Short URL not found" });
        }
 
        return res.json({
            totalClicks: result.visitHistory.length,
            analytics: result.visitHistory
        });
    } catch (error) {
        console.error("Error in handleGetAnalytics:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


module.exports = {
    handleGenerateNewShortURL, handleGetAnalytics
}
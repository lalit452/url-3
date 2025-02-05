const express = require("express");
const {connectToMongoDB} = require("./connect");
const urlRoute = require("./routes/url.routes.js");
const URL = require("./models/url.models");  // ✅ Import your model
const cors = require('cors');
require('dotenv').config();



const app = express();
const PORT =  process.env.PORT || 8001;

// connectToMongoDB('mongodb://localhost:27017/')
// connectToMongoDB('mongodb://localhost:27017/urlfinal')
connectToMongoDB(process.env.MONGODB_URI)

.then(()=> console.log('Mongodb connected'));

app.use(express.json());
app.use(cors());

app.use("/url", urlRoute); 

app.get('/:shortId', async(req, res)=>{
    const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate({
        shortId
    }, {$push: {
        visitHistory: {
            timestamp: Date.now()
        },
    }
}
);
res.redirect(entry.redirectURL)
});

// app.get('/:shortId', async (req, res) => {
//     try {
//         const shortId = req.params.shortId;
        
//         // Find and update the visit history
//         const entry = await URL.findOneAndUpdate(
//             { shortId }, 
//             { $push: { visitHistory: { timestamp: Date.now() } } },
//             { new: true } // Ensures it returns the updated document
//         );

//         // Handle case where entry is not found
//         if (!entry) {
//             return res.status(404).json({ error: "Short URL not found" });
//         }

//         // Redirect to the original URL
//         res.redirect(entry.redirectURL);
//     } catch (error) {
//         console.error("Error processing short URL:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });


app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT} `));

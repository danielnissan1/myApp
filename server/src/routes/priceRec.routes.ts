import express from "express";
import axios from "axios";
import { log } from "console";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
const router = express.Router();

router.post("/getPriceRecommendation", async (req, res) => {
  const { itemDescription } = req.body;
  log(req.body);

  try {
    const prompt = `Item: ${itemDescription}. Provide a price range in shekels, for example: 100₪-200₪, with no decription. if you dont have an answer like this return "please refine your description"`;
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    console.log(responseText);
    res.json({ recommendedPrice: responseText });
  } catch (error) {
    console.error("Error fetching price recommendation:", error);
    res.status(500).json({ error: "Failed to fetch price recommendation" });
  }
});
// import express from "express";
// import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();
// const router = express.Router();

// router.post("/getPriceRecommendation", async (req, res) => {
//   try {
//     const { itemDescription } = req.body;

//     const response = await axios.post(
//       "https://api.gemini.com/v1/getPrice", // Replace with actual Gemini API URL
//       {
//         prompt: `Estimate a fair market price for this vintage item: ${itemDescription}`,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     res.json({ recommendedPrice: response.data.price });
//   } catch (error) {
//     console.error("Error fetching price recommendation:", error);
//     res.status(500).json({ error: "Failed to fetch price recommendation" });
//   }
// });

export default router;

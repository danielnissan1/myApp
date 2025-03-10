"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const console_1 = require("console");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: PriceRecommendation
 *   description: The Price Recommendation API
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     PriceRecommendationRequest:
 *       type: object
 *       required:
 *         - itemDescription
 *       properties:
 *         itemDescription:
 *           type: string
 *           description: The description of the item
 *       example:
 *         itemDescription: "A used bicycle in good condition"
 *
 *     PriceRecommendationResponse:
 *       type: object
 *       properties:
 *         recommendedPrice:
 *           type: string
 *           description: The recommended price range
 *       example:
 *         recommendedPrice: "100₪-200₪"
 */
/**
 * @swagger
 * /priceRec/getPriceRecommendation:
 *   post:
 *     summary: Get price recommendation for an item
 *     tags: [PriceRecommendation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PriceRecommendationRequest'
 *     responses:
 *       200:
 *         description: Price recommendation fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PriceRecommendationResponse'
 *       500:
 *         description: Failed to fetch price recommendation
 */
router.post("/getPriceRecommendation", async (req, res) => {
    const { itemDescription } = req.body;
    (0, console_1.log)(req.body);
    try {
        const prompt = `Item: ${itemDescription}. Provide a price range in shekels, for example: 100₪-200₪, with no decription. if you dont have an answer like this return "please refine your description"`;
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        console.log(responseText);
        res.json({ recommendedPrice: responseText });
    }
    catch (error) {
        console.error("Error fetching price recommendation:", error);
        res.status(500).json({ error: "Failed to fetch price recommendation" });
    }
});
exports.default = router;

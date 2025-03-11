"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const multer_1 = __importDefault(require("multer"));
const base = "http://" + process.env.DOMAIN_BASE + ":" + process.env.PORT + "/";
const storage = multer_1.default.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/");
  },
  filename: function (req, file, cb) {
    const ext = file.originalname
      .split(".")
      .filter(Boolean) // removes empty extensions (e.g. `filename...txt`)
      .slice(1)
      .join(".");
    cb(null, Date.now() + "." + ext);
  },
});
const upload = (0, multer_1.default)({ storage: storage });
/**
 * @swagger
 * tags:
 *   name: Files
 *   description: The Files API
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     File:
 *       type: object
 *       properties:
 *         url:
 *           type: string
 *           description: The URL of the uploaded file
 *       example:
 *         url: "http://example.com/public/1616161616161.txt"
 */
/**
 * @swagger
 * /files:
 *   post:
 *     summary: Upload a file
 *     tags: [Files]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The file to upload
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/File'
 *       400:
 *         description: File upload failed
 */
router.post("/", upload.single("file"), function (req, res) {
  if (req.file) {
    console.log("router.post(/file: " + base + req.file.path);
    res.status(200).send({ url: base + req.file.path });
  } else {
    res.status(400).send({ error: "File upload failed" });
  }
});
module.exports = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const readCertificates = () => {
    let privateKey, certificate;
    try {
        privateKey = fs_1.default.readFileSync(path_1.default.join(__dirname, "../../cert/client-key.pem"), "utf8");
        certificate = fs_1.default.readFileSync(path_1.default.join(__dirname, "../../cert/client-cert.pem"), "utf8");
    }
    catch (error) {
        console.error("Error reading certificate files:", error);
        process.exit(1);
    }
    return { privateKey, certificate };
};
exports.default = readCertificates;

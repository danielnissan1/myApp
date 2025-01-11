"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const comments_model_1 = __importDefault(require("../models/comments.model"));
const base_controller_1 = __importDefault(require("./base.controller"));
const commentsController = new base_controller_1.default(comments_model_1.default);
exports.default = commentsController;

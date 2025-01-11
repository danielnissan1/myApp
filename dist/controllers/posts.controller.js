"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const posts_model_1 = __importDefault(require("../models/posts.model"));
const base_controller_1 = __importDefault(require("./base.controller"));
class PostsController extends base_controller_1.default {
    constructor() {
        super(posts_model_1.default);
    }
    async create(req, res) {
        const userId = req.params.userId;
        const post = {
            ...req.body,
            owner: userId,
        };
        req.body = post;
        super.create(req, res);
    }
}
exports.default = new PostsController();

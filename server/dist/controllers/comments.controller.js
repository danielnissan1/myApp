"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const comments_model_1 = __importDefault(require("../models/comments.model"));
const base_controller_1 = __importDefault(require("./base.controller"));
class CommentsController extends base_controller_1.default {
    constructor() {
        super(comments_model_1.default);
    }
    async create(req, res) {
        const comment = {
            ...req.body,
        };
        req.body = comment;
        super.create(req, res);
    }
    async getByPostId(req, res) {
        const id = req.params.id;
        try {
            const item = await this.model
                .find({ postId: id })
                .populate("owner", "username avatar");
            if (item != null) {
                res.send(item);
            }
            else {
                res.status(404).send("not found");
            }
        }
        catch (error) {
            res.status(400).send(error);
        }
    }
}
exports.default = new CommentsController();

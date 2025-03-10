"use strict";
// import initApp from "./server";
// const port = process.env.PORT;
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// initApp().then((app) => {
//   app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
//   });
// });
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./server"));
dotenv_1.default.config();
server_1.default.then(({ server, port, link }) => {
    server.listen(port, () => {
        console.log(`Server is running on ${link}/api`);
        console.log(`Client is running on ${link}`);
    });
});

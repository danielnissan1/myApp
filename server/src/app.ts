// import initApp from "./server";
// const port = process.env.PORT;

// initApp().then((app) => {
//   app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
//   });
// });

// async function startApp() {
//   const app = await initApp;  // Waits for the promise to resolve
//   app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
//   });
// }

import dotenv from "dotenv";
import serverPromise from "./server";
import { Server as HttpsServer } from "https";
import { Server as HttpServer } from "http";
dotenv.config();

export type ServerType = HttpsServer | HttpServer;
export type ServerInfo = { server: ServerType; port: number; link: string };

serverPromise.then(({ server, port, link }: ServerInfo) => {
  server.listen(port, () => {
    console.log(`Server is running on ${link}/api`);
    console.log(`Client is running on ${link}`);
  });
});

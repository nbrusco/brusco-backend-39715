import express from "express";
import morgan from "morgan";

import handlebars from "express-handlebars";
import { multiply, compare } from "./views/helpers.js";

import cookieParser from "cookie-parser";
import initializePassport from "./auth/passport.js";

import database from "./db.js";
import __dirname from "./utils.js";
import socket from "./socket.js";

import routerAPI from "./routes/routes.js";

// import productsRouter from "./routes/products.routes.js";
// import cartsRouter from "./routes/carts.routes.js";
// import messagesRouter from "./routes/messages.routes.js";
// import viewsRouter from "./routes/views.routes.js";
// import sessionsRouter from "./routes/sessions.routes.js";

const env = async () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(`${__dirname}/public`));
  app.use(morgan("dev"));

  app.use(cookieParser());
  initializePassport();

  routerAPI(app)

  // app.use("/api/products", productsRouter);
  // app.use("/api/carts", cartsRouter);
  // app.use("/api/messages", messagesRouter);
  // app.use("/api/sessions", sessionsRouter);
  // app.use("/", viewsRouter);

  app.engine(
    "handlebars",
    handlebars.engine({
      helpers: {
        multiply: multiply,
        compare: compare
      },
      defaultLayout: "main",
    })
  );
  app.set("view engine", "handlebars");
  app.set("views", __dirname + "/views");

  const httpServer = app.listen(8080, () =>
    console.log("Server up in port 8080!")
  );

  database.connect();

  socket.connect(httpServer);
};

env();

import express from "express";
import morgan from "morgan";
import createError from "http-errors";
import logger from "loglevel";

const host = "localhost";
const port = 8000;

const app = express();

if (app.get("env") === "development") app.use(morgan("dev"));

app.use(express.static("static"));

app.set("view engine", "ejs");

app.get(["/", "/index.html"], async function (request, response) {
  response.sendFile("index.html", { root: "./" });
});

app.get("/random/:nb", (request, response, next) => {
  const length = Number.parseInt(request.params.nb, 10);
  if (Number.isNaN(length)) {
    return next(createError(400, "Le paramètre doit être un nombre"));
  }
  const numbers = Array.from({ length }).map(() => Math.floor(Math.random() * 100));
  const welcome = "Liste de nombres aléatoires";
  response.render("random", { numbers, welcome });
});

app.use((request, response, next) => {
  logger.debug(`default route handler : ${request.url}`);
  return next(createError(404));
});

app.use((error, _request, response, _next) => {
  logger.debug(`default error handler: ${error}`);
  const status = error.status ?? 500;
  const stack = app.get("env") === "development" ? error.stack : "";
  const result = { code: status, message: error.message, stack };
  return response.render("error", result);
});

const server = app.listen(port, host);

server.on("listening", () =>
  logger.info(
    `HTTP listening on http://${server.address().address}:${server.address().port} with mode '${process.env.NODE_ENV}'`,
  ),
);

logger.setLevel(logger.levels.DEBUG);

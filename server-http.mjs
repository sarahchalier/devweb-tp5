import http from "node:http";

const host = "localhost";
const port = 8000;

/** Question 1**/
/**function requestListener(_request, response) {
  response.writeHead(200);
  response.end("<html><h1>My first server!<h1></html>");
}**/

/**Question 2**/
/**function requestListener(_request, response) {
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify({ message: "I'm OK" }));
}**/

/**Question 3 et 4**/

/**import fs from "node:fs/promises";

function requestListener(_request, response) {
  fs.readFile("index.html", "utf8")
    .then((contents) => {
      response.setHeader("Content-Type", "text/html");
      response.writeHead(200);
      return response.end(contents);
    })
    .catch((error) => console.error(error));
}**/

/**Question 5**/
import fs from "node:fs/promises";
/**
async function requestListener(_request, response) {
  try {
    const contents = await fs.readFile("index.html", "utf8");
    response.setHeader("Content-Type", "text/html");
    response.writeHead(200);
    response.end(contents);
  } catch (error) {
    console.error(error);
    response.writeHead(500, { "Content-Type": "text/plain" });
    response.end("Erreur 500 : Impossible de charger la page demandee.");
  }
}
**/

/**Question 1.8**/
/**async function requestListener(request, response) {
  response.setHeader("Content-Type", "text/html");
  try {
    const contents = await fs.readFile("index.html", "utf8");
    switch (request.url) {
      case "/index.html":
        response.writeHead(200);
        return response.end(contents);
      case "/random.html":
        response.writeHead(200);
        return response.end(`<html><p>${Math.floor(100 * Math.random())}</p></html>`);
      default:
        response.writeHead(404);
        return response.end(`<html><p>404: NOT FOUND</p></html>`);
    }
  } catch (error) {
    console.error(error);
    response.writeHead(500);
    return response.end(`<html><p>500: INTERNAL SERVER ERROR</p></html>`);
  }
}**/

async function requestListener(request, response) {
  response.setHeader("Content-Type", "text/html");
  try {
    const urlParts = request.url.split("/"); 
    const firstLevel = urlParts[1];
    switch (firstLevel) {
      case "":
      case "index.html": {
        const contents = await fs.readFile("index.html", "utf8");
        response.writeHead(200);
        return response.end(contents);
      }
      case "random": {
        const nb = parseInt(urlParts[2]);
        if (isNaN(nb) || nb <= 0) {
          response.writeHead(400);
          return response.end(`<html><p>Nombre invalide !</p></html>`);
        }
        const numbers = [];
        for (let i = 0; i < nb; i++) {
          numbers.push(Math.floor(Math.random() * 101));
        }
        let template;
        try {
          template = await fs.readFile("random.html", "utf8");
        } catch {
          template = "<html><p>{{numbers}}</p></html>"; 
        }
        const content = template.replace("{{numbers}}", numbers.join(", "));
        response.writeHead(200);
        return response.end(content);
      }
      default:
        response.writeHead(404);
        return response.end(`<html><p>404: NOT FOUND</p></html>`);
    }
  } catch (error) {
    console.error(error);
    response.writeHead(500);
    return response.end(`<html><p>500: INTERNAL SERVER ERROR</p></html>`);
  }
}

export default requestListener;

console.log("NODE_ENV =", process.env.NODE_ENV);

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

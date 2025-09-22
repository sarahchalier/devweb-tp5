import http from "node:http";

const host = "localhost";
const port = 8000;

/** Question 1**/
function requestListener(_request, response) {
  response.writeHead(200);
  response.end("<html><h1>My first server!<h1></html>");
}

/**Question 2**/
function requestListener(_request, response) {
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify({ message: "I'm OK" }));
}

/**Question 3 et 4**/

import fs from "node:fs/promises";

function requestListener(_request, response) {
  fs.readFile("index.html", "utf8")
    .then((contents) => {
      response.setHeader("Content-Type", "text/html");
      response.writeHead(200);
      return response.end(contents);
    })
    .catch((error) => console.error(error));
}

/**Question 5**/
import fs from "node:fs/promises";

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


const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

# devweb-tp5

# Partie 1 : Serveur http natif Node.js
## Question 1.1 donner la liste des en-têtes de la réponse HTTP du serveur.
Localhost : 	Connection   		 keep-alive
Date   			Fri, 19 Sep 2025 22:35:59 GMT
Keep-alive    		timeout=5
Transfer-encoding    	 chunked

Favicon.ico :	Connection    		keep-alive
Date        		Fri, 19 Sep 2025 22 :35 :59 GMT
Keep-alive        	timeout=5
Transfer-encoding     	chunked

## Question 1.2 donner la liste des en-têtes qui ont changé depuis la version précédente.
Localhost : 	connection   		keep-alive
Content-length     	20
Content-type    	application/json
Date          		 Fri, 19 Sep 2025 22:43:54 GMT
Keep-alive     		 timeout=5

Favicon.ico :	connection		keep-alive
Content-length 	20
Content-type		application/json
Date			Fri, 19 Sep 2025 22 :43 :54 GMT
Keep-alive		timeout=5

## Question 1.3 que contient la réponse reçue par le client ?
Il n’y a pas de réponse par le client car le code appel un fichier index.html qui n’existe pas.

## Question 1.4 quelle est l’erreur affichée dans la console ?
L’erreur affichée dans la console est :
```txt
Error: ENOENT: no such file or directory, open 'C:\UNC\l2\s4\dev_web\devweb-tp5\index.html'
    at async open (node:internal/fs/promises:642:25)
    at async Object.readFile (node:internal/fs/promises:1279:14) {
  errno: -4058,
  code: 'ENOENT',
  syscall: 'open',
  path: 'C:\\UNC\\l2\\s4\\dev_web\\devweb-tp5\\index.html'
}
```
## Question 1.5 donner le code de requestListener() modifié avec gestion d’erreur en async/await.
Code modifié:
```js
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
```
## Question 1.6 indiquer ce que cette commande a modifié dans votre projet.
```js
  },
  "dependencies": {
    "cross-env": "^10.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.10"
}
```

## Question 1.7 quelles sont les différences entre les scripts http-dev et http-prod ?
Les différences entre http-dev et http-prod sont  :

http-dev démarre le serveur en mode développement avec nodemon, il se relance tout seul quand je change le code et affiche plus de messages pour expliquer ce qu'il se passe.

http-prod démarre le serveur en mode production avec Node.js, il ne se relance pas tout seul et il n’affiche pas les messages de debug.

## Question 1.8 donner les codes HTTP reçus par votre navigateur pour chacune des quatre pages précédentes.
http://localhost:8000/:  404: NOT FOUND
http://localhost:8000/index.html : Bienvenue sur ma page node.js
http://localhost:8000/random.html : 73
http://localhost:8000/dont-exist: 404: NOT FOUND

# Partie 2

## Question 2.1 donner les URL des documentations de chacun des modules installés par la commande précédente.
express : https://expressjs.com/
http-errors : https://github.com/jshttp/http-errors
loglevel : https://github.com/pimterry/loglevel
morgan : https://github.com/expressjs/morgan

## Question 2.2 vérifier que les trois routes fonctionnent.
:8000/ : <img width="909" height="206" alt="image" src="https://github.com/user-attachments/assets/ac561a2d-4c56-4a0b-a9ad-b91722275aac" />
:8000/index.html: <img width="878" height="249" alt="image" src="https://github.com/user-attachments/assets/8f29f9a0-4e46-4d73-b2d6-69af61570aea" />

:8000/random/5:<img width="768" height="204" alt="image" src="https://github.com/user-attachments/assets/6e7dfb17-769b-4f95-8af5-5c30fdf54e7c" />
 
## Question 2.3 lister les en-têtes des réponses fournies par Express. Lesquelles sont nouvelles par rapport au serveur HTTP ?
### :8000/
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Security-Policy: default-src 'none'
X-Content-Type-Options: nosniff
Content-Type: text/html; charset=utf-8
Content-Length: 157
Date: Thu, 25 Sep 2025 02:49:27 GMT
Connection: keep-alive
Keep-Alive: timeout=5

### :8000/index.html
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Security-Policy: default-src 'none'
X-Content-Type-Options: nosniff
Content-Type: text/html; charset=utf-8
Content-Length: 157
Date: Thu, 25 Sep 2025 02:50:49 GMT
Connection: keep-alive
Keep-Alive: timeout=5

### :8000/random/5

1 requests
309 B transferred
81 B resources
Finish: 3 ms
DOMContentLoaded: 15 ms
Request URL
http://localhost:8000/random/5
Request Method
GET
Status Code
200 OK
Remote Address
[::1]:8000
Referrer Policy
strict-origin-when-cross-origin
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 81
ETag: W/"51-ElI3D1Co7TLllnw/OZD1KEXetIY"
Date: Thu, 25 Sep 2025 02:51:51 GMT
Connection: keep-alive
Keep-Alive: timeout=5

## Question 2.4 quand l’événement listening est-il déclenché ?
L'évenement listening sera déclenché quand le serveur aura accédé avec susccés au port et à l'hote.

## Question 2.5 indiquer quelle est l’option (activée par défaut) qui redirige / vers /index.html ?

## Question 2.6 visiter la page d’accueil puis rafraichir (Ctrl+R) et ensuite forcer le rafraichissement (Ctrl+Shift+R). Quels sont les codes HTTP sur le fichier style.css ? 

## Question 2.7 vérifier que l’affichage change bien entre le mode production et le mode development.

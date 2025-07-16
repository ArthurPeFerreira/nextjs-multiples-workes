import cluster from "cluster";
import os from "os";
import { createServer } from "http";
import { parse } from "url";
import next from "next";

const numCPUs = os.cpus().length;
const app = next({ dev: false });
const handle = app.getRequestHandler();

if (cluster.isPrimary) {
  console.log(`👷 Master ${process.pid} iniciando ${numCPUs} workers…`);
  for (let i = 0; i < numCPUs; i++) cluster.fork();
  cluster.on("exit", (worker) => {
    console.log(`⚰️ Worker ${worker.process.pid} morreu. Criando outro…`);
    cluster.fork();
  });
} else {
  app.prepare().then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(3000, () => {
      console.log(`🚀 Worker ${process.pid} ouvindo.`);
    });
  });
}

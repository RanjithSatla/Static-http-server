import http from "http";
import fs from "fs";
import "dotenv/config";
import { ipLogger } from "./src/iplogger";
import { ipTracker } from "./src/ipTracker";

const server = http.createServer((req, res) => {
  const { url } = req;
  ipLogger(req);
  ipTracker(req, res);
  const path = `${process.cwd()}/public${
    url === "/" ? "/index.html" : url
  }`.replace(/\\/g, "/");
  try {
    if (fs.existsSync(path)) {
      fs.createReadStream(path).pipe(res);
    } else {
      res.statusCode = 404;
      res.end();
    }
  } catch (err) {
    res.end(err);
  }

  console.log(path);
  //   res.end();
});

const { port } = process.env;
server.listen(port, () => {
  console.log("Server started");
});

import http from "http";
import fs from "fs";
import { Reqtype } from "./types";
import { ipTracker } from "./ipTracker";

export const ipLogger = (req: Reqtype) => {
  const { connection } = req;
  console.log(connection?.remoteAddress);
  const log = connection?.remoteAddress || "";
  const path = `${process.cwd()}/src/ip.log`;
  fs.createWriteStream(path, { flags: "a", encoding: "utf-8" }).write(
    `${log}\n`
  );
};

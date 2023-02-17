import http from "http";
import { Reqtype } from "./types";
const ipAddresses = new Map<string, number>();

export const ipTracker: http.RequestListener = (req, res) => {
  const { connection } = req;
  const ip = connection.remoteAddress || "";
  if (ipAddresses.has(ip)) {
    const currValue = ipAddresses.get(ip)!;

    if (currValue > 5) {
      res.statusCode = 403;
      res.end();
    }
    ipAddresses.set(ip, currValue + 1);
  } else {
    ipAddresses.set(ip, 1);
  }
};

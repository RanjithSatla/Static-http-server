import http from "http";

export type Reqtype = Parameters<http.RequestListener>[0];

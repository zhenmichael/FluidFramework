/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

// tslint:disable no-var-requires no-unsafe-any non-literal-fs-path
import * as express from "express";
import * as fs from "fs";
import * as moniker from "moniker";
import * as path from "path";
import WebpackDevServer from "webpack-dev-server";
import { IRouteOptions } from "./loader";

export const before = (app: express.Application, server: WebpackDevServer, baseDir: string, env: IRouteOptions) => {
    let options: IRouteOptions;
    if (!env) {
        options = { mode: "live" };
    } else if (env.fluidHost && !(env.tenantId && env.tenantSecret)) {
        throw new Error("If you provide a host, you must provide a tenantId and tenantSecret");
    } else if ((env.tenantId || env.tenantSecret) && !(env.tenantId && env.tenantSecret)) {
        throw new Error("tenantId and tenantSecret must be provided together");
    } else {
        options = env;
    }

    app.get("/", (req, res) => res.redirect(`/${moniker.choose()}`));
    app.get("/fluid-loader.js", (req, res) => loader(req, res, baseDir));
    app.get(/(.*(?<!\.js(\.map)?))$/i, (req, res) => fluid(req, res, baseDir, options));
};

const fluid = (req: express.Request, res: express.Response,  baseDir: string, options: IRouteOptions) => {
    const rawPath = req.params[0];
    const slash = rawPath.indexOf("/");
    const documentId = rawPath.substring(
        0,
        slash !== -1 ? slash : rawPath.length
    );
    // tslint:disable-next-line: non-literal-require
    const packageJson = require(path.join(baseDir, "./package.json"));

    const html =
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${documentId}</title>
</head>
<body>
    <div style="width: 100%; height: 100%;">
        <div id="content"></div>
    </div>

    <script src="/fluid-loader.js"></script>
    <script>
        var pkgJson = ${JSON.stringify(packageJson)};
        var options = ${JSON.stringify(options)};
        FluidLoader.start(
            pkgJson,
            options,
            document.getElementById("content"))
        .catch((error) => console.error(error));
    </script>
</body>
</html>`;

    res.setHeader("Content-Type", "text/html");
    res.end(html);
};

const loader = (req: express.Request, res: express.Response,  baseDir: string) => {
    res.setHeader("Content-Type", "application/javascript");

    fs.createReadStream(
        path.join(baseDir, "node_modules", "@microsoft", "fluid-webpack-component-loader", "dist", "fluid-loader.bundle.js")
    ).pipe(res);
};

import Logger from "../../../../lib/ts/Logger";
import HttpServer from "../../io/http/HttpServer";
import * as express from 'express';
import {createServer} from "http";
import FS from "../../io/FS";
import Config from "../../config/Config";
import WebServerProcess from "../process/WebServerProcess";
import * as path from "path";
import UpdateAppVersion from "../../deploy/cmd/UpdateAppVersion";
import TestHandler from "./handler/TestHandler";

export default class CmdHandler {

    config: Config;
    fs: FS;
    logger: Logger

    constructor(cliArgs: any, config: Config, logger: Logger) {
        this.config = config;
        this.fs = new FS;
        this.logger = logger;
        this.runApp(cliArgs.port ?? '8080');
    }

    async runApp(port: string) {
        const httpServer = new HttpServer(createServer, express, this.fs);
        httpServer.getServer().listen(`${port}`);
        console.log(`Webserver start on port: [${port}]`);
    }
}
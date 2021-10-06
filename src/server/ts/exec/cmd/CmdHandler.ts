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

        const cmd = cliArgs.cmd || cliArgs[0];
        if (!cmd) {
            logger.info(`cmd: [${cmd}]`);
            return;
        }
        logger.info(`try execute cmd: [${cmd}]`);

        const self = this;
        const map = {
            containers: async () => {
                console.log ( await (new UpdateAppVersion()).showDockerContainersNames() );
            },
            runApp: () => self.runApp(cliArgs.port ?? '8080'),
            runDocker: () => {
                let processA = new WebServerProcess(path.resolve('../dirA'), 'processB', 'x.js');
                processA.setPort('8083');
                (new UpdateAppVersion()).runServer(processA.getPath(), processA.getExecFilePath(), processA.getName(), processA.getPort());
            },
            test: () => new TestHandler().exec()
        };
        if (map[cmd]) map[cmd](cmd);
    }

    async runApp(port: string) {
        const httpServer = new HttpServer(createServer, express, this.fs);
        httpServer.getServer().listen(`${port}`);
        console.log(`Webserver start on port: [${port}]`);
    }
}
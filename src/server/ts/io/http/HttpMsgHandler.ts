import MainLayout from "../../../../browser/ts/core/layout/MainLayout";
import {NextFunction, Request, Response} from "express";
import DbItemFinder from "../storage/jsonDb/DbItemFinder";
import DbItemSaver from "../storage/jsonDb/DbItemSaver";
import FS from "../FS";
import {renderToString} from 'react-dom/server';
import {createStore, Store} from "redux";
import reduxStore, {IStoreState} from "../../../../lib/ts/ReduxStore";
import * as React from "react";
import {ServerStyleSheets} from "@material-ui/core";
import urlcat from "urlcat";
import Config from "../../config/Config";
import Github, {githubApiUrl, githubMainUrl} from "../api/Github";
import Logger from "../../../../lib/ts/Logger";
import {Users} from "../storage/mongo/Users";

const COOKIE_KEY = 'tok';

export default class HttpMsgHandler {

    config: Config;
    fs: FS;
    logger: Logger;

    constructor(fs: FS, config: Config, logger: Logger) {
        this.config = config;
        this.fs = fs;
        this.logger = logger;
    }

    /*async proxyToSubdomain(req: Request, res: Response, next: NextFunction) {
        console.log(req.headers);
        return false;
    }*/

    async handle(req: Request, res: Response, next: NextFunction) {
        res.send(MainLayout.build());
        next();
        return;
    }
}
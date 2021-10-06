import {Express, NextFunction, Request, Response} from "express";
import {Server} from "http";
import HttpMsgHandler from "./HttpMsgHandler";
import FS from "../FS";
import * as bodyParser from "body-parser";
import * as formidable from "formidable";
import * as path from "path";

export default class HttpServer {

    server: Server;
    fs: FS;

    constructor(createServer: any, express: Express, httpMsgHandler: HttpMsgHandler, fs: FS) {

        this.fs = fs;
        const stateFile = './storage/state2.json';
        const mediaDir = 'D:/youtube/source';
        const artstationDir = mediaDir + '/artstation';

        let app = express();
        app.use(express.static('D:/youtube'));

        app.get('/min.js', async (req: Request, res: Response) => res.send(await this.fs.readFile('./min.js')));

        app.get('/state', async (req: Request, res: Response) => res.send( await this.fs.readFile(stateFile) ));
        app.post('/state', bodyParser.json({}), async (req: Request, res: Response) => {
            console.log('save');
            await this.fs.writeFile(stateFile, JSON.stringify(req.body.data))
            res.send({});
        });
        app.post('/upload', async (req: Request, res: Response) => {

            const form = formidable({ multiples: true });
            form.maxFileSize = 12000 * 1024 * 1024

            let count = 0;

            form.parse(req, async (err, fields, files) => {
                if (err) console.log(err);

                if (Object.keys(fields).length) {
                    console.log(fields);
                }
                if (Object.keys(files).length) {

                    for (let fileName in files) {
                        let file = files[fileName];
                        console.log(fileName);

                        let ext = '';
                        if (file.type.includes('jpeg') || file.type.includes('jpg')) ext = 'jpg';
                        if (file.type.includes('codecs=pcm')) ext = 'wav';
                        if (file.type === 'video/quicktime') ext = 'mov'
                        if (file.type === 'image/heic') ext = 'heic'

                        await fs.move(file.path, `${mediaDir}/${Date.now()}-${++count}.${ext}`);
                    }
                }

                console.log('income request ' + Date.now());
                res.send({});
            });
        });

        app.get('/mediaFiles', async (req: Request, res: Response) => res.send(JSON.stringify( (await fs.readDir(mediaDir)) )));
        app.get('/artStationFiles', async (req: Request, res: Response) => res.send(JSON.stringify(await fs.readDir(artstationDir))));

        app.use(async (req: Request, res: Response, next: NextFunction) => await httpMsgHandler.handle(req, res, next));

        this.server = createServer({}, app);

        /*if (this.upgradeHandler) {
            this.server.on('upgrade', (req, clientSocket, head) => {
                this.upgradeHandler(req, clientSocket, head)
            })
        }*/
        /*if (this.requestHandler) app.use((req, res, next) => {
            this.requestHandler({req, res, next})
        })*/
    }

    getServer(): Server {
        return this.server;
    }
}


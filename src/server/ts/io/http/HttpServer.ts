import {Express, Request, Response} from "express";
import {Server} from "http";
import FS from "../FS";
import * as formidable from "formidable";

export default class HttpServer {

    server: Server;
    fs: FS;

    constructor(createServer: any, express: Express, fs: FS) {

        this.fs = fs;
        const mediaDir = './';
        const htmlFile = './index.html';

        let app = express();
        app.get('/', async (req: Request, res: Response) => res.send( await this.fs.readFile(htmlFile) ));
        app.get('/js', async (req: Request, res: Response) => res.send(await this.fs.readFile('./min.js')));
        app.post('/upload', async (req: Request, res: Response) => {

            const form = formidable({ multiples: true });
            form.maxFileSize = 12000 * 1024 * 1024

            let count = 0;

            form.parse(req, async (err, fields, files) => {

                console.log('income request ' + Date.now(), fields, err);
                if (Object.keys(fields).length) console.log(fields);
                if (!Object.keys(files).length) { res.send({noFiles: 1}); return; }

                const processFile = async (file) => {
                    if (Array.isArray(file)) {
                        for (let i = 0; i < file.length; i++) await processFile(file[i]);
                    } else {
                        let ext = '';
                        if (file.type.includes('jpeg') || file.type.includes('jpg')) ext = 'jpg';
                        if (file.type.includes('codecs=pcm')) ext = 'wav';
                        if (file.type === 'video/quicktime') ext = 'mov'
                        if (file.type === 'image/heic') ext = 'heic'

                        await fs.move(file.path, `${mediaDir}/${Date.now()}-${++count}.${ext}`);
                    }
                };
                for (let fileName in files) await processFile(files[fileName]);
                res.send({ok: 1});
            });
        });

        this.server = createServer({}, app);
    }

    getServer(): Server { return this.server; }
}


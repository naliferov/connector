import {Express, Request, Response} from "express";
import {Server} from "http";
import FS from "../FS";
import * as formidable from "formidable";

export default class HttpServer {

    server: Server;
    fs: FS;

    constructor(createServer: any, express: Express, fs: FS) {

        this.fs = fs;
        const stateFile = './storage/state2.json';
        //const mediaDir = 'D:/youtube/source';
        const mediaDir = '/home/any/Downloads';
        const artstationDir = mediaDir + '/artstation';
        const htmlFile = './index.html';

        let app = express();
        //app.use(express.static('./'));

        app.get('/', async (req: Request, res: Response) => res.send( await this.fs.readFile(htmlFile) ));
        app.get('/js', async (req: Request, res: Response) => res.send(await this.fs.readFile('./min.js')));

        /*app.get('/state', async (req: Request, res: Response) => res.send( await this.fs.readFile(stateFile) ));
        app.post('/state', bodyParser.json({}), async (req: Request, res: Response) => {
            console.log('save');
            await this.fs.writeFile(stateFile, JSON.stringify(req.body.data))
            res.send({});
        });*/
        app.post('/upload', async (req: Request, res: Response) => {

            const form = formidable({ multiples: true });
            form.maxFileSize = 12000 * 1024 * 1024

            let count = 0;

            form.parse(req, async (err, fields, files) => {
                if (err) console.log(err);

                if (Object.keys(fields).length) console.log(fields);
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

        this.server = createServer({}, app);
    }

    getServer(): Server {
        return this.server;
    }
}


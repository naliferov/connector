"use strict";
exports.__esModule = true;
var HttpServer_1 = require("./io/HttpServer");
var express = require("express");
var http_1 = require("http");
var FS_1 = require("../../io/FS");
var CmdHandler = /** @class */ (function () {
    function CmdHandler(cliArgs, logger, config) {
        var cmd = cliArgs.cmd || cliArgs[0];
        if (!cmd) {
            logger.info("cmd: [" + cmd + "]");
            return;
        }
        logger.info("try execute cmd: [" + cmd + "]");
        if (cmd === 'startServers') {
            this.startServers(cliArgs.port, config);
        }
        /*let list = {
            //bot: async() => new (await u.im('./src/js/telegramBot/telegramBot.js'))(u),
            checkHeaders: async () => {
                //todo
                //let client = new (await u.im('./src/js/io/httpClient.js'))
                //let res = await client.get('http://localhost/showMyHeaders')
                //console.log(res.headers)
            },
            copyUnit: async (stateData, cliArgs) => {
                /!*if (!cliArgs.name) return
                if (!cliArgs.copyName) return

                let unit = stateData.byName[cliArgs.name]
                if (!unit) return
                if (unit.name === cliArgs.copyName) return

                let copyUnit = u.f.cloneObject(unit)
                copyUnit.id = u.uuidv4()
                copyUnit.name = cliArgs.copyName

                stateData.byId[copyUnit.id] = copyUnit
                stateData.byName[copyUnit.name] = copyUnit*!/

                //u.triggerStateDump()
            },
            /!*do: async() => {

                let client = new (await u.im('./src/js/io/httpClient.js'))
                let baseUrl = 'https://api.digitalocean.com/v2'
                let headers = {'Authorization': `Bearer ${u.doToken}`};

                let fnList = {
                    images: async() => {
                        let {data} = await client.get(`${baseUrl}/images`, {}, headers)
                        console.log(data)
                    },
                    regions: async() => {
                        let {data} = await client.get(`${baseUrl}/regions`, {}, headers)
                        console.log(data)
                    },
                    sizes: async() => {
                        let {data} = await client.get(`${baseUrl}/sizes`, {}, headers)
                        console.log(data);
                    },
                    sshKeys: async() => {
                        let {data} = await client.get(`${baseUrl}/account/keys`, {}, headers)
                        console.log(data)
                    },
                    droplets: async () => {
                        let {data} = await client.get(`${baseUrl}/droplets`, {}, headers)
                        console.log(data)
                    },
                    up: async() => {
                        try {
                            let {data} = await client.post(`${baseUrl}/droplets`, {
                                name: 'droplet',
                                region: 'ams3',
                                size: 's-1vcpu-1gb',
                                ssh_keys: [25958519, 25974858, 26087191],
                                image: 'ubuntu-20-10-x64'
                            }, headers)
                            console.log(data)
                        } catch(e) {
                            console.log(e.response.data)
                        }
                    },
                }

                if (fnList[cliArgs[1]]) fnList[cliArgs[1]]()
            },
            fileTest: async () => {
                await u.fsMkdir('./test/test2', {recursive: true});
                await u.fsWriteFile('./test/test.txt', 'ok test');
            },*!/
            /!*help: async () => {
                u.logger.info('node x.js --cmd=startServers  --tags=nodejs,local --port=9999');
            },*!/
            /!*loop: async () => {
                let i = 0
                setInterval(() => {
                    u.logger.info('loop... ' + i++);
                }, 1000);
            },
            my: async () => {
                u.fs = await u.im('fs-extra')

                let mysql = await u.im('mysql')
                let conn = mysql.createConnection({
                    host: 'db-mysql-do-user-1770662-0.b.db.ondigitalocean.com',
                    port: 25060,
                    user: 'unit',
                    password: '8DXpuuNn5xVQLnrj',
                    database: 'defaultdb',
                })
                conn.connect()
                conn.query('SELECT * FROM list', (error, results, fields) => {
                    if (error) throw error;
                    console.log(results);
                })
                conn.end()
            },*!/
            exec: async () => {
                /!*let fileName = 'log.json'
                let fullPath = `${u.cacheDir}/${fileName}`;
                await u.fsCreateIfNotExists(u.cacheDir, fileName, '{}')

                setInterval(() => {
                    console.log('test')
                }, 10000)*!/
            },
            startServers: async () => {
            },
            /!*req: async () => {

                let client = new (await u.im('./src/js/io/httpClient.js'))
                try {
                    let {data} = await client.get('http://127.0.0.1:9090', {
                        test: 9989898
                    })
                    console.log(data)
                } catch (e) {
                    console.log(e)
                    console.log(e.request)
                }
            },*!/
            //test: async () => u.logger.info('Command [test] is working ok.'),
            spot: async() => {

                /!*u.fs = await u.im('fs-extra')
                u.csv = await u.im('csv-parser')
                let util = await u.im('util')
                u.fsAccess = util.promisify(u.fs.access)*!/

                //let file = u.appdir + '/../../downloads/spotify_db/data_by_artist.csv'

                //console.log(await u.fsaccess(file))

                /!*let c= 0
                u.fs.createreadstream(file)
                    .pipe(u.csv())
                    .on('data', (row) => {

                        c++;
                        if (row.popularity < 60) return
                        /!*
                            acousticness: '0.32',
                            danceability: '0.524',
                            duration_ms: '423173.0',
                            energy: '0.698',
                            instrumentalness: '0.0',
                            liveness: '0.377',
                            loudness: '-6.952000000000001',
                            speechiness: '0.0334',
                            tempo: '140.128',
                            valence: '0.401',
                            popularity: '64.0',
                            key: '2',
                            mode: '1',
                            count: '2'*!/
                        if (row.danceability < 0.70) {
                            return;
                        }

                        console.log(row.artists)
                    })
                    .on('end', () => {
                        console.log(c);
                    });*!/

                /!*let spotify = new (await u.im('./src/js/api/spotify.js')) (u)

                try {
                    //let response = await spotify.getartist('6d1hqiwnekv9zfqqm9weyo')
                    let response = await spotify.gettracksinfo([
                        '4ztqsodbbs6goedzzrgso9', '1aux4gkge7hbroh0bxdpv4', '3hxoymshzibwss2bptofbg', '08yegpkt2lhj0urcxkheie'
                    ])
                    console.log(response.data)
                } catch (e) {
                    console.log(e.response.status, e.response.statustext, e.response.data)
                }*!/
                //console.log(telegram)
            },
            /!*ytpl: async() => {
                let youtubeId = cliArgs[1]
                let processO = new (await u.im('./src/js/exec/processRun.js')) (u)

                processO.run('youtube-dl', ['-J', '--flat-playlist', `https://music.youtube.com/playlist?list=${youtubeId}`])
            },*!/
        }*/
    }
    CmdHandler.prototype.startServers = function (port, config) {
        //const title = renderToString(React.createElement(Ь, {counter: 90}));
        //console.log(title);
        //console.log(renderToString(<title>));
        //let fsAccess = util.promisify(fs.access);
        //let fsReadFile = util.promisify(fs.readFile);
        //let fsMkdir = util.promisify(fs.mkdir);
        //let fsReadDir = util.promisify(fs.readdir);
        //let fsCopy = util.promisify(fs.copy)
        //let fsMove = util.promisify(fs.move)
        //let cookieParser =
        //u['cookie-parser'] = await u.im('cookie-parser')
        //u['childProcess'] = await u.iml('child_process')
        //u.spawn = u['childProcess'].spawn
        //u.path = await u.iml('path')
        //u.ytdl = await u.im('ytdl-core')
        //if (!cliArgs.tags) throw new Error('cliArgs.tags is required parameter')
        var fs = new FS_1["default"]();
        var httpServer = new HttpServer_1["default"](http_1.createServer, express, fs, config);
        //const httpMsgHandler = new HttpMsgHandler();
        httpServer.getServer().listen(port);
        //let wsMsgHandlerO = new (await u.im('./src/js/io/wsMsgHandler.js'))
        //wsMsgHandlerO.setGlobal(u)
        //let nodeRawServer = httpServerObj.getNodeRawServer()
        //let wsServer = new (await u.im('./src/js/io/wsServer.js'))
        //wsServer.setGlobal(u)
        //wsServer.setMessageHandler(async (conn, wireId, msg) => {
        //   wsMsgHandlerO.handle(conn, wireId, msg) //async
        //})
        /*wsServer.setCloseConnHandler(async (conn, wireId, connTs, e) => {
            let connectionTime = u.f.unixTs() - connTs
            console.log(`wsConnection closed after [${connectionTime}] seconds`, wireId)

            conn.close()
            u.wsConnections.deleteWireById(wireId)
            conn = null
        })*/
        //wsServer.start(nodeRawServer)
        /*if (!cliArgs.port) {
            throw Error('No http port specified')
        }*/
        //nodeRawServer.listen(cliArgs.port, () => console.log(`httpServer started, port:[${cliArgs.port}]`))
    };
    return CmdHandler;
}());
exports["default"] = CmdHandler;

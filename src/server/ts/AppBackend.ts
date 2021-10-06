import CmdHandler from "./exec/cmd/CmdHandler";
import IConfig from "./config/Config";
import Logger from "../../lib/ts/Logger";
import Production from "./config/env/Production";

export default class AppBackend {

    cliArgs = {};
    nodeTags: {};
    config: IConfig;

    parseAndSetCliArgs(cliArgs: string[]) {

        for (let i = 0; i < cliArgs.length; i++) {
            if (i < 2) continue;

            let arg = cliArgs[i];
            let [k, v] = arg.split('=');
            if (!v) {
                this.cliArgs[i - 2] = arg; //start write args from main 0
                continue;
            }

            k = k.slice(2); //remove "--" characters
            this.cliArgs[k.trim()] = v.trim();
        }

        return this;
    }

    setDirs() {

        /*u.appJsDir = u.appDir + '/src/js';
        u.frameworkDir = '.';
        u.frameworkJsDir = u.frameworkDir + '/js';

        u.cacheDir = u.appDir + '/var/cache/telegram';
        u.processDir = u.appDir + '/exec';
        u.publicDir = u.appDir + '/data/public';*/
    }

    async loadThirdPartyLibraries() {
        //this.u.uuid = await this.u.im('uuid')
    }

    async init() {

        await this.loadThirdPartyLibraries()

        //let util = await u.im('util')

        /*u.fsAccess = util.promisify(u.fs.access)
        u.fsReadFile = util.promisify(u.fs.readFile)
        u.fsWriteFile = util.promisify(u.fs.writeFile)
        u.fsMkdir = util.promisify(u.fs.mkdir)
        u.fsReadDir = util.promisify(u.fs.readdir)
        u.fsCopy = u.fs.copy
        u.fsMove = u.fs.move*/

        /*u.fsCreateIfNotExists = async (dir, file, defaultFileContent) => {
            try { await u.fsAccess(dir) }
            catch (e) { await u.fsMkdir(dir, {recursive: true}) }

            if (file) {
                let path = dir + '/' + file

                try { await u.fsAccess(path) }
                catch (e) { await u.fsWriteFile(path, defaultFileContent) }
            }
        }*/

        /*u.u = new (await u.im('./src/public/js/unitFactory.js'))
        u.u.setGlobal(u)
        u.u.setUuid(u.uuid.v4)
        u.u.setUnitClass((await u.im('./src/public/js/unit.js')))
        u.u.setUnitViewClass((await u.im('./src/public/js/unitView.js')))

        u.wsConnections = new (await u.im('./src/public/js/io/wsConnections.js'))
        u.wsConnections.setGlobal(u)

        u.trigger = new (await u.im('./src/public/js/trigger.js'))
        u.trigger.setGlobal(u)

        u.rc = async (msg) => {
            if (!msg._sys) msg._sys = {}
            return await u.trigger.c(msg)
        }*/
    }

    async run() {
        //this.setDirs();
        this.parseAndSetCliArgs(process.argv);

        const env = this.cliArgs['env'];
        this.config = new Production();
        this.config.setAppDir(process.cwd());

        //there should be try catch and logger
        (new CmdHandler(this.cliArgs, this.config, new Logger()));
    }
}

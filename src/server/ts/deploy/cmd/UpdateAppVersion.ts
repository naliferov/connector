import WebServerProcess from "../../exec/process/WebServerProcess";
import * as path from "path";
import Exec from "../../io/exec/Exec";
import FS from "../../io/FS";
import Logger from "../../../../lib/ts/Logger";

export default class UpdateAppVersion {

    fs: FS;
    logger: Logger; //replace by LoggerInterface

    constructor() {
        this.fs = new FS;
        this.logger = new Logger;
    }

    async runServer(cwd: string, execFilePath: string, name: string, port: string) {
        const exec = new Exec(
            'docker',
            ['run',
                '-d',
                '--rm',
                '--name', name,
                '-v', `${cwd}:/app`,
                '-w', '/app',
                '-p', `${port}:8080`, //8080 is port of app. should be in settings
                'node:16-alpine',
                'x.js', 'runApp'
            ],
            cwd,
            this.logger
        );
        await exec.run();
    }

    async stopServer(processName: string) {
        await (new Exec('docker', ['stop', '-t', '2', processName], '', this.logger)).run();
    }

    //rename to isProcessAIsWorking
    async showDockerContainersNames() {
        const exec = new Exec('docker', ['ps', '--format', '{{.Names}}'], '', this.logger);
        const {code, stdoutBuffer, stderrBuffer} = await exec.run();

        const containerName = stdoutBuffer[0];
        if (!containerName) {
            return [];
        }

        const containerNames = stdoutBuffer[0].split('\n');
        if (!containerNames.length) {
            return [];
        }

        return containerNames;
    }

    async gitPull(path: string) {
        await (new Exec('git', ['-C', path, 'pull', '--no-rebase'], '', this.logger)).run();
    }

    async npmInstall(path: string) {
        await (new Exec('npm', ['install', '--no-save'], path, this.logger)).run();
    }

    async nginxUpdateConfig(port: string) {

        const configPath = './config/nginx-prod.conf';

        const conf = await this.fs.readFile(configPath);
        const editedConf = conf.replace(/http:\/\/127\.0\.0\.1:\d{4}/, `http://127.0.0.1:${port}`);
        await this.fs.writeFile(configPath, editedConf);
    }

    async nginxReload() {
        return await new Exec('sudo', ['/usr/sbin/nginx', '-s', 'reload'], '', this.logger).run();
    }

    async performUpdate(process: WebServerProcess) {
        await this.gitPull(process.getPath());
        await this.npmInstall(process.getPath());
        await this.nginxUpdateConfig(process.getPort());
        await this.runServer(process.getPath(), process.getExecFilePath(), process.getName(), process.getPort());
        await this.nginxReload();
    }

    async run() {
        let processA = new WebServerProcess(path.resolve('../dirA'), 'processA', 'x.js');
        processA.setPort('8082');
        let processB = new WebServerProcess(path.resolve('../dirB'), 'processB', 'x.js');
        processB.setPort('8083');

        const activeContainers = await this.showDockerContainersNames();
        const isActiveProcessA = await activeContainers.includes(processA.getName());
        const isActiveProcessB = await activeContainers.includes(processB.getName());

        if (!isActiveProcessA && !isActiveProcessB) {
            await this.performUpdate(processA);
            return;
        }
        if (isActiveProcessA) [processA, processB] = [processB, processA];
        await this.performUpdate(processA);
        await this.stopServer(processB.getName());
    }
}
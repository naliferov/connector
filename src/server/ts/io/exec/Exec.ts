import {spawn} from 'child_process';
import Logger from "../../../../lib/ts/Logger";
import {ExecResult} from "./types/ExecTypes";

export default class Exec {

    cmd: string;
    args: string[];
    cwd: string;
    logger: Logger;

    constructor(cmd: string, args: string[] = [], cwd: string = '', logger: Logger) {
        this.cmd = cmd;
        this.args = args;
        this.cwd = cwd;
        this.logger = logger;
    }

    async run(): Promise<ExecResult> {

        let stdoutBuffer = []; let stderrBuffer = [];

        return new Promise((resolve) => {

            const ls = spawn(this.cmd, this.args, {cwd: this.cwd});
            ls.stdout.on('data', (data) => {
                stdoutBuffer.push(data.toString().trim());
                this.logger.info(data.toString().trim());
            });
            ls.stderr.on('data', (data) => {
                stderrBuffer.push(data.toString().trim());
                this.logger.error(`E: ${data.toString().trim()}`);
            });
            ls.on('close', (code) => {
                resolve({code, stdoutBuffer, stderrBuffer})
            });
        });
    }
}
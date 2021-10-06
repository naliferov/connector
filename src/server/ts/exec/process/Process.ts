
export default class Process {

    path: string;
    execFileName: string;
    processName: string;

    constructor(path: string, processName: string, execFileName: string) {
        this.path = path;
        this.processName = processName;
        this.execFileName = execFileName;
    }

    getPath(): string {
        return this.path
    }

    getName(): string {
        return this.processName;
    }

    getExecFileName(): string {
        return this.execFileName
    }

    getExecFilePath(): string {
        return `${this.getPath()}/${this.getExecFileName()}`
    }

    getMarkerFilePath() {
        return `${this.getPath()}/m_a_r_k_e_r`
    }
}
import Process from "./Process";

export default class WebServerProcess extends Process {

    port: string

    setPort(port: string): void {
        this.port = port;
    }

    getPort(): string {
        return this.port;
    }
}
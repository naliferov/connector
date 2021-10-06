import Config from "../Config";

export default class Production extends Config {

    constructor() {
        super();

        this.appDir = '';
    }

    setAppDir(appDir: string) {
        this.appDir = appDir;
    }
}
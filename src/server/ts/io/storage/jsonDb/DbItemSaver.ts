import FS from "../../FS";

export default class DbItemSaver {

    fs: FS;

    constructor(fs: FS) {
        this.fs = fs;
    }

    async save(id, data: object): Promise<void> {
        await this.fs.writeFile(`./storage/items/${id}.json`, JSON.stringify(data));
    }
}
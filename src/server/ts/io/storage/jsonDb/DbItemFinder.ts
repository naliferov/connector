import DbItem from "./DbItem";
import FS from "../../FS";

export default class DbItemFinder {

    fs: FS;

    constructor(fs: FS) {
        this.fs = fs;
    }

    async find(id: string): Promise<DbItem> {
        let item = await this.fs.readFile(`./storage/posts/${id}.json`);
        let parsedItem: {title: string, txt: string} = JSON.parse(item);
        return new DbItem(parsedItem.title, parsedItem.txt);
    }
}
export default class DbItem {

    title: string = '';
    txt: string = '';

    constructor(title: string, txt: string) {
        this.title = title;
        this.txt = txt;
    }

    getTitle(): string {
        return this.title;
    }

    getText(): string {
        return this.txt;
    }
}
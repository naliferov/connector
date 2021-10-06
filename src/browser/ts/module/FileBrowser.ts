import Unit from "../core/Unit";
import Button from "../core/element/Button";
import Text from "../core/element/Text";
import File from "../core/element/File";
import Artstation from "./artstation/Artstation";

export default class FileBrowser {

    unit: Unit;

    recordBtn: Button;
    recording: boolean = false;

    artstation: Artstation;

    constructor(artstation: Artstation) {
        this.unit = new Unit({style: {border: '1px solid black', padding: '10px'}});
        this.unit.insert( (new Text('FILES').getUnit()) );
        this.unit.insert(new Unit({tagName: 'br'}) );

        this.artstation = artstation;
    }

    async init() {
        const files = await (await fetch('/mediaFiles')).json();
        for (let i = 0; i < files.length; i++) {
            const fileName = files[i];
            const file = new File(fileName);
            this.unit.insert(file.getUnit())

            file.on('click', () => {
                console.log(fileName);
                this.artstation.playFile('/media/' + fileName);
            });
        }
    }

    getUnit() {
        return this.unit;
    }
}
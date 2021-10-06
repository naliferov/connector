import Unit from "../../core/Unit";
import Button from "../../core/element/Button";
import Text from "../../core/element/Text";
import FileBrowser from "../FileBrowser";
import File from "../../core/element/File";

export default class Artstation {

    unit: Unit;
    video: Unit;

    btn: Button;

    constructor() {
        this.unit = new Unit({style: {
            display: 'grid', 'row-gap': '10px', border: '1px solid black', padding: '10px'
        }});

        const row1 = new Unit({class: ['row1']}); this.unit.insert(row1);
        const row2 = new Unit({class: ['row2']}); this.unit.insert(row2);

        row1.insert( (new Text('ARTSTATION').getUnit()) );

        this.video = new Unit({tagName: 'video', style: {width: '500px', height: '281px'}});
        this.video.getDOM().setAttribute('controls', 'true');
        this.video.getDOM().setAttribute('type', 'encoder/mp4');
        row2.insert(this.video);
    }

    async init() {

        const row3 = new Unit({class: ['row3', 'flex'], style: {
            'align-items': 'flex-start'
        }}); this.unit.insert(row3);

        /*const join = new Button('render');
        row3.insert(join.getUnit());
        join.click(() => {
            console.log('asd');
        });*/

        const fileBrowser = new FileBrowser(this);
        row3.insert(fileBrowser.getUnit());
        await fileBrowser.init();

        const timeline = new Unit({class: ['timeline', 'grid'], style: {border: '1px solid black', padding: '10px', 'row-gap': '10px', 'justify-items': 'start'}}); this.unit.insert(row3);
        row3.insert(timeline);

        timeline.insert( new Unit({text: 'TIMELINE'}) );

        /*const playBtn = new Button('play');
        timeline.insert(playBtn.getUnit());*/

        const tracksContainer = new Unit({class: ['tracksContainer', 'grid'], style: {border: '1px solid black', padding: '20px'}});
        timeline.insert(tracksContainer);

        const track1 = new Unit({class: ['tmTrack', 'flex'], style: {border: '1px solid black'}});
        tracksContainer.insert(track1);

        //trackControls
        //trackBlocksdf

        track1.insert( new Unit({text: 'track-1', class: ['trackTitle'], style: {'margin-right': '5px',  'white-space': 'nowrap'}}) );

        const files = await (await fetch('/artStationFiles')).json();
        for (let i = 0; i < files.length; i++) {
            const fileName = files[i];
            const file = new Unit({text: files[i], style: {
                    padding: '0 5px', outline: '1px solid black', cursor: 'pointer',
                    'white-space': 'nowrap'
                }});
            track1.insert(file);
            file.on('click', () => {
                this.playFile('/source/artstation/' + fileName);
            });
        }

        const track2 = new Unit({class: ['tmTrack', 'flex'], style: {border: '1px solid black'}});
        tracksContainer.insert(track2);
        track2.insert( new Unit({text: 'track-2', class: ['trackTitle'], style: {'white-space': 'nowrap', 'margin-right': '5px'}}) );


        for (let i = 0; i < files.length; i++) {
            if (i > 2) {
                continue;
            }

            const fileName = files[i];
            const file = new Unit({text: files[i], style: {
                    padding: '0 5px', outline: '1px solid black', cursor: 'pointer',
                    'white-space': 'nowrap'
                }});
            track2.insert(file);
            file.on('click', () => {
                this.playFile('/source/artstation/' + fileName);
            });
        }


        this.video.on('ended', () => console.log('asd'));

        /*for (let i = 0; i < 10; i++) {
            const row = new Unit({text: 'timeline', style: {border: '1px solid black', padding: '5px'}});
            timeline.insert(row);
        }*/

        //this.btn.click(() => audioDOM.play())
    }

    async playFile(src) {
        const dom = this.video.getDOM() as HTMLVideoElement;
        dom.src = src;
        dom.load();
        await dom.play();

    }

    getUnit() {
        return this.unit;
    }
}
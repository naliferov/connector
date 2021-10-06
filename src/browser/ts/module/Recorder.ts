import Unit from "../core/Unit";
import Button from "../core/element/Button";
import Text from "../core/element/Text";

export default class Recorder {

    unit: Unit;
    audio: Unit;

    recordBtn: Button;
    recording: boolean = false;

    constructor() {
        this.unit = new Unit({style: {display: 'inline-block', border: '1px solid black', padding: '10px'}});

        this.unit.insert( (new Text('RECORDER').getUnit()) );
        this.unit.insert( new Unit({tagName: 'br'}) );

        this.recordBtn = new Button('record', 'stop record');
        this.unit.insert(this.recordBtn.getUnit());

        this.unit.insert(new Unit({tagName: 'br'}));

        this.audio = new Unit({tagName: 'audio'});
        this.audio.getDOM().setAttribute('controls', 'true');
        this.unit.insert(this.audio);
    }

    async init() {

        try {
            const isIphone = navigator.userAgent.toLowerCase().includes('iphone');
            const type = isIphone ? '' : 'audio/webm;codecs=pcm';

            const audio = this.audio.getDOM() as HTMLAudioElement;

            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            // @ts-ignore
            const mediaRecorder = new MediaRecorder(stream, {mimeType: type});
            mediaRecorder.ondataavailable = async (e) => {
                const fd = new FormData; fd.append('upl', e.data);
                await fetch('/upload', {method: 'post', body: fd});
            };

            this.recordBtn.on('click', async () => {
                if (!this.recording) {
                    this.recordBtn.toggleStatus(true); this.recording = true;
                    await mediaRecorder.start();
                } else {
                    this.recordBtn.toggleStatus(false); this.recording = false;
                    await mediaRecorder.stop();
                }
            });

        } catch (e) {
            alert(e.toString());
        }

    }

    getUnit() {
        return this.unit;
    }
}
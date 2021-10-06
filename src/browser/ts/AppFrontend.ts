import Unit from "./core/Unit";
import State from "./core/state/State";
import Recorder from "./module/Recorder";
import Artstation from "./module/artstation/Artstation";
import Mind from "./module/mind/Mind";

class AppFrontend {

    async run() {
        document.body.style.background = 'whitesmoke';

        const state = new State();
        const app = new Unit({});
        app.setDOM(document.getElementById('app'));

        const recorder = new Recorder;
        //await recorder.init();
        app.insert(recorder.getUnit());

        const artstation = new Artstation();
        app.insert(artstation.getUnit());
        await artstation.init();

        const mind = new Mind(state);
        await mind.init(app);

        const scroll = parseInt(localStorage.getItem('scroll'), 10);
        if (scroll) window.scrollTo(0, scroll);
        window.onscroll = (e) => {
            localStorage.setItem('scroll', String(window.pageYOffset));
        }
    }
}

const frontend = new AppFrontend();
frontend.run();

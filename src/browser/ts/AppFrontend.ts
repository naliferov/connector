import Unit from "./core/Unit";

class AppFrontend {

    async run() {
        const app = new Unit({});
        app.setDOM(document.getElementById('app'));
        /*const upload = new Unit({});
        app.insert(upload);

        const upload = new Unit({tagName: 'button', text:'send'});
        app.insert(upload);*/
    }
}

const frontend = new AppFrontend();
frontend.run();

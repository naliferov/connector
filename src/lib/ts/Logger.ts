export default class Logger {

    log(msg: string, object?: object) {
        if (object) {
            console.log(msg, object);
        } else {
            console.log(msg);
        }
    }

    info(msg: string, object: object = null) {
        this.log(msg, object);
    }

    warning(msg: string, object: object = null) {
        this.log(msg, object);
    }

    error(msg: string, object: object = null) {
        this.log(msg, object);
    }
}
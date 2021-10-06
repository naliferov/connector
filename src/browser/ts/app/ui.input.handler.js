async (msg) => {
    let i = msg.i;
    let iDTO = i.DTO();

    let handlers = {};

    iDTO.api = {};

    iDTO.api.set = async (msg) => {

        let { handlerName, event, handler } = msg;

        if (!handlers[event]) {
            handlers[event] = {};
        }
        handlers[event][handlerName] = handler;


        if (!window[event]) {
            window[event] = async (e) => {

                u.f.iterate(handlers[event], (name, handlerFunction) => {
                    handlerFunction(e);
                });
                
            };
        }

        return {ok: 1};
    };

    iDTO.api.delete = async (msg) => {

        let { handlerName, event } = msg;

        if (!handlers[event]) return;

        delete handlers[event][handlerName];

        return {ok: 1};
    };

    return {ok: 1};
};
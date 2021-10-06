async (msg) => {
    let u = msg.u;

    let i = msg.i;
    let iDTO = i.DTO();

    iDTO.api = {};

    iDTO.api.start = async (msg) => {

        let {mouseDownEvent, units} = msg;

        let shifts = {};

        u.f.iterate(units, (unitId, unit) => {
            let targetSizes = unit.getView().getSizesAbsolute();

            if (!shifts[unitId]) shifts[unitId] = {};

            shifts[unitId].xShift = mouseDownEvent.clientX - targetSizes.x;
            shifts[unitId].yShift = mouseDownEvent.clientY - targetSizes.y;
        });

        window.onmousemove = (e) => {

            u.f.iterate(units, (unitId, unit) => {
                let x = e.clientX - shifts[unitId].xShift;
                let y = e.clientY - shifts[unitId].yShift;

                if (x < 0 || y < 0) return;

                unit.mutate({
                    commands: [
                        {updateUnit: true, path: 'view.style.left', value: x},
                        {updateUnit: true, path: 'view.style.top', value: y},
                    ],
                    triggerUnitChange: true
                });
            });

        };

        window.onmouseup = (e) => {

            window.onmousemove = null;
        };
    };

    return {ok: 1};
};
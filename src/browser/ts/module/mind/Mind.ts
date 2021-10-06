import Modifier from "../../core/Modifier";
import Selector from "./modifier/Selector";
import Mover from "./modifier/Mover";
import HtmlEditor from "./modifier/HtmlEditor";
import State, {UnitsType} from "../../core/state/State";
import Request from "../../core/io/Request";
import Unit from "../../core/Unit";

export default class Mind {

    state: State;
    unit: Unit;

    constructor(state: State) {
        this.state = state;
    }

    async init(app: Unit) {

        this.unit = new Unit({style: {
            display: 'grid', 'row-gap': '10px', border: '1px solid black', padding: '10px'
        }});
        app.insert(this.unit);


        let units: UnitsType = new Map;


        const modifier = new Modifier(this.state);
        const selector = new Selector(units, this.state);

        modifier.setApp(app);
        modifier.setSelector(selector);
        modifier.setMover( new Mover(selector, this.state) );
        modifier.setHtmlEditor( new HtmlEditor(this.state) );

        await modifier.init();
        this.unit.insert(modifier.getUnit());

        const unitsDataJSON = await new Request().get('/state');
        const unitsData = JSON.parse(unitsDataJSON);

        const unitsContainer = new Unit({style: {
            display: 'flex',
        }});
        this.unit.insert(unitsContainer);

        for (let i = 0; i < unitsData.length; i++) {

            let data = unitsData[i];
            let unit = new Unit(data);
            units.set(unit.getId(), unit);

            unitsContainer.insert(unit);
        }
        this.state.setUnits(units);


    }

}
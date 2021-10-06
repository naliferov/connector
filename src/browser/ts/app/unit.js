export default class unit {

    constructor(unitData) {

        let self = this

        self.data = unitData || {}
        self['.'] = (...className) => {
            self.getView().addClass(...className)
            return self
        }
        self['<'] = (tagName) => {
            if (!self.data.view) self.data.view = {}
            self.data.view.tagName = tagName
            return self
        }
        self['>'] = (txt) => {
            self.setText(txt)
            return self
        }
    }
    setGlobal(u) { this.u = u }
    setUnitViewClass(unitViewClass) { this.unitViewClass = unitViewClass }

    log() { console.log(this.DTO()) }
    getId() { return this.data.id }
    getName() { return this.data.name }
    getType() { return this.data.type }
    on(eventName, callback) { this.getView().on(eventName, callback); return this; }

    async copy() {
        let u = this.u;

        let unit = this.DTO();
        let unitCopy = u.f.cloneObject(unit);

        let { uuid } = await u.trigger({name: 'uuid'});
        unitCopy.id = uuid;

        if (unit.name) unitCopy.name += '.copy';

        let unitCopyObject = u.make.unit(unitCopy);
        u.state.addUnit(unitCopyObject);

        if (unitCopy.execRightNow && unitCopy.execNodeTag === 'browser') {
            await u.trigger({name: unitCopy.name, unit: unitCopyObject});
        }

        await u.trigger({name: 'stateMutate', commands: [{createUnit: true, newUnitData: unitCopy}]});

        return unitCopyObject;
    }

    insert(...units) {
        let self = this;

        this.u.f.iterate(units, (arrayIndex, unit) => {
            self.getView().insert(unit.getView());
        });
    }

    setId(id) {
        this.data.id = id;

        return this;
    }

    async updateInternal(msg) {

        let u = this.u;

        let i = this;

        let {path, value} = msg;
        let relativePath = path;

        let {object, key} = u.f.getDeepestObjectAndKey(this.data, relativePath);

        let oldValue = object[key];
        let newValue = value;

        if (msg.deleteProperty) delete object[key];
        else object[key] = newValue;

        let isRenaming = relativePath === 'name' && newValue;
        if (isRenaming) {
            u.state.renameInStore(i, oldValue, newValue);
        }
    }

    async mutate(msg) {

        let changeCommands = [];

        for (let i = 0; i < msg.commands.length; i++) {
            let cmd = msg.commands[i];
            await this.updateInternal(cmd);
            changeCommands.push( this.createChangeCommand(cmd) );
        }
        if (msg.triggerUnitChange && changeCommands.length > 0) {
            await this.u.trigger({name: 'stateMutate', commands: changeCommands});
        }

        return this;
    }

    createChangeCommand(data) {

        let cmd = {};

        if (data.path) {
            cmd.path = this.getAbsolutePath(data.path);
        }
        if (data.value !== null && data.value !== undefined) {
            cmd.value = data.value;
        }

        if (data.createUnit) {
            cmd.createUnit = true;
            cmd.newUnitData = data.newUnitData;

        } else if (data.updateUnit) {
            cmd.updateUnit = true;

        } else if (data.deleteUnit) {
            cmd.deleteUnit = true;
            cmd.unitId = data.unitId;

        } else if (data.deleteProperty) {
            cmd.deleteProperty = true;
        }

        return cmd;
    }

    getValue(path) {
        let {object, key} = this.u.f.getDeepestObjectAndKey(this.data, path);
        return object[key];
    }

    deleteValue(path) {
        let {object, key} = this.u.f.getDeepestObjectAndKey(this.data, path);
        delete object[key];
    }

    setText(text) {
        this.getView().setText(text)
        return this
    }

    getText() {
        return this.getView().getText();
    }

    DTO() { return this.data }

    getView() {
        if (this.view) return this.view;

        let tagName = 'div';

        if (this.data.view && this.data.view.tagName) {
            tagName = this.data.view.tagName;
        }

        this.view = new this.unitViewClass(tagName)
        this.view.setGlobal(this.u)
        this.view.setUnit(this)

        return this.view
    }

    v() {return this.getView()}

    addClass(...className) {
        this.v().addClass(...className);
        return this;
    }

    removeClass(className) {
        this.v().removeClass(className)
        return this
    }

    async getList(path) {
        let { listCreator } = await u.trigger({name: 'listCreator'});
    }

    getAbsolutePath(relativePath) {
        return this.getId() + '.' + relativePath;
    }

    setPosition(x, y) {

        if (this.data.view && this.data.view.style) {
            this.data.view.style.left = x;
            this.data.view.style.top = y;
        }

        this.getView().setPosition(x, y);
    }

    moveUnder(unit) {
        let newPosition = this.getView().moveUnder(unit);
        if (this.data.view && this.data.view.style) {
            this.data.view.style.left = newPosition.x;
            this.data.view.style.top = newPosition.y;
        }

        return newPosition;
    }

    moveRight(unit) {
        let newPosition = this.getView().moveRight(unit);
        if (this.data.view && this.data.view.style) {
            this.data.view.style.left = newPosition.x;
            this.data.view.style.top = newPosition.y;
        }

        return newPosition;
    }

    getDOM() { return this.view.getDOM(); }

    focus() {
        this.getView().focus();
        return this;
    }

    in(objectForInjection) {
        objectForInjection.insert(this)
        return this
    }
}


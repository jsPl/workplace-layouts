import SVG from 'svg.js'

class Selection {
    constructor() {
        this.selectables = [];
    }

    get current() {
        return this._current;
    }

    set current(selectedObject) {
        if (this._current) {
            this._current.classList.remove('selected');
        }

        if (selectedObject) {
            selectedObject.classList.add('selected');
            //console.log('selected', this.svgElementToJavascriptClassInstance(selectedObject).constructor.name);
        }

        this._current = selectedObject;
    }

    addSelectable = (obj) => {
        obj.svg.addClass('selectable');
        this.selectables.push(obj);
        return this;
    }

    svgElementToJavascriptClassInstance = (svgEl) => {
        if (!svgEl) return null;
        return this.selectables.find(o => o.svg.id() === svgEl.id);
    }
}

SVG.on(document, 'DOMContentLoaded', () => {
    selection = new Selection()

    SVG.on(window, 'mousedown', (evt) => {
        if (evt.target && evt.target.classList.contains('selectable')) {
            if (selection.current !== evt.target) {
                selection.current = evt.target;
            }
        }
        else {
            selection.current = null;
        }
    });
});

export let selection;
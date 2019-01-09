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
            selection.current = evt.target;
        }
        else {
            selection.current = null;
        }
    });

    SVG.on(window, 'keydown', (evt) => {
        console.log('keydown', evt.keyCode);
        let objInstance;

        if (selection.current) {
            objInstance = selection.svgElementToJavascriptClassInstance(selection.current);
        }

        switch (evt.keyCode) {
            case 27: // esc
                selection.current = null;
                break;

            default:
                break;
        }

        if (objInstance && evt.keyCode >= 37 && evt.keyCode <= 40) {
            const shiftBy = 2;
            objInstance.handleDragStart();

            switch (evt.keyCode) {
                case 40: // down
                    objInstance.svg.dy(shiftBy);
                    break;
                case 38: // up
                    objInstance.svg.dy(-shiftBy);
                    break;
                case 37: // left
                    objInstance.svg.dx(-shiftBy);
                    break;
                case 39: // right
                    objInstance.svg.dx(shiftBy);
                    break;
                default: break;
            }

            objInstance.handleDragMove({});
            objInstance.handleDragEnd();
        }

    });
});

export let selection;
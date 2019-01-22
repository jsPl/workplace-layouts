import { selection } from './selection'

export default function () {
    document.addEventListener('keydown', evt => {
        //console.log('keydown', evt.keyCode);
        let selectedObjInstance;

        if (selection.current) {
            selectedObjInstance = selection.svgElementToJavascriptClassInstance(selection.current);
        }

        switch (evt.keyCode) {
            case 27: // esc
                selection.current = null;
                break;

            default:
                break;
        }

        if (selectedObjInstance) {
            if (evt.keyCode >= 37 && evt.keyCode <= 40) {
                const shiftBy = (evt.altKey ? 1 : 2) + (evt.shiftKey ? 10 : 0);
                selectedObjInstance.handleDragStart();

                switch (evt.keyCode) {
                    case 40: // down
                        selectedObjInstance.svg.dy(shiftBy);
                        break;
                    case 38: // up
                        selectedObjInstance.svg.dy(-shiftBy);
                        break;
                    case 37: // left
                        selectedObjInstance.svg.dx(-shiftBy);
                        break;
                    case 39: // right
                        selectedObjInstance.svg.dx(shiftBy);
                        break;
                    default: break;
                }

                selectedObjInstance.handleDragMove();
                selectedObjInstance.handleDragEnd();                
            }

            switch (evt.keyCode) {
                case 46: // del
                    if (selectedObjInstance.handleDelete) {
                        selectedObjInstance.handleDelete();
                    }
                    break;
    
                default:
                    break;
            }
        }
    });
}
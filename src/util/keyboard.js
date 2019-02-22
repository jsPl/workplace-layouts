import { selection } from './selection'
import { workplaceRepository } from '../workplace/workplaceRepository'

export default function () {
    document.addEventListener('keydown', evt => {
        //console.log('keydown', evt.keyCode);
        let selectedObjInstance;

        if (!selection) {
            return;
        }

        if (selection.current) {
            selectedObjInstance = workplaceRepository.findById(selection.currentId());
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
import SVG from 'svg.js';
import { selection } from './selection';
import { workplaceRepository } from '../workplace/workplaceRepository';

export default function () {
    document.addEventListener('keydown', evt => {
        console.log('keyboard keydown', evt.key);
        let selectedWorkplaceObjInstance;

        if (!selection) {
            return;
        }

        if (selection.current) {
            selectedWorkplaceObjInstance = workplaceRepository.findById(selection.currentId());
        }

        switch (evt.key) {
            case 'Escape':
                selection.current = null;
                break;

            default:
                break;
        }

        if (selectedWorkplaceObjInstance) {
            if (evt.keyCode >= 37 && evt.keyCode <= 40) {
                const shiftBy = (evt.ctrlKey ? 1 : 2) + (evt.shiftKey ? 10 : 0);
                selectedWorkplaceObjInstance.handleDragStart();

                switch (evt.key) {
                    case 'ArrowDown':
                        selectedWorkplaceObjInstance.svg.dy(shiftBy);
                        break;
                    case 'ArrowUp':
                        selectedWorkplaceObjInstance.svg.dy(-shiftBy);
                        break;
                    case 'ArrowLeft':
                        selectedWorkplaceObjInstance.svg.dx(-shiftBy);
                        break;
                    case 'ArrowRight':
                        selectedWorkplaceObjInstance.svg.dx(shiftBy);
                        break;
                    default: break;
                }

                selectedWorkplaceObjInstance.handleDragMove();
                selectedWorkplaceObjInstance.handleDragEnd();
            }
        }

        if (selection.current) {
            switch (evt.key) {
                case 'Delete':
                    const svgObj = SVG.get(selection.current.id);
                    if (svgObj) {
                        svgObj.remove();
                    }
                    break;
                default:
                    break;
            }
        }
    });
}
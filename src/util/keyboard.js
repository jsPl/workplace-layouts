import SVG from 'svg.js';
import { selection } from './selection';
import { workplaceRepository } from '../workplace/workplaceRepository';

export default function () {
    document.addEventListener('keydown', evt => {
        //console.log('keyboard keydown', evt.key);
        let selectedWorkplace;

        if (!selection) {
            return;
        }

        if (selection.current) {
            selectedWorkplace = workplaceRepository.findById(selection.currentId());
        }

        switch (evt.key) {
            case 'Escape':
                selection.current = null;
                break;

            default:
                break;
        }

        if (selectedWorkplace) {
            if (selectedWorkplace.isDragEnabled() && evt.keyCode >= 37 && evt.keyCode <= 40) {
                const shiftBy = (evt.ctrlKey ? 1 : 2) + (evt.shiftKey ? 10 : 0);
                selectedWorkplace.handleDragStart();

                switch (evt.key) {
                    case 'ArrowDown':
                        selectedWorkplace.svg.dy(shiftBy);
                        break;
                    case 'ArrowUp':
                        selectedWorkplace.svg.dy(-shiftBy);
                        break;
                    case 'ArrowLeft':
                        selectedWorkplace.svg.dx(-shiftBy);
                        break;
                    case 'ArrowRight':
                        selectedWorkplace.svg.dx(shiftBy);
                        break;
                    default: break;
                }

                selectedWorkplace.handleDragMove();
                selectedWorkplace.handleDragEnd();
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
import SVG from 'svg.js';
import { SvgClassname } from './draw';
import { selection } from './selection';
import { workplaceRepository } from '../workplace/workplaceRepository';

export default function () {
    document.addEventListener('keydown', evt => {
        //console.log('keyboard keydown', evt.key);

        if (!selection) {
            return;
        }

        if (evt.key === 'Escape') {
            selection.clear();
        }

        if (!selection.isEmpty()) {
            handleWorkplaceSelectionEvents(evt);

            switch (evt.key) {
                case 'Delete':
                    handleSelectionDeleteEvents(evt);
                    break;
                default:
                    break;
            }
        }
    })
}

const handleWorkplaceSelectionEvents = evt => {
    const selectedWorkplaces = workplaceRepository.findByIds(selection.currentWorkplaceIds());

    selectedWorkplaces.forEach(workplace => {
        if (workplace.isDragEnabled() && evt.keyCode >= 37 && evt.keyCode <= 40) {
            const shiftBy = 1 + (evt.shiftKey ? 10 : 0);
            workplace.handleDragStart();

            const moveByKey = {
                'ArrowDown': { dy: shiftBy }, 'ArrowUp': { dy: -shiftBy },
                'ArrowLeft': { dx: -shiftBy }, ArrowRight: { dx: shiftBy }
            };

            workplace.svg.dmove(...Object.values({ dx: 0, dy: 0, ...moveByKey[evt.key] }))

            workplace.handleDragMove();
            workplace.handleDragEnd();
        }
    });
}

const handleSelectionDeleteEvents = evt => {
    selection.current.forEach(o => {
        const svgObj = SVG.get(o.id);
        if (svgObj) {
            switch (SvgClassname.get(svgObj)) {
                case 'Workplace':
                    break;

                case 'MeasureTool':
                    svgObj.remove();
                    break;

                default:
                    break;
            }
        }
    })
}
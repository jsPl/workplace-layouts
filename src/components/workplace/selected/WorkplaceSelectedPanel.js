import React from 'react';
import WorkplaceSelectedList from './WorkplaceSelectedList';
import { settings } from '../../../util/settings';
import withPopoverHint from '../../panel/withPopoverHint';

const WorkplaceSelectedPanel = ({ selectedWorkplaces }) => {
    return (
        <WorkplaceSelectedList selectedWorkplaces={selectedWorkplaces} />
    )
}

const hint =
    <span>
        Use <kbd>&#8592;</kbd><kbd>&#8593;</kbd>
        <kbd>&#8594;</kbd><kbd>&#8595;</kbd> to move selected workplaces around
        (hold <kbd>Shift</kbd> for quicker movement).
        You can hold <kbd>Ctrl</kbd> and mouse click to select multiple workplaces.
    </span>;

const hintConfig = ({ selectedWorkplaces }) => ({
    content: hint,
    visible: selectedWorkplaces.length > 0 && settings.getHintMultipleSelectionVisible(),
    handleDismiss() { settings.setHintMultipleSelectionVisible(false) },
    placement: 'right'
})

export default withPopoverHint(WorkplaceSelectedPanel, hintConfig)
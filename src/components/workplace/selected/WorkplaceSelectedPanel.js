import React from 'react';
import WorkplaceSelectedList from './WorkplaceSelectedList';
import { settings } from '../../../modules/utils/settings';
import withPopoverHint from '../../panel/withPopoverHint';

const WorkplaceSelectedPanel = ({ selectedWorkplaces }) => {
    return (
        <WorkplaceSelectedList selectedWorkplaces={selectedWorkplaces} />
    )
}

const hint =
    <dl>
        <dt>Moving workplaces around</dt>
        <dd>Drag with mouse or use <kbd>&#8592;</kbd><kbd>&#8593;</kbd>
            <kbd>&#8594;</kbd><kbd>&#8595;</kbd><br />
            Hold <kbd>Shift</kbd> for quicker movement.
        </dd>
        <dt>Selecting workplaces</dt>
        <dd>
            You can hold <kbd>Ctrl</kbd> for multiple selection.
            <br /><kbd>Esc</kbd> to unselect.
        </dd>
    </dl>

const hintConfig = ({ selectedWorkplaces }) => ({
    content: hint,
    visible: selectedWorkplaces.length > 0 && settings.getHintMultipleSelectionVisible(),
    handleDismiss() { settings.setHintMultipleSelectionVisible(false) },
    placement: 'right'
})

export default withPopoverHint(WorkplaceSelectedPanel, hintConfig)
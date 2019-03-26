import React from 'react';
import Draggable from 'react-draggable';
import { Badge, Card, Popover } from 'antd';
import WorkplaceSelectedList from './WorkplaceSelectedList';
import PopoverHintDismiss from '../../panel/PopoverHintDismiss';
import { settings } from '../../../util/settings';
import classNames from 'classnames';

export default class WorkplaceSelectedPanel extends React.Component {
    state = { x: 0, y: 0 };

    handleDragStop = (evt, data) => {
        const { x, y } = data;
        this.setState({ x, y })
    }

    render() {
        const { selectedWorkplaces } = this.props;
        const { x, y } = this.state;
        const visible = selectedWorkplaces.length > 0;
        const panelClass = classNames({
            collapseSelected: true,
            hidden: !visible
        });

        const infoContent =
            <div className='infoContent'>
                Use <kbd>&#8592;</kbd><kbd>&#8593;</kbd>
                <kbd>&#8594;</kbd><kbd>&#8595;</kbd> to move selected workplaces around 
                (hold <kbd>Shift</kbd> for quicker movement).
                You can hold <kbd>Ctrl</kbd> and mouse click to select multiple workplaces.
                <PopoverHintDismiss
                    handleDismiss={() => { settings.setHintMultipleSelectionVisible(false); this.forceUpdate() }}
                />
            </div>;

        return (

            <Draggable
                onStop={this.handleDragStop}
                handle='.ant-card-head-wrapper'
                bounds='body'
                defaultPosition={{ x, y }}
            >
                <div className={panelClass}>
                    <Popover 
                        content={infoContent} 
                        visible={visible && settings.getHintMultipleSelectionVisible()} 
                        placement='right'>
                        <Card
                            title={<SelectedPanelHeader count={selectedWorkplaces.length} />}
                            type='inner'
                            size='small'
                            className='panelWorkplaceDetails'
                        >
                            <WorkplaceSelectedList selectedWorkplaces={selectedWorkplaces} />
                        </Card>
                    </Popover>
                </div>
            </Draggable>
        )
    }
}

const SelectedPanelHeader = ({ count }) => {
    const selectedCount = count > 1 ? count : null;
    return (
        <Badge count={selectedCount} offset={[15, 8]} className='countBadge' title='Selected items'>Selected</Badge>
    )
}
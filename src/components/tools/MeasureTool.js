import React from 'react';
import { Button, Popover } from 'antd';
import { connect } from 'react-redux';
import { toggleMeasureTool } from '../../actions';
import { isMeasureToolMode, isLoadingWorkplaces } from '../../selectors';

const MeasureTool = ({ isMeasureMode, isLoading, toggleMeasureTool }) => {
    const infoContent =
        <div className='toolInfoContent'>
            Click on stage to measure distance between two points.<br/>
            Use <kbd>Esc</kbd> to cancel, <kbd>&#8592;</kbd><kbd>&#8593;</kbd>
            <kbd>&#8594;</kbd><kbd>&#8595;</kbd> to pan view.<br/>
            You can drag or select and <kbd>Delete</kbd> each measure.
        </div>;

    return (
        <>
            <Popover content={infoContent} visible={isMeasureMode}>
                <Button onClick={toggleMeasureTool} icon='colum-height' disabled={isMeasureMode || isLoading}>
                    Measure
                </Button>
            </Popover>
        </>
    )
}

const mapStateToProps = state => ({
    isMeasureMode: isMeasureToolMode(state),
    isLoading: isLoadingWorkplaces(state)
})

const mapDispatchToProps = {
    toggleMeasureTool
}

export default connect(mapStateToProps, mapDispatchToProps)(MeasureTool)
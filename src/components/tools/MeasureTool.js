import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { isMeasureToolMode, toggleMeasureTool } from '../../redux/ui';
import { isLoadingWorkplaces } from '../../redux/workplace';
import { settings } from '../../util/settings';
import withPopoverHint from '../panel/withPopoverHint';

const MeasureTool = ({ isMeasureMode, isLoading, toggleMeasureTool }) => {
    return (
        <Button onClick={toggleMeasureTool} icon='colum-height' disabled={isMeasureMode || isLoading}>
            Measure
        </Button>
    )
}

const mapStateToProps = state => ({
    isMeasureMode: isMeasureToolMode(state),
    isLoading: isLoadingWorkplaces(state)
})

const mapDispatchToProps = {
    toggleMeasureTool
}

const hint = <span>Click on stage to measure distance between two points.<br />
    Use <kbd>Esc</kbd> to cancel, <kbd>&#8592;</kbd><kbd>&#8593;</kbd>
    <kbd>&#8594;</kbd><kbd>&#8595;</kbd> to pan view.<br />
    You can drag or select and <kbd>Delete</kbd> each measure.</span>;

const hintConfig = ({ isMeasureMode }) => ({
    content: hint,
    visible: isMeasureMode && settings.getHintMeasureToolVisible(),
    handleDismiss() { settings.setHintMeasureToolVisible(false) }
})

MeasureTool.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isMeasureMode: PropTypes.bool.isRequired,
    toggleMeasureTool: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withPopoverHint(MeasureTool, hintConfig))
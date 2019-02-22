import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { toggleDrawingMode } from '../../actions';
import { isDrawingMode } from '../../selectors';

const DrawingControls = ({ isDrawing, handleToggleDrawingMode }) => {
    return (isDrawing ?
        <Button type="default">Press Enter to stop or Esc to cancel</Button>
        :
        <Button type="primary" onClick={handleToggleDrawingMode}>Start drawing</Button>);
};

const mapStateToProps = state => ({
    isDrawing: isDrawingMode(state)
})

const mapDispatchToProps = dispatch => ({
    handleToggleDrawingMode() {
        dispatch(toggleDrawingMode())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(DrawingControls);
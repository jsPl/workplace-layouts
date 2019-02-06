import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { toggleDrawingMode } from '../../actions';

const DrawingControls = ({ isDrawing, handleToggleDrawingMode }) => {
    return (isDrawing ?
        <Button type="default">Press Enter to stop or Esc to cancel</Button>
        :
        <Button type="primary" onClick={handleToggleDrawingMode}>Start drawing</Button>);
};

const mapStateToProps = state => ({
    isDrawing: state.appUi.isDrawingMode
})

const mapDispatchToProps = dispatch => ({
    handleToggleDrawingMode() {
        dispatch(toggleDrawingMode())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(DrawingControls);
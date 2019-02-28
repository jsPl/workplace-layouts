import React from 'react';
import { Button, Card } from 'antd';
import { connect } from 'react-redux';
import { toggleDrawingMode } from '../../actions';
import { isDrawingMode } from '../../selectors';

const DrawingControls = ({ isDrawing, handleToggleDrawingMode }) => {
    return (
        <div className='wpControls'>
            {isDrawing ?
                <Card size='small'>Press Enter to stop or Esc to cancel</Card>
                :
                <Button type="primary" onClick={handleToggleDrawingMode}>Draw layout</Button>}
        </div>
    );
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
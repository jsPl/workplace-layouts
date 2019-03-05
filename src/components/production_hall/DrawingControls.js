import React from 'react';
import { Button, Card } from 'antd';
import { connect } from 'react-redux';
import { toggleDrawingMode, clearProductionHallLayout } from '../../actions';
import { isDrawingMode, getProductionHallLayoutExists } from '../../selectors';

const DrawingControls = ({ isDrawing, layoutExists, handleToggleDrawingMode, handleClearProductionHallLayout }) => {
    return (
        <div className='wpControls'>
            {isDrawing ?
                <Card size='small'>Press Enter to stop or Esc to cancel</Card>
                :
                layoutExists ? 
                    <Button onClick={handleClearProductionHallLayout}>Clear layout</Button>
                    :
                    <Button type="primary" onClick={handleToggleDrawingMode}>Draw layout</Button>
            }
        </div>
    );
};

const mapStateToProps = state => ({
    isDrawing: isDrawingMode(state),
    layoutExists: getProductionHallLayoutExists(state)
})

const mapDispatchToProps = dispatch => ({
    handleToggleDrawingMode() {
        dispatch(toggleDrawingMode())
    },
    handleClearProductionHallLayout() {
        dispatch(clearProductionHallLayout())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(DrawingControls);
import React from 'react';
import { connect } from 'react-redux';
import { Empty, Button } from 'antd';
import { toggleDrawingMode } from '../actions'

export default function ProductionHallDetails({ productionHall }) {
    return (
        !productionHall ?
            <Empty>
                <DrawingControls />
            </Empty>
            :
            <div>
                <div>title: {productionHall.title}</div>
                <div>width: {productionHall.width} height: {productionHall.height}</div>
            </div>
    )
}

let DrawingControls = ({ isDrawing, handleToggleDrawingMode }) => {
    return (
        isDrawing ?
            <Button type="default">Press Enter to stop or Esc to cancel</Button>
            :
            <Button type="primary" onClick={handleToggleDrawingMode}>Start drawing</Button>
    )
}

const mapStateToProps = state => {
    return {
        isDrawing: state.appUi.isDrawingMode
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleToggleDrawingMode: () => {
            dispatch(toggleDrawingMode())
        }
    }
}

DrawingControls = connect(mapStateToProps, mapDispatchToProps)(DrawingControls);
import React from 'react';
import { Empty } from 'antd';
import DrawingControls from './DrawingControls';

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
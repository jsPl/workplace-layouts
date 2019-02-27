import React from 'react';
import { Empty } from 'antd';
import DrawingControls from './DrawingControls';

export default function ProductionHallDetails({ productionHall }) {
    const hasLayout = !!productionHall.layout;

    return (
        <>
            {
                Object.keys(productionHall).length === 0 ? <Empty /> :
                    <div>
                        <div>id: {productionHall.id}</div>
                        <div>title: {productionHall.title}</div>
                    </div>
            }
            {!hasLayout && <DrawingControls />}
        </>
    )
}
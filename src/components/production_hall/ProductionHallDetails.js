import React from 'react';
import { Empty } from 'antd';
//import DrawingControls from './DrawingControls';
import { pixelsToMeters } from '../../util/utils';

export default function ProductionHallDetails({ productionHall }) {
    return (
        <>
            {Object.keys(productionHall).length === 0 ? <Empty /> :
                <div>
                    <div>id: {productionHall.id}</div>
                    <div>title: {productionHall.title}</div>
                    {productionHall.width && <div>width, height: {productionHall.width} {' x '} {productionHall.height}</div>}
                    {productionHall.width && <div>width, height [m]: {pixelsToMeters(productionHall.width)} {' x '} {pixelsToMeters(productionHall.height)}</div>}
                </div>
            }
            {/* <DrawingControls /> */}
        </>
    )
}
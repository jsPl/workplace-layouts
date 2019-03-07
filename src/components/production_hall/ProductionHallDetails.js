import React from 'react';
import { Empty, Spin } from 'antd';
//import DrawingControls from './DrawingControls';
//import { pixelsToMeters, toFixed } from '../../util/utils';

export default function ProductionHallDetails({ productionHall, isLoading }) {
    return (
        <Spin spinning={isLoading}>
            {Object.keys(productionHall).length === 0 ? <Empty /> :
                <div>
                    {/* <div>id: {productionHall.id}</div> */}
                    <div>Title: {productionHall.title}</div>
                    <div>Scale: {productionHall.svgScaleAsString}</div>
                    {/* {productionHall.width && <div>width, height: {productionHall.width} {' x '} {productionHall.height}</div>} */}
                    {/* {productionHall.width && <div>width, height [m]: {' '} 
                        {toFixed(pixelsToMeters(productionHall.width))} 
                        {' x '} 
                        {toFixed(pixelsToMeters(productionHall.height))}</div>} */}
                </div>
            }
            {/* <DrawingControls /> */}
        </Spin>
    )
}
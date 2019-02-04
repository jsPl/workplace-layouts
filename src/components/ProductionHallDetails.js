import React from 'react';
import { Empty, Button } from 'antd';

export default function ProductionHallDetails({ productionHall }) {
    return (
        !productionHall ?
            <Empty size='small'>
                <Button type="primary">Start drawing</Button>
            </Empty>
            :
            <div>
                <div>width: {productionHall.width} height: {productionHall.height}</div>
            </div>
    )
}
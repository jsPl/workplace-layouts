import React from 'react';
import { Empty, Spin } from 'antd';

export default function ProductionHallDetails({ productionHall, isLoading }) {
    return (
        <Spin spinning={isLoading}>
            {Object.keys(productionHall).length === 0 ? <Empty /> :
                <div>
                    {productionHall.title}
                    <span title='Scale' style={{ marginLeft: '0.5em' }}>
                        ({productionHall.svgScaleAsString})
                    </span>
                </div>
            }
        </Spin>
    )
}
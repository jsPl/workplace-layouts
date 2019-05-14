import React from 'react';
import MeasureTool from './MeasureTool';
import CraftTool from './CraftTool';
import SwapTool from './SwapTool';

const Tools = () => {
    return (
        <div className='tools'>
            <MeasureTool />
            <CraftTool />
            <SwapTool />
        </div>
    )
}

export default Tools;
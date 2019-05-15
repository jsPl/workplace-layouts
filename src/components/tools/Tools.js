import React from 'react';
import MeasureTool from './MeasureTool';
import CraftTool from './CraftTool';
import SwapTool from './SwapTool';

const Tools = () => {
    return (
        <div className='tools'>
            <MeasureTool />
            <SwapTool />
            <CraftTool />
        </div>
    )
}

export default Tools;
import React from 'react';
import MeasureTool from './MeasureTool';
import CraftTool from './craft/CraftTool';
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
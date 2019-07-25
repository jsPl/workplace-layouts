import React, { useState } from 'react';
import { Select } from 'antd';
import { settings } from '../../modules/utils/settings';

const { Option } = Select;

export const CRAFT_SPEED_OPTIONS = [
    {
        value: 'moderate',
        iterationDelaySec: 5,
        swapDelayMs: 100,
        title() {
            return `${this.iterationDelaySec}s delay between iterations. ${this.swapDelayMs}ms delay between swaps`
        }
    },
    {
        value: 'fast',
        iterationDelaySec: 0,
        swapDelayMs: 1,
        title() { return `No delay between iterations. ${this.swapDelayMs}ms delay between swaps` }
    },
]

export const CraftSpeed = props => {
    const [value, setValue] = useState(settings.getCraftSpeed());

    const handleChange = value => {
        settings.setCraftSpeed(value);
        setValue(value);
    }

    return (
        <label className='settingItem' title='Craft algorithm speed'>
            <span>Craft speed</span>
            <Select value={value} onChange={handleChange} style={{ width: '8em' }}>
                {
                    CRAFT_SPEED_OPTIONS.map(o => <Option key={o.value} title={o.title()}>{o.value}</Option>)
                }
            </Select>
        </label>
    )
}
import React from 'react';
import { Button } from 'antd';
import { settings } from '../../modules/utils/settings';

class RestoreDefaults extends React.Component {
    render() {
        return (
            <div className='settingItem restoreDefaults'>
                <Button
                    icon='delete'
                    disabled={!settings.hasItems()}
                    title='Restore all hint notifications and other settings'
                    onClick={() => { settings.restoreDefaults(); this.forceUpdate(); }}
                >
                    Restore defaults
                </Button>
            </div>
        )
    }
}

export default RestoreDefaults;
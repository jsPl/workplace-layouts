import React from 'react';
import { Button } from 'antd';
import { settings } from '../../modules/utils/settings';

class RestoreDefaults extends React.Component {
    render() {
        return (
            <Button
                icon='delete'
                disabled={!settings.hasItems()}
                title='Restore all hint notifications and other settings'
                onClick={() => { settings.restoreDefaults(); this.forceUpdate(); }}
            >
                restore defaults
            </Button>
        )
    }
}

export default RestoreDefaults;
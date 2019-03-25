import React from 'react';
import AppSettings from './AppSettings';

export default class AppSettingsContainer extends React.Component {
    state = { visible: false };

    showDrawer = () => this.setState({ visible: true })
    closeDrawer = () => this.setState({ visible: false })

    render() {
        return (
            <AppSettings
                isDrawerVisible={this.state.visible}
                onDrawerClose={this.closeDrawer}
                onDrawerShow={this.showDrawer}
            />
        )
    }
}
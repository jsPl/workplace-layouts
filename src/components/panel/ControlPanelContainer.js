import React from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import { isLoadingWorkplaces } from '../../redux/workplace';
import { getMessage } from '../../redux/ui';
import { getConnectedApis } from '../../redux/api';
import ControlPanel from './ControlPanel';
import { settings } from '../../modules/utils/settings';

class ControlPanelContainer extends React.Component {

    showUiMessage(prevProps) {
        const { uiMessage } = this.props;
        if (uiMessage && uiMessage !== prevProps.uiMessage) {
            message[uiMessage.type || 'info'](uiMessage.message, uiMessage.duration || 5);
        }
    }

    componentDidUpdate(prevProps) {
        this.showUiMessage(prevProps);
    }

    render() {
        const { isLoading, connectedApis } = this.props;
        return (
            <ControlPanel
                isLoading={isLoading}
                handleCollapseChange={activeItems => settings.setControlPanelCollapseItems(activeItems)}
                collapseDefaultActiveKey={settings.getControlPanelCollapseItems()}
                connectedApis={connectedApis}
            />
        )
    }
}

const mapStateToProps = state => ({
    isLoading: isLoadingWorkplaces(state),
    uiMessage: getMessage(state),
    connectedApis: getConnectedApis(state),
});

export default connect(mapStateToProps)(ControlPanelContainer)
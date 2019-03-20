import React from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import { getSelectedWorkplaces, getProductionHall, isLoadingWorkplaces, getMessage } from '../selectors';
import ControlPanel from './ControlPanel';
import { settings } from '../util/settings';

class ControlPanelContainer extends React.Component {

    showUiMessage(prevProps) {
        const { uiMessage } = this.props;
        if (uiMessage && uiMessage !== prevProps.uiMessage) {
            message[uiMessage.type || 'info'](uiMessage.message, 5);
        }
    }

    componentDidUpdate(prevProps) {
        this.showUiMessage(prevProps);
    }

    render() {
        const { selectedWorkplaces, productionHall, isLoadingWorkplaces } = this.props;
        return (
            <ControlPanel
                selectedWorkplaces={selectedWorkplaces}
                productionHall={productionHall}
                isLoadingWorkplaces={isLoadingWorkplaces}
                handleCollapseChange={activeItems => settings.setControlPanelCollapseItems(activeItems)}
                collapseDefaultActiveKey={settings.getControlPanelCollapseItems()}
            />
        )
    }
}

const mapStateToProps = state => ({
    selectedWorkplaces: getSelectedWorkplaces(state),
    productionHall: getProductionHall(state),
    isLoadingWorkplaces: isLoadingWorkplaces(state),
    uiMessage: getMessage(state)
});

export default connect(mapStateToProps)(ControlPanelContainer)
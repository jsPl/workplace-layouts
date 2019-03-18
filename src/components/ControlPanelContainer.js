import React from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import { getSelectedWorkplace, getProductionHall, isLoadingWorkplaces, getMessage } from '../selectors';
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
        const { selectedWorkplace, productionHall, isLoadingWorkplaces } = this.props;
        return (
            <ControlPanel
                selectedWorkplace={selectedWorkplace}
                productionHall={productionHall}
                isLoadingWorkplaces={isLoadingWorkplaces}
                handleCollapseChange={activeItems => settings.setControlPanelCollapseItems(activeItems)}
                collapseDefaultActiveKey={settings.getControlPanelCollapseItems()}
            />
        )
    }
}

const mapStateToProps = state => ({
    selectedWorkplace: getSelectedWorkplace(state),
    productionHall: getProductionHall(state),
    isLoadingWorkplaces: isLoadingWorkplaces(state),
    uiMessage: getMessage(state)
});

export default connect(mapStateToProps)(ControlPanelContainer)
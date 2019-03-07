import React from 'react';
import WorkplaceDetails from './workplace/WorkplaceDetails';
import WorkplaceList from './workplace/WorkplaceList';
import ProductionHallDetails from './production_hall/ProductionHallDetails';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Collapse, message } from 'antd';
import { getWorkplaces, getSelectedWorkplace, getProductionHall, isLoadingWorkplaces, getMessage } from '../selectors';

const Panel = Collapse.Panel;

class ControlPanel extends React.Component {

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
        const { workplaces, selectedWorkplace, productionHall, isLoadingWorkplaces } = this.props;
        return (
            <Collapse defaultActiveKey={['1', '2', '3']}>
                <Panel header='Production hall' key='1'>
                    <ProductionHallDetails productionHall={productionHall} isLoading={isLoadingWorkplaces} />
                </Panel>
                <Panel header='Workplaces' key='2'>
                    <WorkplaceList
                        workplaces={workplaces}
                        selectedWorkplace={selectedWorkplace}
                        isLoading={isLoadingWorkplaces}
                    />
                </Panel>
                {selectedWorkplace &&
                    <Panel header='Selected' key='3'>
                        <WorkplaceDetails workplace={selectedWorkplace} />
                    </Panel>
                }
            </Collapse>
        )
    }
}

const mapStateToProps = state => ({
    workplaces: getWorkplaces(state),
    selectedWorkplace: getSelectedWorkplace(state),
    productionHall: getProductionHall(state),
    isLoadingWorkplaces: isLoadingWorkplaces(state),
    uiMessage: getMessage(state)
});

ControlPanel.propTypes = {
    workplaces: PropTypes.array.isRequired,
    selectedWorkplace: PropTypes.object,
    productionHall: PropTypes.object
}

export default connect(mapStateToProps)(ControlPanel)
import React from 'react';
import WorkplaceDetails from './workplace/WorkplaceDetails';
import Workplaces from './workplace/Workplaces';
import ProductionHallDetails from './production_hall/ProductionHallDetails';
import Tools from './tools/Tools';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Collapse, message } from 'antd';
import { getSelectedWorkplace, getProductionHall, isLoadingWorkplaces, getMessage } from '../selectors';

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
        const { selectedWorkplace, productionHall, isLoadingWorkplaces } = this.props;
        return (
            <Collapse defaultActiveKey={['1', '2', '3', '4']}>
                <Panel header='Production hall' key='1'>
                    <ProductionHallDetails productionHall={productionHall} isLoading={isLoadingWorkplaces} />
                </Panel>
                <Panel header='Tools' key='2'>
                    <Tools />
                </Panel>
                <Panel header='Workplaces' key='3' className='panelWorkplaces'>
                    <Workplaces
                        selectedWorkplace={selectedWorkplace}
                        isLoading={isLoadingWorkplaces}
                    />
                </Panel>
                {selectedWorkplace &&
                    <Panel header='Selected' key='4'>
                        <WorkplaceDetails workplace={selectedWorkplace} />
                    </Panel>
                }
            </Collapse>
        )
    }
}

const mapStateToProps = state => ({
    selectedWorkplace: getSelectedWorkplace(state),
    productionHall: getProductionHall(state),
    isLoadingWorkplaces: isLoadingWorkplaces(state),
    uiMessage: getMessage(state)
});

ControlPanel.propTypes = {
    selectedWorkplace: PropTypes.object,
    productionHall: PropTypes.object
}

export default connect(mapStateToProps)(ControlPanel)
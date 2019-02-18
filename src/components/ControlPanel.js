import React from 'react';
import WorkplaceDetails from './workplace/WorkplaceDetails';
import WorkplaceList from './workplace/WorkplaceList';
import ProductionHallDetails from './production_hall/ProductionHallDetails';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Collapse, message } from 'antd';

const Panel = Collapse.Panel;

class ControlPanel extends React.Component {

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        //console.log('componentDidUpdate prevProps error', prevProps.error, error);
        if (error && error !== prevProps.error) {
            message.error(error.message);
        }
    }

    render() {
        const { workplaces, selectedWorkplace, productionHall, isLoadingWorkplaces } = this.props;
        return (
            <Collapse defaultActiveKey={['1', '2', '3']}>
                <Panel header='Production hall' key='1'>
                    <ProductionHallDetails productionHall={productionHall} />
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
    workplaces: state.workplaces,
    selectedWorkplace: state.workplaces.find(o => o.id === state.appUi.selectedWorkplace),
    productionHall: state.productionHall,
    isLoadingWorkplaces: state.appUi.isLoadingWorkplaces,
    error: state.appUi.error
});

ControlPanel.propTypes = {
    workplaces: PropTypes.array.isRequired,
    selectedWorkplace: PropTypes.object,
    productionHall: PropTypes.object
}

export default connect(mapStateToProps)(ControlPanel)
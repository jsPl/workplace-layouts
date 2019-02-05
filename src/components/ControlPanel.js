import React from 'react';
import WorkplaceDetails from './WorkplaceDetails';
import WorkplaceList from './WorkplaceList';
import ProductionHallDetails from './ProductionHallDetails';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Collapse } from 'antd';

const Panel = Collapse.Panel;

let ControlPanel = ({ workplaces, selectedWorkplace, productionHall }) => {

    return (
        <Collapse defaultActiveKey={['1', '2', '3']}>
            <Panel header='Production hall' key='1'>
                <ProductionHallDetails productionHall={productionHall} />
            </Panel>
            <Panel header='Workplaces' key='2'>
                <WorkplaceList
                    workplaces={workplaces}
                    selectedWorkplace={selectedWorkplace}
                />
            </Panel>
            {selectedWorkplace && 
                <Panel header='Selected' key='3'>
                    <WorkplaceDetails workplace={selectedWorkplace} />
                </Panel>
            }
            {/* <Button>Default</Button> */}
        </Collapse>
    )
}

const mapStateToProps = state => {
    return {
        workplaces: state.workplaces,
        selectedWorkplace: state.workplaces.find(o => o.id === state.selectedWorkplace),
        productionHall: state.productionHall
    }
}

ControlPanel.propTypes = {
    workplaces: PropTypes.array.isRequired,
    selectedWorkplace: PropTypes.object,
    productionHall: PropTypes.object
}

export default connect(mapStateToProps)(ControlPanel)
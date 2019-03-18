import React from 'react';
import WorkplaceDetails from './workplace/WorkplaceDetails';
import Workplaces from './workplace/Workplaces';
import ProductionHallDetails from './production_hall/ProductionHallDetails';
import Tools from './tools/Tools';
import PropTypes from 'prop-types';
import { Collapse } from 'antd';

const Panel = Collapse.Panel;

const ControlPanel = ({ selectedWorkplace, productionHall, isLoadingWorkplaces, handleCollapseChange,
    collapseDefaultActiveKey }) => {

    return (
        <Collapse defaultActiveKey={collapseDefaultActiveKey} onChange={handleCollapseChange}>
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
                <Panel header='Selected' key='4' className='panelWorkplaceDetails'>
                    <WorkplaceDetails workplace={selectedWorkplace} />
                </Panel>
            }
        </Collapse>
    )
}

ControlPanel.propTypes = {
    selectedWorkplace: PropTypes.object,
    productionHall: PropTypes.object,
    handleCollapseChange: PropTypes.func,
    isLoadingWorkplaces: PropTypes.bool
}

export default ControlPanel
import React from 'react';
import Workplaces from '../workplace/Workplaces';
import Processes from '../process/Processes';
import ProductionHallDetails from '../production_hall/ProductionHallDetails';
import Tools from '../tools/Tools';
import PropTypes from 'prop-types';
import { Collapse } from 'antd';
import WorkplaceSelectedPanel from '../workplace/selected/WorkplaceSelectedPanel';

const Panel = Collapse.Panel;

const ControlPanel = ({ selectedWorkplaces, productionHall, isLoadingWorkplaces, handleCollapseChange,
    collapseDefaultActiveKey }) => {

    return (
        <>
            <Collapse defaultActiveKey={collapseDefaultActiveKey} onChange={handleCollapseChange}>
                <Panel header='Production hall' key='1'>
                    <ProductionHallDetails productionHall={productionHall} isLoading={isLoadingWorkplaces} />
                </Panel>
                <Panel header='Tools' key='2'>
                    <Tools />
                </Panel>
                <Panel header='Workplaces' key='3' className='panelWorkplaces'>
                    <Workplaces
                        selectedWorkplaces={selectedWorkplaces}
                        isLoading={isLoadingWorkplaces}
                    />
                </Panel>
                <Panel header='Processes' key='4' className='panelProcesses'>
                    <Processes
                        isLoading={isLoadingWorkplaces}
                    />
                </Panel>
            </Collapse>

            <WorkplaceSelectedPanel selectedWorkplaces={selectedWorkplaces} />
        </>
    )
}

ControlPanel.propTypes = {
    selectedWorkplaces: PropTypes.array,
    productionHall: PropTypes.object,
    handleCollapseChange: PropTypes.func,
    isLoadingWorkplaces: PropTypes.bool
}

export default ControlPanel
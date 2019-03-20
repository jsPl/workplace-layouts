import React from 'react';
import WorkplaceDetails from './workplace/WorkplaceDetails';
import Workplaces from './workplace/Workplaces';
import ProductionHallDetails from './production_hall/ProductionHallDetails';
import Tools from './tools/Tools';
import PropTypes from 'prop-types';
import { Collapse, List } from 'antd';

const Panel = Collapse.Panel;

const ControlPanel = ({ selectedWorkplaces, productionHall, isLoadingWorkplaces, handleCollapseChange,
    collapseDefaultActiveKey }) => {

    const selectedCount = selectedWorkplaces.length > 1 ? `(${selectedWorkplaces.length})` : '';

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
                    selectedWorkplaces={selectedWorkplaces}
                    isLoading={isLoadingWorkplaces}
                />
            </Panel>
            {
                selectedWorkplaces.length > 0 &&
                <Panel header={`Selected ${selectedCount}`} key='4' className='panelWorkplaceDetails'>
                    <List
                        size='small' className='selectedList'
                        dataSource={selectedWorkplaces}
                        renderItem={wp => <WorkplaceDetails key={wp.id} workplace={wp} />}
                    />
                    {/* {
                        selectedWorkplaces.map(workplace => <WorkplaceDetails key={workplace.id} workplace={workplace} />)
                    } */}
                </Panel>
            }
        </Collapse>
    )
}

ControlPanel.propTypes = {
    selectedWorkplaces: PropTypes.array,
    productionHall: PropTypes.object,
    handleCollapseChange: PropTypes.func,
    isLoadingWorkplaces: PropTypes.bool
}

export default ControlPanel
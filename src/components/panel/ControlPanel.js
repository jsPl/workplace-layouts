import React from 'react';
import Workplaces from '../workplace/Workplaces';
import Processes from '../process/Processes';
import ProductionHallDetails from '../production_hall/ProductionHallDetails';
import Tools from '../tools/Tools';
import PropTypes from 'prop-types';
import { Collapse, Empty } from 'antd';
import ApiCardList from '../api/ApiCardList';

const Panel = Collapse.Panel;

const ControlPanel = ({ isLoading, handleCollapseChange, collapseDefaultActiveKey, connectedApis }) => {
    const connectedApisCount = Object.keys(connectedApis).length;

    return (
        <Collapse defaultActiveKey={collapseDefaultActiveKey} onChange={handleCollapseChange}>
            <Panel header='Production hall' key='hall'>
                <ProductionHallDetails />
            </Panel>
            <Panel header='Tools' key='tools'>
                <Tools />
            </Panel>
            <Panel header='Workplaces' key='workplaces' className='panelWorkplaces'>
                <Workplaces isLoading={isLoading} />
            </Panel>
            {
                connectedApisCount > 0 &&
                <Panel header={`Connected APIs (${connectedApisCount})`} key='apis' className='panelApis'>
                    <ApiCardList connectedApis={connectedApis} />
                </Panel>
            }
            <Panel header='Processes' key='processes' className='panelProcesses'>
                <Processes isLoading={isLoading} />
            </Panel>
        </Collapse>
    )
}

export const EmptyList = props => <Empty className='listEmpty' imageStyle={{ height: 70 }} {...props} />

ControlPanel.propTypes = {
    handleCollapseChange: PropTypes.func,
    isLoading: PropTypes.bool,
}

export default ControlPanel
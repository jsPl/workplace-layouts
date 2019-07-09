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
            <Panel header='Production hall' key='1'>
                <ProductionHallDetails />
            </Panel>
            <Panel header='Tools' key='2'>
                <Tools />
            </Panel>
            <Panel header='Workplaces' key='3' className='panelWorkplaces'>
                <Workplaces isLoading={isLoading} />
            </Panel>
            {
                connectedApisCount > 0 &&
                <Panel header={`Connected APIs (${connectedApisCount})`} key='5' className='panelApis'>
                    <ApiCardList connectedApis={connectedApis} />
                </Panel>
            }
            <Panel header='Processes' key='4' className='panelProcesses'>
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
import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { isLoadingWorkplaces } from '../../redux/workplace';
import { getProcessesIds } from '../../redux/process';
import { fetchAllOperations, getOperationsByProcess } from '../../redux/operation';
import Craft from '../../modules/utils/Craft';
import { workplaceRepository } from '../../modules/workplace/workplaceRepository';
import { store } from '../../redux/configureStore';

const CraftTool = ({ isLoading, processesIds, fetchAllOperations }) => {
    return (
        <Button onClick={() => fetchAllOperations(processesIds)} icon='calculator' disabled={isLoading}>
            Craft
        </Button>
    )
}

const mapStateToProps = state => ({
    isLoading: isLoadingWorkplaces(state),
    processesIds: getProcessesIds(state)
})

const mapDispatchToProps = dispatch => ({
    fetchAllOperations(processesIds) {
        const callback = () => runCraft()
        dispatch(fetchAllOperations({ processesIds, callback }))
    }
})

const runCraft = () => {
    console.log('run craft');

    const operationsByProcess = getOperationsByProcess(store.getState());

    const craft = new Craft({ workplaces: workplaceRepository.list(), operationsByProcess })
    const distanceData = craft.calculateDistanceData();
    //craft.logCentroids({ draw: true })
    console.log('distanceData', distanceData)
    console.log('flow', craft.calculateFlowData())
    
    const k = Object.values(distanceData).map(o => Object.keys(o).length).sort((a, b) => a - b)
    console.log(k, k.reduce((a, c) => a + c))

    craft.calculateLayoutCost()
}

export default connect(mapStateToProps, mapDispatchToProps)(CraftTool)
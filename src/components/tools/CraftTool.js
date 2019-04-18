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
        const callback = () => { console.log('callback all done'); }
        dispatch(fetchAllOperations({ processesIds, callback }))
    }
})

const runCraft = () => {
    console.log('run craft');
    const operationsByProcess = getOperationsByProcess(store.getState());

    const craft = new Craft({ workplaces: workplaceRepository.list(), operationsByProcess })
    craft.logCentroids({ draw: true })
    console.log('distances', craft.calculateDistanceData())
}

export default connect(mapStateToProps, mapDispatchToProps)(CraftTool)
import React from 'react';
import PropTypes from 'prop-types';
import { List, Spin } from 'antd';
import { getSelectedProcessesId, selectProcess } from '../../redux/process';
import { getOperationsByProcess, isLoadingOperations, fetchOperations } from '../../redux/operation';
import { setSelectedItemsActiveTab } from '../../redux/ui';
import { connect } from 'react-redux';

const ProcessListItem = ({ process, handleProcessClick, isLoading, isSelected, needFetchingOperations }) => (
    <List.Item className={isSelected ? 'selected' : null}
        onClick={() => handleProcessClick(process.id, needFetchingOperations)}>
        <Spin spinning={isLoading}>{process.title}</Spin>
    </List.Item>
);

const mapStateToProps = (state, props) => {
    const processId = props.process.id;
    const operationsByProcess = getOperationsByProcess(state, processId);
    return {
        isLoading: isLoadingOperations(state),
        isSelected: getSelectedProcessesId(state).includes(processId),
        needFetchingOperations: operationsByProcess === undefined
    }
};

const mapDispatchToProps = (dispatch) => ({
    handleProcessClick(processId, needFetchingOperations) {
        if (needFetchingOperations) {
            dispatch(fetchOperations(processId));
        }
        else {
            dispatch(setSelectedItemsActiveTab('operations'));
        }
        dispatch(selectProcess([processId]));
    }
});

ProcessListItem.propTypes = {
    process: PropTypes.object.isRequired,
    isSelected: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(ProcessListItem);
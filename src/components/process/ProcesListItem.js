import React from 'react';
import PropTypes from 'prop-types';
import { List, Spin } from 'antd';
import { getSelectedProcessesId } from '../../redux/process';
import { getOperationsByProcess, isLoadingOperations, fetchOperations } from '../../redux/operation';
import { connect } from 'react-redux';

const ProcessListItem = ({ process, handleProcessClick, isLoading, isSelected, fetchedOperations }) => (
    <List.Item className={isSelected ? 'selected' : null}
        onClick={() => handleProcessClick(process.id, fetchedOperations)}>
        <Spin spinning={isLoading}>{process.title}</Spin>
    </List.Item>
);

const mapStateToProps = (state, props) => {
    const processId = props.process.id;
    const operationsByProcess = getOperationsByProcess(state, processId);
    return {
        isLoading: isLoadingOperations(state),
        isSelected: getSelectedProcessesId(state).includes(processId),
        fetchedOperations: operationsByProcess
    }
};

const mapDispatchToProps = (dispatch) => ({
    handleProcessClick(processId, fetchedOperations) {
        dispatch(fetchOperations({ processId, fetchedOperations }));
    }
});

ProcessListItem.propTypes = {
    process: PropTypes.object.isRequired,
    isSelected: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(ProcessListItem);
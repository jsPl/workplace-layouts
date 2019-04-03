import React from 'react';
import PropTypes from 'prop-types';
import { List, Spin } from 'antd';
import { getSelectedProcessesId, isLoadingOperations } from '../../redux/process';
import { getOperationsByProcess, fetchOperations } from '../../redux/operation';
import { connect } from 'react-redux';

const ProcessListItem = ({ process, handleProcessClick, loading, selected, fetchedOperations }) => (
    <Spin spinning={loading}>
        <List.Item className={selected ? 'selected' : null}
            onClick={() => handleProcessClick(process.id, fetchedOperations)}>
            {process.title}
        </List.Item>
    </Spin>
);

const mapStateToProps = (state, props) => {
    const processId = props.process.id;
    return {
        loading: isLoadingOperations(state, processId),
        selected: getSelectedProcessesId(state).includes(processId),
        fetchedOperations: getOperationsByProcess(state, processId)
    }
};

const mapDispatchToProps = dispatch => ({
    handleProcessClick(processId, fetchedOperations) {
        dispatch(fetchOperations({ processId, fetchedOperations }));
    }
});

ProcessListItem.propTypes = {
    process: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProcessListItem);
import React from 'react';
import PropTypes from 'prop-types';
import { List, Spin } from 'antd';
import { getSelectedProcessesId, isLoadingOperations, selectProcess } from '../../redux/process';
import { selectWorkplace } from '../../redux/workplace';
import { fetchOperations } from '../../redux/operation';
import { connect } from 'react-redux';

const ProcessListItem = ({ process, handleProcessClick, loading, selected }) => (
    <Spin spinning={loading}>
        <List.Item className={selected ? 'selected' : null}
            onClick={() => handleProcessClick(process.id)}>
            {process.title}
        </List.Item>
    </Spin>
);

const mapStateToProps = (state, props) => {
    const processId = props.process.id;
    return {
        loading: isLoadingOperations(state, processId),
        selected: getSelectedProcessesId(state).includes(processId),
    }
};

const mapDispatchToProps = dispatch => ({
    handleProcessClick(processId) {
        const selectActions = (processId, operations) => [
            selectWorkplace({ ids: operations.map(o => o.default_workplace_id), activeTab: 'operations' }),
            selectProcess({ ids: [processId] })
        ];

        dispatch(fetchOperations({ processId, selectActions }));
    }
});

ProcessListItem.propTypes = {
    process: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProcessListItem);
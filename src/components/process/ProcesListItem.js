import React from 'react';
import PropTypes from 'prop-types';
import { List, Spin } from 'antd';
import { fetchOperations, selectProcess } from '../../actions';
import { isLoadingOperations, getSelectedProcessesId } from '../../selectors';
import { connect } from 'react-redux';

const ProcessListItem = ({ process, handleProcessClick, isLoading, isSelected }) => (
    <List.Item className={isSelected ? 'selected' : null} onClick={() => handleProcessClick(process.id)}>
        <Spin spinning={isLoading}>{process.title}</Spin>
    </List.Item>

);

const mapStateToProps = (state, props) => {
    //console.log(props)
    const processId = props.process.id;
    return {
        isLoading: isLoadingOperations(state),
        isSelected: getSelectedProcessesId(state).includes(processId)
    }
};

const mapDispatchToProps = dispatch => ({
    handleProcessClick(processId) {
        dispatch(fetchOperations(processId));
        dispatch(selectProcess([processId]));
    }
});

ProcessListItem.propTypes = {
    process: PropTypes.object.isRequired,
    isSelected: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(ProcessListItem);
import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { addWorkplace, removeWorkplace, fetchWorkplace } from '../../actions';

const WorkplaceControls = ({ workplaces, handleAddAll, handleRemoveAll, handleFetchWorkplace }) => {
    return (
        <Button.Group className='wpControls'>
            <Button onClick={() => handleAddAll([])}>add all</Button>
            <Button onClick={() => handleFetchWorkplace(1)}>fetch one</Button>
            <Button disabled={workplaces.length === 0} onClick={() => handleRemoveAll(workplaces)}>remove all</Button>
        </Button.Group>
    )
}

const mapStateToProps = state => ({
    workplaces: state.workplaces
})

const mapDispatchToProps = (dispatch) => ({
    handleAddAll(workplaces) {
        workplaces.forEach(workplace => dispatch(addWorkplace(workplace)));
    },
    handleRemoveAll(workplaces) {
        workplaces.forEach(workplace => dispatch(removeWorkplace(workplace.id)));
    },
    handleFetchWorkplace(id) {
        dispatch(fetchWorkplace(id));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkplaceControls);
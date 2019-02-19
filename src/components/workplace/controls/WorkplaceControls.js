import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { fetchWorkplaces, removeWorkplace, fetchWorkplace, patchWorkplace } from '../../../actions';
import InputFetchOne from './InputFetchOne';

const WorkplaceControls = ({ workplaces, selectedWorkplace, 
    handleFetchAll, handleRemoveAll, handleFetchOne, handlePatch }) => {
    return (
        <div className='wpControls'>
            <Button onClick={() => handleFetchAll()}>fetch all</Button>
            <InputFetchOne onClick={handleFetchOne} />
            <Button disabled={workplaces.length === 0} onClick={() => handleRemoveAll(workplaces)}>remove all</Button>
            <Button disabled={!selectedWorkplace} onClick={() => handlePatch(selectedWorkplace)}>patch</Button>
        </div>
    )
}

const mapStateToProps = state => ({
    workplaces: state.workplaces,
    selectedWorkplace: state.workplaces.find(o => o.id === state.appUi.selectedWorkplace)
})

const mapDispatchToProps = dispatch => ({
    handleFetchAll() {
        dispatch(fetchWorkplaces());
    },
    handleRemoveAll(workplaces) {
        workplaces.forEach(workplace => dispatch(removeWorkplace(workplace.id)));
    },
    handleFetchOne(id) {
        dispatch(fetchWorkplace(id));
    },
    handlePatch(workplace) {
        const { id, ...data } = workplace;
        dispatch(patchWorkplace(id, data));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkplaceControls);
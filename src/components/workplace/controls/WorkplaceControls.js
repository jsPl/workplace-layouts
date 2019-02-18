import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { fetchWorkplaces, removeWorkplace, fetchWorkplace } from '../../../actions';
import InputFetchOne from './InputFetchOne';

const WorkplaceControls = ({ workplaces, handleFetchAll, handleRemoveAll, handleFetchOne }) => {
    return (
        <div className='wpControls'>
            <Button onClick={() => handleFetchAll()}>fetch all</Button>
            <InputFetchOne onClick={handleFetchOne} />
            <Button disabled={workplaces.length === 0} onClick={() => handleRemoveAll(workplaces)}>remove all</Button>
        </div>
    )
}

const mapStateToProps = state => ({
    workplaces: state.workplaces
})

const mapDispatchToProps = (dispatch) => ({
    handleFetchAll() {
        dispatch(fetchWorkplaces());
    },
    handleRemoveAll(workplaces) {
        workplaces.forEach(workplace => dispatch(removeWorkplace(workplace.id)));
    },
    handleFetchOne(id) {
        dispatch(fetchWorkplace(id));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkplaceControls);
import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { sendHallWithWorkplaces } from '../../../actions';
import { isSaving, isLoadingWorkplaces } from '../../../selectors';
//import InputFetchOne from './InputFetchOne';

const WorkplaceControls = ({ isSaving, isLoading, handleSaveAll }) => {
    return (
        <div className='wpControls'>
            {/* <Button onClick={() => handleFetchAll()}>fetch all</Button> */}
            {/* <InputFetchOne onClick={handleFetchOne} /> */}
            {/* <Button disabled={workplaces.length === 0} onClick={() => handleRemoveAll(workplaces)}>remove all</Button> */}
            <Button loading={isSaving} disabled={isLoading} type='primary' onClick={handleSaveAll}>Save</Button>
        </div>
    )
}

const mapStateToProps = state => ({
    isSaving: isSaving(state),
    isLoading: isLoadingWorkplaces(state),
})

const mapDispatchToProps = dispatch => ({
    // handleRemoveAll(workplaces) {
    //     workplaces.forEach(workplace => dispatch(removeWorkplace(workplace.id)));
    // },
    handleSaveAll() {
        dispatch(sendHallWithWorkplaces());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkplaceControls);
import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { removeWorkplace, saveAllData } from '../../../actions';
import { isSaving } from '../../../selectors';
//import InputFetchOne from './InputFetchOne';

const WorkplaceControls = ({ isSaving, handleSaveAll }) => {
    return (
        <div className='wpControls'>
            {/* <Button onClick={() => handleFetchAll()}>fetch all</Button> */}
            {/* <InputFetchOne onClick={handleFetchOne} /> */}
            {/* <Button disabled={workplaces.length === 0} onClick={() => handleRemoveAll(workplaces)}>remove all</Button> */}
            <Button loading={isSaving} type='primary' onClick={handleSaveAll}>Save</Button>
        </div>
    )
}

const mapStateToProps = state => ({
    //workplaces: getWorkplaces(state),
    isSaving: isSaving(state)
})

const mapDispatchToProps = dispatch => ({
    // handleFetchAll() {
    //     dispatch(fetchWorkplaces());
    // },
    handleRemoveAll(workplaces) {
        workplaces.forEach(workplace => dispatch(removeWorkplace(workplace.id)));
    },
    handleSaveAll() {
        dispatch(saveAllData());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkplaceControls);
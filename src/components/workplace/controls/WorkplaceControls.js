import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { sendHallWithWorkplaces } from '../../../actions';
import { isSaving, isLoadingWorkplaces } from '../../../selectors';

const WorkplaceControls = ({ isSaving, isLoading, sendHallWithWorkplaces }) => {
    return (
        <div className='wpControls'>
            <Button loading={isSaving} disabled={isLoading} type='primary' onClick={sendHallWithWorkplaces}>Save</Button>
        </div>
    )
}

const mapStateToProps = state => ({
    isSaving: isSaving(state),
    isLoading: isLoadingWorkplaces(state),
})

const mapDispatchToProps = {
    sendHallWithWorkplaces
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkplaceControls);
import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { sendHallWithWorkplaces, isSaving, isLoadingWorkplaces } from '../../redux/workplace';
import { isIterationRunning as isCraftRunning } from '../../redux/craft';

const WorkplaceControls = ({ isSaving, disabled, sendHallWithWorkplaces }) => {
    return (
        <div className='wpControls'>
            <Button loading={isSaving} disabled={disabled} type='primary' onClick={sendHallWithWorkplaces}>Save</Button>
        </div>
    )
}

const mapStateToProps = state => ({
    isSaving: isSaving(state),
    disabled: isLoadingWorkplaces(state) || isCraftRunning(state),
})

const mapDispatchToProps = {
    sendHallWithWorkplaces
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkplaceControls);
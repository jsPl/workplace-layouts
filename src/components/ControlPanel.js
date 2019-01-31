import React from 'react';
import WorkplaceDetails from './WorkplaceDetails';
import WorkplaceList from './WorkplaceList';
import { connect } from 'react-redux';

let ControlPanel = ({ workplaces, selectedWorkplaceId }) => {

    return (
        <div className='controlPanel'>
            <WorkplaceList
                workplaces={workplaces}
                selectedWorkplaceId={selectedWorkplaceId}
            />
            {selectedWorkplaceId && <WorkplaceDetails />}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        workplaces: state.workplaces,
        selectedWorkplaceId: state.selectedWorkplace
    }
}

export default connect(mapStateToProps)(ControlPanel)
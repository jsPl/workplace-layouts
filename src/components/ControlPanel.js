import React from 'react';
import WorkplaceDetails from './WorkplaceDetails';
import WorkplaceList from './WorkplaceList';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

let ControlPanel = ({ workplaces, selectedWorkplace }) => {

    return (
        <div className='controlPanel'>
            <WorkplaceList
                workplaces={workplaces}
                selectedWorkplace={selectedWorkplace}
            />
            {selectedWorkplace && <WorkplaceDetails workplace={selectedWorkplace} />}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        workplaces: state.workplaces,
        selectedWorkplace: state.workplaces.find(o => o.id === state.selectedWorkplace)
    }
}

ControlPanel.propTypes = {
    workplaces: PropTypes.array.isRequired,
    selectedWorkplace: PropTypes.object
}

export default connect(mapStateToProps)(ControlPanel)
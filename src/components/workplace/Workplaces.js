import React from 'react';
import PropTypes from 'prop-types';
import WorkplaceControls from './controls/WorkplaceControls';
import WorkplaceList from './WorkplaceList';
import withListFiltering from '../panel/withListFiltering';

const Workplaces = props => (
    <>
        <WorkplaceListWithFiltering {...props} />
        <WorkplaceControls />
    </>
)

const WorkplaceListWithFiltering = withListFiltering(WorkplaceList)

Workplaces.propTypes = {
    selectedWorkplaces: PropTypes.array,
    isLoading: PropTypes.bool,
}

export default Workplaces;
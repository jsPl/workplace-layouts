import React from 'react';
import PropTypes from 'prop-types';
import WorkplaceControls from './WorkplaceControls';
import WorkplaceList from './WorkplaceList';
import FilteredList from '../panel/FilteredList';

const Workplaces = props => (
    <>
        <FilteredList isLoading={props.isLoading}>
            {filter => <WorkplaceList filter={filter} />}
        </FilteredList>
        <WorkplaceControls />
    </>
)

Workplaces.propTypes = {
    selectedWorkplaces: PropTypes.array,
    isLoading: PropTypes.bool,
}

export default Workplaces;
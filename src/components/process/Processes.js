import React from 'react';
import PropTypes from 'prop-types';
import ProcessList from './ProcessList';
import FilteredList from '../panel/FilteredList';

const Processes = props => (
    <FilteredList isLoading={props.isLoading}>
        {filter => <ProcessList filter={filter} />}
    </FilteredList>
)

Processes.propTypes = {
    isLoading: PropTypes.bool,
}

export default Processes;
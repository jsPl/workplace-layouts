import React from 'react';
import PropTypes from 'prop-types';
import ProcessList from './ProcessList';
import withListFiltering from '../panel/withListFiltering';

const Processes = props => (
    <FilteredProcessList {...props} />
)

const FilteredProcessList = withListFiltering(ProcessList)

Processes.propTypes = {
    isLoading: PropTypes.bool,
}

export default Processes;
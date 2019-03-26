import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
import WorkplaceDetails from './WorkplaceDetails';

const WorkplaceSelectedList = ({ selectedWorkplaces }) => {
    return (
        <List
            size='small' className='selectedList'
            dataSource={selectedWorkplaces}
            renderItem={wp => <WorkplaceDetails key={wp.id} workplace={wp} />}
        />
    )
}

WorkplaceSelectedList.propTypes = {
    selectedWorkplaces: PropTypes.array,
}

export default WorkplaceSelectedList;
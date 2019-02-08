import React from 'react';
import PropTypes from 'prop-types';
import { List, Empty } from 'antd';
import WorkplaceListItem from './WorkplaceListItem';
import WorkplaceControls from './WorkplaceControls';

export default function WorkplaceList({ workplaces, selectedWorkplace }) {
    return (
        <>
            <ListItems workplaces={workplaces} selectedWorkplace={selectedWorkplace} />
            <WorkplaceControls />
        </>
    )
}

const ListItems = ({ workplaces, selectedWorkplace }) => (
    workplaces.length === 0 ?
        <Empty />
        :
        <List size='small'>
            {workplaces.map(wp =>
                <WorkplaceListItem key={wp.id} workplace={wp} isSelected={selectedWorkplace === wp} />
            )}
        </List>
)

WorkplaceList.propTypes = {
    workplaces: PropTypes.array.isRequired,
    selectedWorkplace: PropTypes.object
}
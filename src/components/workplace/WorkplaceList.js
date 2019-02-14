import React from 'react';
import PropTypes from 'prop-types';
import { List, Empty, Spin } from 'antd';
import WorkplaceListItem from './WorkplaceListItem';
import WorkplaceControls from './WorkplaceControls';

export default function WorkplaceList({ workplaces, selectedWorkplace, isLoading }) {
    return (
        <>
            <Spin spinning={isLoading}>
                <ListItems workplaces={workplaces} selectedWorkplace={selectedWorkplace} />
            </Spin>
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
    selectedWorkplace: PropTypes.object,
    isLoadingWorkplaces: PropTypes.bool
}
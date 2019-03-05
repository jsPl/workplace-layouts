import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List, Empty, Spin } from 'antd';
import WorkplaceListItem from './WorkplaceListItem';
import WorkplaceControls from './controls/WorkplaceControls';

class WorkplaceList extends React.Component {
    render() {
        const { workplaces, selectedWorkplace, isLoading } = this.props;
        return (
            <>
                <Spin spinning={isLoading}>
                    <ListItems workplaces={workplaces} selectedWorkplace={selectedWorkplace} />
                </Spin>
                <WorkplaceControls />
            </>
        )
    }
}

const ListItems = ({ workplaces, selectedWorkplace }) => (
    workplaces.length === 0 ?
        <Empty />
        :
        <List size='small' className='wpList'>
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

export default connect()(WorkplaceList)
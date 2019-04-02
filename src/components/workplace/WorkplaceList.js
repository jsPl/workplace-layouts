import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, Empty } from 'antd';
import WorkplaceListItem from './WorkplaceListItem';
import { getWorkplacesByFilter, getSelectedWorkplaces } from '../../redux/workplace';

const WorkplaceList = ({ workplaces, selectedWorkplaces }) => {
    return (
        workplaces.length === 0 ?
            <Empty className='listEmpty' />
            :
            <List
                size='small' className='list'
                dataSource={workplaces}
                renderItem={wp => <WorkplaceListItem key={wp.id} workplace={wp} isSelected={selectedWorkplaces.includes(wp)} />}
            />
    )
}

const mapStateToProps = (state, props) => ({
    workplaces: getWorkplacesByFilter(state, props),
    selectedWorkplaces: getSelectedWorkplaces(state)
})

WorkplaceList.propTypes = {
    workplaces: PropTypes.array.isRequired,
    selectedWorkplaces: PropTypes.array,
}

export default connect(mapStateToProps)(WorkplaceList)
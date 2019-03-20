import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, Empty } from 'antd';
import WorkplaceListItem from './WorkplaceListItem';
import { getWorkplacesByFilter } from '../../selectors';

const WorkplaceList = ({ workplaces, selectedWorkplaces }) => {
    return (
        workplaces.length === 0 ?
            <Empty className='workplaceListEmpty' />
            :
            <List
                size='small' className='wpList'
                dataSource={workplaces}
                renderItem={wp => <WorkplaceListItem key={wp.id} workplace={wp} isSelected={selectedWorkplaces.includes(wp)} />}
            />
    )
}

const mapStateToProps = (state, props) => ({
    workplaces: getWorkplacesByFilter(state, props)
})

WorkplaceList.propTypes = {
    workplaces: PropTypes.array.isRequired,
    selectedWorkplaces: PropTypes.array,
}

export default connect(mapStateToProps)(WorkplaceList)
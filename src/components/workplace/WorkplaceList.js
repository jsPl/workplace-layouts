import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'antd';
import WorkplaceListItem from './WorkplaceListItem';
import { EmptyList } from '../panel/ControlPanel';
import { getWorkplacesByFilter, getSelectedWorkplaces } from '../../redux/workplace';

const WorkplaceList = ({ workplaces, selectedWorkplaces }) => {
    return (
        workplaces.length === 0 ?
            <EmptyList />
            :
            <List
                size='small' className='list'
                dataSource={workplaces}
                itemLayout='vertical'
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
    filter: PropTypes.string,
}

export default connect(mapStateToProps)(WorkplaceList)
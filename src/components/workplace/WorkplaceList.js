import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, Empty } from 'antd';
import WorkplaceListItem from './WorkplaceListItem';
import { getWorkplacesByFilter } from '../../selectors';

const WorkplaceList = ({ workplaces, selectedWorkplace }) => {
    return (
        workplaces.length === 0 ?
            <Empty className='workplaceListEmpty' />
            :
            <List size='small' className='wpList'>
                {workplaces.map(wp =>
                    <WorkplaceListItem key={wp.id} workplace={wp} isSelected={selectedWorkplace === wp} />
                )}
            </List>
    )
}

const mapStateToProps = (state, props) => ({
    workplaces: getWorkplacesByFilter(state, props)
})

WorkplaceList.propTypes = {
    workplaces: PropTypes.array.isRequired,
    selectedWorkplace: PropTypes.object,
}

export default connect(mapStateToProps)(WorkplaceList)
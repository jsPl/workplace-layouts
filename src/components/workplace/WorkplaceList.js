import React from 'react';
import PropTypes from 'prop-types';
import { List, Empty, Tag } from 'antd';
import { selectWorkplace } from '../../actions';
import { connect } from 'react-redux'

export default function WorkplaceList({ workplaces, selectedWorkplace }) {
    const listItems = workplaces.length === 0 ?
        <Empty />
        :
        <List size='small'>
            {workplaces.map(wp =>
                <WorkplaceListItem key={wp.id} workplace={wp} isSelected={selectedWorkplace === wp} />
            )}
        </List>

    return (
        <>
            {listItems}
        </>
    )
}

let WorkplaceListItem = ({ workplace, isSelected, handleWorkplaceListClick }) => {

    return (
        <List.Item className={isSelected ? 'selected' : null} onClick={() => handleWorkplaceListClick(workplace.id)}>
            <Tag color={workplace.color} className='colorBox' />
            {workplace.title}
        </List.Item>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        handleWorkplaceListClick: id => {
            dispatch(selectWorkplace(id))
        }
    }
}

WorkplaceListItem = connect(null, mapDispatchToProps)(WorkplaceListItem);

WorkplaceList.propTypes = {
    workplaces: PropTypes.array.isRequired,
    selectedWorkplace: PropTypes.object
}

WorkplaceListItem.propTypes = {
    workplace: PropTypes.object.isRequired,
    isSelected: PropTypes.bool
}
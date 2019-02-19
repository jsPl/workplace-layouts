import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
import { selectWorkplace } from '../../actions';
import { connect } from 'react-redux';

const WorkplaceListItem = ({ workplace, isSelected, handleWorkplaceListClick }) => (
    <List.Item className={isSelected ? 'selected' : null} onClick={() => handleWorkplaceListClick(workplace.id)}>
        {/* <Tag color={workplace.color} className='colorBox' /> */}
        {workplace.title}
    </List.Item>
);

const mapDispatchToProps = dispatch => ({
    handleWorkplaceListClick(id) {
        dispatch(selectWorkplace(id));
    }
});

WorkplaceListItem.propTypes = {
    workplace: PropTypes.object.isRequired,
    isSelected: PropTypes.bool
};

export default connect(null, mapDispatchToProps)(WorkplaceListItem);

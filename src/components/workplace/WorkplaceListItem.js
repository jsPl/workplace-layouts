import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
import { selectWorkplace } from '../../redux/workplace';
import { selectProcess } from '../../redux/process';
import { connect } from 'react-redux';

const WorkplaceListItem = ({ workplace, isSelected, handleWorkplaceClick }) => (
    <List.Item className={isSelected ? 'selected' : null} onClick={() => handleWorkplaceClick(workplace.id)}
        data-id={workplace.id}>
        {/* <Tag color={workplace.color} className='colorBox' /> */}
        {workplace.title}
    </List.Item>
);

const mapDispatchToProps = dispatch => ({
    handleWorkplaceClick(id) {
        dispatch(selectWorkplace({ ids: [id], activeTab: 'workplaces' }));
        dispatch(selectProcess({ ids: [] }))
    }
});

WorkplaceListItem.propTypes = {
    workplace: PropTypes.object.isRequired,
    isSelected: PropTypes.bool
};

export default connect(null, mapDispatchToProps)(WorkplaceListItem);

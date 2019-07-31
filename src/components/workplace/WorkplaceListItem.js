import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
import { selectWorkplace } from '../../redux/workplace';
import { unselectAllProcesses } from '../../redux/process';
import { connect, batch } from 'react-redux';
import WorkplaceApiConnector from './WorkplaceApiConnector';

const WorkplaceListItem = ({ workplace, isSelected, handleWorkplaceClick }) => {
    const extra = workplace.api &&
        <span className='apiConnector'>
            <WorkplaceApiConnector workplace={workplace} />
        </span>

    return (
        <List.Item className={isSelected ? 'selected' : null} onClick={() => handleWorkplaceClick(workplace.id)}
            data-id={workplace.id} extra={extra}>
            {workplace.title}
        </List.Item>
    )
}

const mapDispatchToProps = dispatch => ({
    handleWorkplaceClick(id) {
        batch(() => {
            dispatch(selectWorkplace({ ids: [id], activeTab: 'workplaces' }));
            dispatch(unselectAllProcesses())
        })
    }
});

WorkplaceListItem.propTypes = {
    workplace: PropTypes.object.isRequired,
    isSelected: PropTypes.bool
};

export default connect(null, mapDispatchToProps)(WorkplaceListItem);

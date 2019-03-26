import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
//import { selectWorkplace } from '../../actions';
//import { connect } from 'react-redux';

const ProcessListItem = ({ process }) => (
    <List.Item>
        {process.title}
    </List.Item>
);

// const mapDispatchToProps = dispatch => ({
//     handleWorkplaceListClick(id) {
//         dispatch(selectWorkplace([id]));
//     }
// });

ProcessListItem.propTypes = {
    process: PropTypes.object.isRequired,
    isSelected: PropTypes.bool
};

//export default connect(null, mapDispatchToProps)(WorkplaceListItem);
export default ProcessListItem;

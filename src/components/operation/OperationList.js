import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
import OperationDetails from './OperationDetails';

const OperationList = ({ operations }) => {
    return (
        <List
            size='small' className='selectedList'
            dataSource={operations}
            renderItem={o => <OperationDetails key={o.id} operation={o} />}
        />
    )
}

OperationList.propTypes = {
    operations: PropTypes.array,
}

export default OperationList;
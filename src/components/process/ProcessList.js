import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, Empty } from 'antd';
import ProcessListItem from './ProcesListItem';
import { getProcessesByFilter } from '../../selectors';

const ProcessList = ({ processes }) => {
    return (
        processes.length === 0 ?
            <Empty className='listEmpty' />
            :
            <List
                size='small' className='list'
                dataSource={processes}
                renderItem={o => <ProcessListItem key={o.id} process={o} />}
            />
    )
}

const mapStateToProps = (state, props) => ({
    processes: getProcessesByFilter(state, props),
})

ProcessList.propTypes = {
    processes: PropTypes.array.isRequired,
}

export default connect(mapStateToProps)(ProcessList)
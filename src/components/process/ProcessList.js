import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'antd';
import ProcessListItem from './ProcesListItem';
import { EmptyList } from '../panel/ControlPanel';
import { getProcessesByFilter } from '../../redux/process';

const ProcessList = ({ processes }) => {
    return (
        processes.length === 0 ?
            <EmptyList />
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
    filter: PropTypes.string,
}

export default connect(mapStateToProps)(ProcessList)
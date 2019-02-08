import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { addWorkplace, removeWorkplace } from '../../actions';

const randomWorkplaces = [
    { id: 1, title: 'wp1', color: '#e5c8e7', width: 200, height: 100, y: 200 },
    { id: 2, title: 'wp2', color: '#309EFF' },
    { id: 3, title: 'wp3', color: '#FFCF60', x: 300, width: 40, height: 40 },
    { id: 4, title: 'wp4', color: '#46ccac', x: 500 }
]

const WorkplaceControls = ({ workplaces, handleAdd, handleRemove }) => {
    return (
        <Button.Group>
            <Button onClick={() => handleAdd(randomWorkplaces)}>add all</Button>
            <Button disabled={workplaces.length === 0} onClick={() => handleRemove(workplaces)}>remove all</Button>
        </Button.Group>
    )
}

const mapStateToProps = state => ({
    workplaces: state.workplaces
})

const mapDispatchToProps = (dispatch) => ({
    handleAdd(workplaces) {
        workplaces.forEach(workplace => dispatch(addWorkplace(workplace)));
    },
    handleRemove(workplaces) {
        workplaces.forEach(workplace => dispatch(removeWorkplace(workplace.id)));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkplaceControls);
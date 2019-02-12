import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { addWorkplace, removeWorkplace } from '../../actions';

const randomWorkplaces = [
    { id: 1, title: 'Frezarka Mytrunnion 7G', color: '#e5c8e7', width: 200, height: 100, y: 200, imgPath: '/img/frezarka-mytrunnion-7g.png' },
    { id: 2, title: 'Frezarka CNC Cormak-Mill 300-ecoline', color: '#309EFF', imgPath: '/img/frezarka-cnc-cormak-mill-300-ecoline.png' },
    { id: 3, title: 'Tokarka Nakamura-Tome WT-100', color: '#FFCF60', x: 300, width: 80, height: 80, imgPath: '/img/tokarka-nakamura-tome-wt-100.png' },
    { id: 4, title: 'Tokarka Nomura NN-16SB7', color: '#46ccac', x: 200, imgPath: '/img/tokarka-nomura-NN-16SB7.png' }
]

const WorkplaceControls = ({ workplaces, handleAddAll, handleRemoveAll }) => {
    return (
        <Button.Group>
            <Button onClick={() => handleAddAll(randomWorkplaces)}>add all</Button>
            <Button disabled={workplaces.length === 0} onClick={() => handleRemoveAll(workplaces)}>remove all</Button>
        </Button.Group>
    )
}

const mapStateToProps = state => ({
    workplaces: state.workplaces
})

const mapDispatchToProps = (dispatch) => ({
    handleAddAll(workplaces) {
        workplaces.forEach(workplace => dispatch(addWorkplace(workplace)));
    },
    handleRemoveAll(workplaces) {
        workplaces.forEach(workplace => dispatch(removeWorkplace(workplace.id)));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkplaceControls);
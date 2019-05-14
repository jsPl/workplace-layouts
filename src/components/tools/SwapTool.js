import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { isLoadingWorkplaces, getSelectedWorkplaces } from '../../redux/workplace';
import { workplaceRepository } from '../../modules/workplace/workplaceRepository';
import { getPanZoomSvgEl } from '../../modules/utils/panZoom';

const SwapTool = ({ disabled, swapWorkplaces, selectedWorkplaces }) => {
    return (
        <Button onClick={() => swapWorkplaces(selectedWorkplaces)} icon='swap' disabled={disabled}
            title='Swap position of two selected workplaces'>
            Swap
        </Button>
    )
}

const mapStateToProps = state => {
    const selectedWorkplaces = getSelectedWorkplaces(state).filter(o => !o.fixedPosition);
    return {
        disabled: isLoadingWorkplaces(state) || selectedWorkplaces.length !== 2,
        selectedWorkplaces
    }
}

const mapDispatchToProps = dispatch => ({
    swapWorkplaces(selectedWorkplaces) {
        swapWorkplacesPosition(...workplaceRepository.findByIds(selectedWorkplaces.map(o => o.id)))
    }
})

const swapWorkplacesPosition = (wp1, wp2) => {
    //console.log('swap', wp1, wp2)
    const c1 = wp1.getCenter(), c2 = wp2.getCenter();

    const relativeTo = getPanZoomSvgEl();
    const box1 = wp1.rectBbox.rbox(relativeTo),
        box2 = wp2.rectBbox.rbox(relativeTo);

    const sbox1 = wp1.svg.rbox(relativeTo),
        sbox2 = wp2.svg.rbox(relativeTo);

    const delta1 = { x: box1.cx - sbox1.cx, y: box1.cy - sbox1.cy },
        delta2 = { x: box2.cx - sbox2.cx, y: box2.cy - sbox2.cy };

    // console.log(c1, c2)
    // console.log(box1, sbox1, delta1)
    // console.log(box2, sbox2, delta2)

    wp2.svg.center(c1.x - delta2.x, c1.y - delta2.y)
    wp1.svg.center(c2.x - delta1.x, c2.y - delta1.y)
}

export default connect(mapStateToProps, mapDispatchToProps)(SwapTool)
import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { isLoadingWorkplaces, getSelectedWorkplaces } from '../../redux/workplace';
import { workplaceRepository } from '../../modules/workplace/workplaceRepository';
import { getPanZoomSvgEl } from '../../modules/utils/panZoom';
import { Observable } from 'rxjs';
import { toFixed } from '../../modules/utils/conversion';

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

export const swapWorkplacesPosition = (wp1, wp2) => {
    //console.log('swapWorkplacesPosition', wp1.title, wp2.title)
    const c1 = wp1.getCenter(), c2 = wp2.getCenter();

    const relativeTo = getPanZoomSvgEl();

    const sbox1 = wp1.svg.rbox(relativeTo),
        sbox2 = wp2.svg.rbox(relativeTo);

    const delta1 = { x: toFixed(c1.x - sbox1.cx), y: toFixed(c1.y - sbox1.cy) },
        delta2 = { x: toFixed(c2.x - sbox2.cx), y: toFixed(c2.y - sbox2.cy) };

    // console.log(c1, c2)
    // console.log(box1, sbox1, delta1)
    // console.log(box2, sbox2, delta2)

    const wp1x = toFixed(c2.x - delta1.x), wp1y = toFixed(c2.y - delta1.y);
    const wp2x = toFixed(c1.x - delta2.x), wp2y = toFixed(c1.y - delta2.y);

    wp1.svg.center(wp1x, wp1y);
    wp2.svg.center(wp2x, wp2y);

    // console.log('swap position', wp1.title, `(${wp1x},${wp1y})`, wp2.title, `(${wp2x},${wp2y})`)
    // console.log('swap position c', wp1.title, c1, wp2.title, c2)
    // console.log('swap position delta', wp1.title, delta1, wp2.title, delta2)

    wp1.dispatchPositionUpdate();
    wp2.dispatchPositionUpdate();
}

export const swapWorkplacesPositionObservable = workplaces => new Observable(subscriber => {
    if (workplaces && workplaces.length > 0) {
        //console.log('swap workplaces', workplaces.map(o => o.title).join(' <-> '))
        swapWorkplacesPosition(...workplaces)
    }
    subscriber.complete();
})

export default connect(mapStateToProps, mapDispatchToProps)(SwapTool)
import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { updateWorkplace } from '../../../redux/workplace';
import { workplaceRepository } from '../../../modules/workplace/workplaceRepository';

const ApplyLayout = ({ layout, applyLayout }) => {
    return (
        <Button icon='layout' title='Apply layout at this Craft iteration' onClick={() => applyLayout(layout)} />
    )
}

const mapDispatchToProps = dispatch => {
    return {
        applyLayout: layout => {
            layout.forEach(o => {
                const { id, x, y } = o;
                const workplace = workplaceRepository.findById(id);
                if (workplace) {
                    const { x: oldX, y: oldY } = workplace.getUpperLeftPosition();
                    if (oldX !== x || oldY !== y) {
                        workplace.svg.animate(200, '>', 0).move(x, y).afterAll(() => dispatch(updateWorkplace(o)))
                    }
                }
            })
        }
    }
}

export default connect(null, mapDispatchToProps)(ApplyLayout)
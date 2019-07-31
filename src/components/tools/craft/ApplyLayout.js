import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { applyCraftLayout } from '../../../redux/craft';
import { workplaceRepository } from '../../../modules/workplace/workplaceRepository';

const ApplyLayout = ({ layout, applyLayout }) => {
    return (
        <Button icon='layout' title='Apply layout at this Craft iteration' onClick={() => applyLayout(layout)} />
    )
}

const mapDispatchToProps = dispatch => ({
    applyLayout: layout => {
        dispatch(applyCraftLayout({ layout: layout.map(o => ({ ...o, workplace: workplaceRepository.findById(o.id) })) }));
    }
})

export default connect(null, mapDispatchToProps)(ApplyLayout)
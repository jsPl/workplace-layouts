import React from 'react';
import { Drawer } from 'antd';
import { connect } from 'react-redux';
import { isSummaryVisible, changeCraftSummaryVisibility } from '../../../redux/craft';

const CraftSummaryDrawer = ({ visible, changeCraftSummaryVisibility, children }) => {
    return (
        <Drawer
            className='craftSummaryDrawer'
            title='Craft summary'
            placement='bottom'
            mask={false}
            maskClosable={false}
            height={300}
            visible={visible}
            onClose={() => changeCraftSummaryVisibility({ visible: false })}
        >
            {children}
        </Drawer>
    )
}

const mapStateToProps = state => {
    return {
        visible: isSummaryVisible(state)
    }
}

const mapDispatchToProps = {
    changeCraftSummaryVisibility,
}

export default connect(mapStateToProps, mapDispatchToProps)(CraftSummaryDrawer)
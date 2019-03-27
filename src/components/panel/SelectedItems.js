import React from 'react';
import Draggable from 'react-draggable';
import { Card } from 'antd';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const SelectedItems = ({ position, visible, handleDragStop, tabList, activeTab, 
    activeTabContent, handleTabChange }) => {

    const panelClass = classNames({
        collapseSelected: true,
        hidden: !visible
    });

    return (
        <Draggable
            onStop={handleDragStop}
            handle='.ant-card-head'
            bounds='body'
            defaultPosition={position}
        >
            <div className={panelClass}>
                <Card
                    type='inner'
                    size='small'
                    className='panelDetails'
                    tabList={tabList}
                    activeTabKey={activeTab}
                    onTabChange={handleTabChange}
                >
                    {activeTabContent}
                </Card>
            </div>
        </Draggable>
    )
}

SelectedItems.propTypes = {
    visible: PropTypes.bool.isRequired,
    tabList: PropTypes.array.isRequired,
}
import React from 'react';
import PropTypes from 'prop-types';
import { Drawer, Button, Switch } from 'antd';

const AppSettings = ({ isDrawerVisible, onDrawerClose, onDrawerShow,
    isWorkplacePictureVisible, onWorkplacePictureVisibilityToggle }) => {

    return (
        <>
            <Drawer
                title='Settings'
                placement='right'
                visible={isDrawerVisible}
                onClose={onDrawerClose}
            >
                <div>
                    <label className='workplaceImagesToggle' title='Show pictures of workplaces on layout'>
                        <Switch
                            defaultChecked={isWorkplacePictureVisible}
                            onChange={onWorkplacePictureVisibilityToggle}
                        />
                        <span>workplace pictures</span>
                    </label>
                </div>
            </Drawer>
            <Button
                title='Settings'
                shape='circle'
                icon='setting'
                className='appSettings'
                onClick={onDrawerShow}
            />
        </>
    )
}

AppSettings.propTypes = {
    isDrawerVisible: PropTypes.bool.isRequired,
    onDrawerClose: PropTypes.func.isRequired,
    onDrawerShow: PropTypes.func.isRequired,
    isWorkplacePictureVisible: PropTypes.bool.isRequired,
    onWorkplacePictureVisibilityToggle: PropTypes.func.isRequired,
}

export default AppSettings;
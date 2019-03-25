import React from 'react';
import PropTypes from 'prop-types';
import { Drawer, Button, List } from 'antd';
import ToggleWorkplaceImageVisibility from './ToggleWorkplaceImageVisibility';
import RestoreDefaults from './RestoreDefaults';

class AppSettings extends React.Component {
    constructor(props) {
        super(props);
        this.restoreDefaultsBtnRef = React.createRef();
    }

    render() {
        const { isDrawerVisible, onDrawerClose, onDrawerShow } = this.props
        return (
            <>
                <Drawer
                    title='Settings'
                    placement='right'
                    visible={isDrawerVisible}
                    onClose={onDrawerClose}
                >
                    <List
                        split={false}
                        dataSource={[
                            <ToggleWorkplaceImageVisibility restoreDefaultsBtnRef={this.restoreDefaultsBtnRef} />,
                            <RestoreDefaults ref={this.restoreDefaultsBtnRef} />
                        ]}
                        renderItem={o => <List.Item>{o}</List.Item>}
                    />
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
}

AppSettings.propTypes = {
    isDrawerVisible: PropTypes.bool.isRequired,
    onDrawerClose: PropTypes.func.isRequired,
    onDrawerShow: PropTypes.func.isRequired,
}

export default AppSettings;
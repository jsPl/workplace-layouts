import React from 'react';
import { connect } from 'react-redux';
import { isSvgWorkplacePictureVisible } from '../selectors';
import { changeSvgWorkplacePictureVisibility } from '../actions';
import AppSettings from './AppSettings';

class AppSettingsContainer extends React.Component {
    state = { visible: false };

    showDrawer = () => this.setState({ visible: true })
    closeDrawer = () => this.setState({ visible: false })

    render() {
        const { isSvgWorkplacePictureVisible, handleWorkplacePictureVisibilityToggle } = this.props;
        return (
            <AppSettings
                isDrawerVisible={this.state.visible}
                onDrawerClose={this.closeDrawer}
                onDrawerShow={this.showDrawer}
                isWorkplacePictureVisible={isSvgWorkplacePictureVisible}
                onWorkplacePictureVisibilityToggle={handleWorkplacePictureVisibilityToggle}
            />
        )
    }
}

const mapStateToProps = state => ({
    isSvgWorkplacePictureVisible: isSvgWorkplacePictureVisible(state)
});


const mapDispatchToProps = dispatch => ({
    handleWorkplacePictureVisibilityToggle(visible) {
        dispatch(changeSvgWorkplacePictureVisibility(visible));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AppSettingsContainer)
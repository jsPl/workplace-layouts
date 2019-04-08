import React from 'react';
import { Switch } from 'antd';
import { connect } from 'react-redux';
import { isSvgWorkplacePictureVisible, changeSvgWorkplacePictureVisibility } from '../../redux/ui';

const ToggleWorkplaceImageVisibility = ({ isWorkplacePictureVisible, handleWorkplacePictureVisibilityToggle,
    restoreDefaultsBtnRef }) => (
    <label className='workplaceSettingToggle' title='Show pictures of workplaces on layout'>
        <Switch
            checked={isWorkplacePictureVisible}
            onChange={visible => handleWorkplacePictureVisibilityToggle(visible, restoreDefaultsBtnRef)}
        />
        <span>workplace pictures</span>
    </label>
)

const mapStateToProps = state => ({
    isWorkplacePictureVisible: isSvgWorkplacePictureVisible(state)
});

const mapDispatchToProps = dispatch => ({
    handleWorkplacePictureVisibilityToggle(visible, restoreDefaultsBtnRef) {
        dispatch(changeSvgWorkplacePictureVisibility(visible));
        restoreDefaultsBtnRef.current.forceUpdate();
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ToggleWorkplaceImageVisibility)
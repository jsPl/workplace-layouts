import React from 'react';
import { Switch } from 'antd';
import { connect } from 'react-redux';
import { isSvgWorkplacePictureVisible, changeSvgWorkplacePictureVisibility } from '../../redux/ui';

const ToggleWorkplaceImageVisibility = ({ isWorkplacePictureVisible, handleWorkplacePictureVisibilityToggle,
    restoreDefaultsBtnRef }) => (
    <label className='settingItem' title='Show pictures of workplaces on layout'>
        <span>Workplace pictures</span>
        <Switch
            checked={isWorkplacePictureVisible}
            onChange={visible => handleWorkplacePictureVisibilityToggle(visible, restoreDefaultsBtnRef)}
        />        
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
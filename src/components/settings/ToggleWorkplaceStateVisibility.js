import React from 'react';
import { Switch } from 'antd';
import { connect } from 'react-redux';
import { isSvgWorkplaceStateVisible, changeSvgWorkplaceStateVisibility } from '../../redux/ui';

const ToggleWorkplaceStateVisibility = ({ isWorkplaceStateVisible, handleWorkplaceStateVisibilityToggle,
    restoreDefaultsBtnRef }) => (
    <label className='settingItem' title='Show state icons of workplaces on layout'>
        <span>Workplace state icons</span>
        <Switch
            checked={isWorkplaceStateVisible}
            onChange={visible => handleWorkplaceStateVisibilityToggle(visible, restoreDefaultsBtnRef)}
        />        
    </label>
)

const mapStateToProps = state => ({
    isWorkplaceStateVisible: isSvgWorkplaceStateVisible(state)
});

const mapDispatchToProps = dispatch => ({
    handleWorkplaceStateVisibilityToggle(visible, restoreDefaultsBtnRef) {
        dispatch(changeSvgWorkplaceStateVisibility(visible));
        restoreDefaultsBtnRef.current.forceUpdate();
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ToggleWorkplaceStateVisibility)
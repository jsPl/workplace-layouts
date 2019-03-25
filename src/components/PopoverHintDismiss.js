import React from 'react';
import PropTypes from 'prop-types';

const PopoverHintDismiss = ({ handleDismiss }) => (
    <div className='hintDismiss'>
        <span title="Don't show again" onClick={handleDismiss}>
            Got it!
        </span>
    </div>
);

PopoverHintDismiss.propTypes = {
    handleDismiss: PropTypes.func.isRequired,
}

export default PopoverHintDismiss

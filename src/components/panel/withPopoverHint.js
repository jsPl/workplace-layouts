import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from 'antd';

/**
 * 
 * @param {*} Component 
 * @param {function():Object} config
 */
export default function withPopoverHint(Component, config) {
    return class extends React.Component {
        render() {
            const { content, visible, handleDismiss, ...restProps } = config(this.props);

            const infoContent =
                <div className='infoContent'>
                    {content}
                    {handleDismiss &&
                        <PopoverHintDismiss
                            handleDismiss={() => { handleDismiss(this); this.forceUpdate(); }}
                        />
                    }
                </div>;

            return (
                <Popover content={infoContent} visible={visible} {...restProps}>
                    <Component {...this.props} />
                </Popover>
            )
        }
    }
}

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
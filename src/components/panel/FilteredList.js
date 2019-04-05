import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Input } from 'antd';

export default class FilteredList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { filterText: '' };
    }

    handleFilter = evt => {
        const filterText = evt.target.value;
        this.setState({ filterText })
    }

    render() {
        const { isLoading, filterPlaceholderText } = this.props;
        return (
            <>
                <Input className='filter' placeholder={filterPlaceholderText || 'Type name...'} allowClear
                    onChange={this.handleFilter} value={this.state.filterText}
                />
                <Spin spinning={isLoading}>
                    {this.props.children(this.state.filterText)}
                </Spin>
            </>
        )
    }
}

FilteredList.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    filterPlaceholderText: PropTypes.string,
}
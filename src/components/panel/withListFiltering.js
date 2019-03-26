import React from 'react';
import { Spin, Input } from 'antd';

export default function withListFiltering(ListComponent) {
    return class extends React.Component {
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
                        <ListComponent filter={this.state.filterText} {...this.props} />
                    </Spin>
                </>
            )
        }
    }
}
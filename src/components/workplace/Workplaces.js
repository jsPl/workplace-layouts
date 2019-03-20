import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Input } from 'antd';
import WorkplaceControls from './controls/WorkplaceControls';
import WorkplaceList from './WorkplaceList';

class Workplaces extends React.Component {
    constructor(props) {
        super(props);
        this.state = { filterText: '' };
    }

    handleFilter = evt => {
        const filterText = evt.target.value;
        this.setState({ filterText })
    }

    render() {
        const { selectedWorkplaces, isLoading } = this.props;
        return (
            <>
                <Input className='workplaceFilter'
                    placeholder='Type name...' allowClear onChange={this.handleFilter} value={this.state.filterText}
                />
                <Spin spinning={isLoading}>
                    <WorkplaceList selectedWorkplaces={selectedWorkplaces} filter={this.state.filterText} />
                </Spin>
                <WorkplaceControls />
            </>
        )
    }
}

Workplaces.propTypes = {
    selectedWorkplaces: PropTypes.array,
    isLoading: PropTypes.bool,
}

export default Workplaces
import React from 'react';
import { connect } from 'react-redux';
import { SelectedItems } from './SelectedItems';
import { getSelectedWorkplaces } from '../../redux/workplace';
import { getOperationsOfSelectedProcesses } from '../../redux/operation';
import { getSelectedItemsActiveTab, setSelectedItemsActiveTab, boundClearCurrentSelection } from '../../redux/ui';
import PropTypes from 'prop-types';
import { Badge } from 'antd';
import WorkplaceSelectedPanel from '../workplace/selected/WorkplaceSelectedPanel';
import OperationList from '../operation/OperationList';

class SelectedItemsContainer extends React.Component {
    state = { x: 0, y: 0 };

    handleDragStop = (evt, data) => {
        const { x, y } = data;
        this.setState({ x, y })
    }

    isVisible = () => {
        const { selectedWorkplaces, operations } = this.props;
        return selectedWorkplaces.length > 0 || operations.length > 0;
    }

    render() {
        const { selectedWorkplaces, operations, activeTab, handleTabChange, handleClose } = this.props;
        const { x, y } = this.state;

        const tabListContent = getTabListContent(selectedWorkplaces, operations);
        const tabList = getTabList(selectedWorkplaces, operations);

        const tabs = tabList.filter(o => tabListContent[o.key] !== null);
        const activeTabContent = tabListContent[activeTab];

        return (
            <SelectedItems
                selectedWorkplaces={selectedWorkplaces}
                handleDragStop={this.handleDragStop}
                position={{ x, y }}
                visible={this.isVisible()}
                tabList={tabs}
                activeTab={activeTab}
                activeTabContent={activeTabContent}
                handleTabChange={handleTabChange}
                handleClose={handleClose}
            />
        )
    }
}

const getTabList = (workplaces, operations) => [{
    key: 'workplaces',
    tab: <SelectedItemHeader size='small' count={workplaces.length} label={workplaces.length === 1 ? 'Workplace' : 'Workplaces'} />,
}, {
    key: 'operations',
    tab: <SelectedItemHeader size='small' count={operations.length} label='Operations' />,
}];

const getTabListContent = (workplaces, operations) => ({
    workplaces: workplaces.length > 0 ? <WorkplaceSelectedPanel selectedWorkplaces={workplaces} /> : null,
    operations: operations.length > 0 ? <OperationList operations={operations} /> : null,
});

const SelectedItemHeader = ({ count, label }) => {
    const selectedCount = count > 1 ? count : null;
    return (
        <Badge count={selectedCount} offset={[15, 8]} className='countBadge'>
            {label}
        </Badge>
    )
}

SelectedItemHeader.propTypes = {
    count: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
}

const mapStateToProps = state => {
    return {
        selectedWorkplaces: getSelectedWorkplaces(state),
        operations: getOperationsOfSelectedProcesses(state),
        activeTab: getSelectedItemsActiveTab(state),
    }
};

const mapDispatchToProps = dispatch => ({
    handleTabChange(activeTab) {
        dispatch(setSelectedItemsActiveTab(activeTab));
    },
    handleClose() {
        boundClearCurrentSelection(dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectedItemsContainer)
import React from 'react';
import WorkplaceDetails from './WorkplaceDetails';
import WorkplaceList from './WorkplaceList';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Collapse } from 'antd';

const Panel = Collapse.Panel;

let ControlPanel = ({ workplaces, selectedWorkplace }) => {

    return (
        <Collapse defaultActiveKey={['1', '2']}>
            <Panel header='Workplaces' key='1'>
                <WorkplaceList
                    workplaces={workplaces}
                    selectedWorkplace={selectedWorkplace}
                />
            </Panel>
            {selectedWorkplace && 
                <Panel header='Selected' key='2'>
                    <WorkplaceDetails workplace={selectedWorkplace} />
                </Panel>
            }
            {/* <Button>Default</Button> */}
        </Collapse>
    )
}

const mapStateToProps = state => {
    return {
        workplaces: state.workplaces,
        selectedWorkplace: state.workplaces.find(o => o.id === state.selectedWorkplace)
    }
}

ControlPanel.propTypes = {
    workplaces: PropTypes.array.isRequired,
    selectedWorkplace: PropTypes.object
}

export default connect(mapStateToProps)(ControlPanel)
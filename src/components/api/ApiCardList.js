import React from 'react';
import ApiCard from './ApiCard';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { EmptyList } from '../panel/ControlPanel';
import { getWorkplacesByIds } from '../../redux/workplace';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const ApiCardList = ({ connectedApis, workplaces }) => {
    const connectedApisCount = Object.keys(connectedApis).length;

    return (
        connectedApisCount === 0 ?
            <EmptyList />
            :
            <Tabs size='small' animated={false}>
                {
                    workplaces.map(workplace =>
                        <TabPane key={workplace.id} tab={workplace.title} >
                            <ApiCard key={workplace.id} workplace={workplace} />
                        </TabPane>
                    )
                }
            </Tabs>
    )
}

const mapStateToProps = (state, props) => {
    const workplacesIds = Object.keys(props.connectedApis).map(o => parseInt(o, 10));
    return {
        workplaces: getWorkplacesByIds(state, { workplacesIds })
    }
}

ApiCardList.propTypes = {
    connectedApis: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, null)(ApiCardList);
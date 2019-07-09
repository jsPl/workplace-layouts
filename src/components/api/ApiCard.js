import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card } from 'antd';
import { getRtdeDataByWorkplace } from '../../redux/api';
import WorkplaceApiConnector from '../workplace/WorkplaceApiConnector';

const ApiCard = ({ workplace, rtdeData }) => {
    const rtdeText = JSON.stringify(rtdeData, undefined, 2);
    const loading = Object.keys(rtdeData).length === 0;

    return (
        <Card size='small' bordered={false} loading={loading}
            actions={[<WorkplaceApiConnector workplace={workplace} />]}>
            <pre className='rtdeData'>{rtdeText}</pre>
        </Card>
    )
}

const mapStateToProps = (state, props) => ({
    rtdeData: getRtdeDataByWorkplace(state, props.workplace.id)
})

ApiCard.propTypes = {
    workplace: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, null)(ApiCard);

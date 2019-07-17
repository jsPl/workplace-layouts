import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card } from 'antd';
import { getRtdeDataByWorkplace, getDashboardDataByWorkplace } from '../../redux/api';
import WorkplaceApiConnector from '../workplace/WorkplaceApiConnector';
import classNames from 'classnames';

const ApiCard = ({ workplace, data }) => {
    const { rtde: rtdeData, dashboard: dashboardData } = data;
    //const rtdeText = JSON.stringify(rtdeData, undefined, 2);
    //const dashboardText = JSON.stringify(dashboardData, undefined, 2);
    const loading = Object.keys(rtdeData).length === 0;

    //console.log('rtdeData', rtdeData, 'dashboardData', dashboardData);

    const programState = <span className='programState'>{getProgramStateText(dashboardData)}</span>

    return (
        <Card size='small' bordered={false} loading={loading} className='apiData'
            actions={[programState, <WorkplaceApiConnector workplace={workplace} />]}>

            <div className='rtdeOutputContainer'>
                <ActualTcpPose data={rtdeData.actual_TCP_pose || {}} />
                <ActualQ data={rtdeData.actual_q || {}} />
            </div>

            {/* <pre>{rtdeText}</pre> */}
            {/* <pre>{dashboardText}</pre> */}
        </Card>
    )
}

const ActualTcpPose = ({ data }) => {
    const positionClass = classNames({ value: true, mm: data.positionUnit === 'mm' });
    const rotationClass = classNames({ value: true, rad: data.rotationUnit === 'rad' });

    const position = ['x', 'y', 'z'];
    const rotation = ['rx', 'ry', 'rz'];

    return (
        <fieldset className='rtdeOutput'>
            <legend>TCP</legend>
            {
                position.map(o =>
                    <div className='item' key={o}>
                        <span>{o.toUpperCase()}</span><span className={positionClass}>{data[o] && data[o].toFixed(2)}</span>
                    </div>
                )
            }
            {
                rotation.map(o =>
                    <div className='item' key={o}>
                        <span>{o.toUpperCase()}</span><span className={rotationClass}>{data[o] && data[o].toFixed(4)}</span>
                    </div>
                )
            }
        </fieldset>
    )
}

const ActualQ = ({ data }) => {
    const outputs = [
        { name: 'base', label: 'Base' },
        { name: 'shoulder', label: 'Shoulder' },
        { name: 'elbow', label: 'Elbow' },
        { name: 'wrist1', label: 'Wrist 1' },
        { name: 'wrist2', label: 'Wrist 2' },
        { name: 'wrist3', label: 'Wrist 3' },
    ]

    return (
        <fieldset className='rtdeOutput'>
            <legend>Joints</legend>
            {
                outputs.map(({ label, name }) =>
                    <div key={name} className='item'>
                        <span>{label}</span>
                        <span className='value deg'>{data[name] && data[name].toFixed(2)}</span>
                    </div>
                )
            }
        </fieldset>
    )
}

const getProgramStateText = data => {
    const loadedProgram = data['get loaded program'];
    if (loadedProgram === 'No program loaded') {
        return loadedProgram;
    }
    return data.programState;
}

const mapStateToProps = (state, props) => ({
    data: {
        rtde: getRtdeDataByWorkplace(state, props.workplace.id),
        dashboard: getDashboardDataByWorkplace(state, props.workplace.id)
    }
})

ApiCard.propTypes = {
    workplace: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, null)(ApiCard);

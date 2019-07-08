import React from 'react';
import { Icon, Badge } from 'antd';
import { connect } from 'react-redux';
import { showMessage } from '../../redux/ui';
import { addApi, updateApiConnectionState, receiveRtdeData, getApiByWorkplace } from '../../redux/api';
import WebSocketApi from '../../modules/api/WebSocketApi';

const WorkplaceApiConnector = ({ workplace, showMessage, addApi, updateApiConnectionState, receiveRtdeData,
    existingApi }) => {
    const { api } = workplace;
    if (!api) {
        return null;
    }

    const connectionState = existingApi && existingApi.api.connectionState;
    const apiConnector = existingApi ? existingApi.api.connector : new WebSocketApi(api.endpoint, api.type);

    const iconType = getConnectionIcon(connectionState);
    const iconTitle = getConnectionStateText(connectionState, workplace);
    const badgeStatus = getConnectionBadgeStatus(connectionState);
    const badgeTitle = getConnectionBadgeTitle(connectionState, api);
    const isConnPending = isConnectionStatePending(connectionState);

    //console.log('existingApi', existingApi)

    if (!existingApi) {
        addApi({
            workplace_id: workplace.id,
            endpoint: api.endpoint,
            type: api.type,
            connectionState: 'DISCONNECTED',
            connector: apiConnector
        });

        apiConnector
            .onMessage(data => {
                console.log(data);
                switch (data.type) {
                    case 'rtde_data':
                        receiveRtdeData(workplace.id, data.payload)
                        break;

                    default:
                        break;
                }
            })
            .onClose((code, reason, defaultMessage) => {
                if (code > 1000) {
                    const message = <div>{workplace.title}{defaultMessage}</div>
                    showMessage({ type: 'error', message, duration: 12 })
                }
            })
            .onConnectionStateChanged(connState => {
                console.log('onConnectionStateChanged', connState)
                updateApiConnectionState(workplace.id, connState);
            })
    }

    // useEffect(() => {
    //     console.log('useEffect');

    // api
    //     .onMessage(json => console.log(json))
    //     .onClose((code, reason, defaultMessage) => {
    //         if (code > 1000) {
    //             showMessage({ type: 'error', message: defaultMessage, duration: 12 })
    //         }
    //     })
    //     .onConnectionStateChanged(state => {
    //         console.log('onConnectionStateChanged', state)
    //         //setConnectionState(state);
    //         updateApi({ workplace_id: workplace.id, connectionState: state })
    //     })

    // return () => {
    //     console.log('unsubscribeHandlers and disconnect')
    //     api.unsubscribeHandlers().disconnect();
    //     //setConnectionState('DISCONNECTED');
    //     updateApi({ workplace_id: workplace.id, connectionState: 'DISCONNECTED' })
    // }
    // }, [api, workplace.id, showMessage, updateApi])

    const handleConnect = evt => {
        switch (connectionState) {
            case 'OPEN':
                apiConnector.disconnect();
                break;
            case 'DISCONNECTED':
            case 'CLOSED':
                apiConnector.connect();
                break;
            default:
                break;
        }
    }

    return <>
        <Badge dot={isConnPending} status={badgeStatus} title={badgeTitle}>
            <Icon type={iconType} style={{ fontSize: '1.2em' }} className='list-action'
                title={iconTitle}
                onClick={handleConnect} />
        </Badge>
    </>
}

const getConnectionIcon = connState => {
    switch (connState) {
        case 'CLOSING':
        case 'OPEN': return 'disconnect'
        default: return 'api'
    }
}

const getConnectionStateText = (connState, workplace) => {
    switch (connState) {
        case 'CONNECTING': return 'Connecting'
        case 'CLOSING': return 'Disconnecting'
        case 'OPEN': return 'Disconnect from API'
        case 'DISCONNECTED':
        case 'CLOSED':
        default:
            return `Connect to ${workplace.title} API`
    }
}

const getConnectionBadgeStatus = connState => {
    switch (connState) {
        case 'CONNECTING':
        case 'CLOSING': return 'connecting'
        case 'OPEN': return 'success'
        default: return null
    }
}

const getConnectionBadgeTitle = (connState, api) => {
    switch (connState) {
        case 'CONNECTING': return 'Connecting'
        case 'CLOSING': return 'Disconnecting'
        case 'OPEN': return `Connected to API endpoint ${api.endpoint}`
        case 'DISCONNECTED':
        case 'CLOSED':
        default:
            return 'Disconnected'
    }
}

const isConnectionStatePending = connState => connState === 'CONNECTING' || connState === 'CLOSING'

const mapStateToProps = (state, props) => ({
    existingApi: getApiByWorkplace(state, props.workplace.id)
})

const mapDispatchToProps = {
    showMessage,
    addApi,
    updateApiConnectionState,
    receiveRtdeData,
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkplaceApiConnector);
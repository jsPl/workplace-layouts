import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Badge } from 'antd';
import { connect } from 'react-redux';
import { showMessage } from '../../redux/ui';
import { addApi, updateApiConnectionState, receiveRtdeData, getApiByWorkplace } from '../../redux/api';
import WebSocketApi, { SocketCloseMessage } from '../../modules/api/WebSocketApi';
import { isNullOrEmptyString } from '../../modules/utils/utils';

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
            .onClose((code, reason) => {
                if (code > 1000) {
                    const message = <SocketCloseMessage workplace={workplace} code={code}
                        reason={reason} endpoint={api.endpoint} />;
                    showMessage({ type: 'error', message, duration: 12 })
                }
                receiveRtdeData(workplace.id, {})
            })
            .onConnectionStateChanged(connState => {
                updateApiConnectionState(workplace.id, connState);
            })
    }

    const handleConnect = evt => {
        switch (connectionState) {
            case 'OPEN':
                apiConnector.disconnect();
                break;
            case 'DISCONNECTED':
            case 'CLOSED':
                const urlParams = new URLSearchParams();
                if (!isNullOrEmptyString(api.rtde_outputs)) {
                    urlParams.append('rtde_outputs', api.rtde_outputs)
                }
                if (api.rtde_frequency) {
                    urlParams.append('rtde_frequency', api.rtde_frequency)
                }

                apiConnector.connect(urlParams);
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

WorkplaceApiConnector.propTypes = {
    workplace: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkplaceApiConnector);
import React, { useState, useEffect } from 'react';
import { Icon, Badge } from 'antd';
import { connect } from 'react-redux';
import { showMessage } from '../../../redux/ui';

const WorkplaceApiConnector = ({ workplace, api, showMessage }) => {
    const [connectionState, setConnectionState] = useState('DISCONNECTED');

    const iconType = getConnectionIcon(connectionState);
    const iconTitle = getConnectionStateText(connectionState, workplace);
    const badgeStatus = getConnectionBadgeStatus(connectionState);
    const badgeTitle = getConnectionBadgeTitle(connectionState, api);
    const isConnPending = isConnectionStatePending(connectionState);

    useEffect(() => {
        console.log('useEffect');

        api
            .onMessage(json => console.log(json))
            .onClose((code, reason, defaultMessage) => {
                if (code > 1000) {
                    showMessage({ type: 'error', message: defaultMessage, duration: 12 })
                }
            })
            .onConnectionStateChanged(state => {
                console.log('connection state', state)
                setConnectionState(state);
            })

        return () => {
            console.log('unsubscribeHandlers and disconnect')
            api.unsubscribeHandlers().disconnect();
            setConnectionState('DISCONNECTED');
        }
    }, [api, showMessage])

    const handleConnect = evt => {
        switch (connectionState) {
            case 'OPEN':
                api.disconnect();
                break;
            case 'DISCONNECTED':
            case 'CLOSED':
                api.connect();
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
        case 'OPEN': return 'Disconnect'
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

const mapDispatchToProps = {
    showMessage
}

export default connect(null, mapDispatchToProps)(WorkplaceApiConnector);
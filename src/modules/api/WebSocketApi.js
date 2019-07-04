import React from 'react';

export default class WebSocketApi {
    constructor(endpoint) {
        this.endpoint = endpoint;
        this.unsubscribeHandlers();
    }

    connect() {
        if (!this.endpoint) {
            console.log('Undefined api endpoint', this.endpoint);
            return this;
        }

        this.socket = new WebSocket(this.endpoint);
        this._attachEvents();
        this._updateConnectionState();

        console.log('Connected to', this.endpoint, this.socket);
        return this;
    }

    disconnect() {
        if (this.socket) {
            this._updateConnectionState('CLOSING');
            this.socket.close();
        }
        return this;
    }

    unsubscribeHandlers() {
        this.handleMessage = _ => { };
        this.handleConnectionStateChanged = _ => { };
        this.handleClose = _ => { };
        return this;
    }

    _attachEvents() {
        this.socket.addEventListener('open', evt => {
            this._updateConnectionState();
            console.log('connection open', evt);
        });

        this.socket.addEventListener('close', evt => {
            this._updateConnectionState();
            console.log('connection close', evt);
            const { code, reason } = evt;
            this.handleClose(code, reason, this._createCloseDefaultMessage(code, reason));
        });

        this.socket.addEventListener('error', evt => {
            this._updateConnectionState();
            console.log('connection error', evt);
        });

        this.socket.addEventListener('message', evt => {
            const jsonData = JSON.parse(evt.data);
            this.handleMessage(jsonData);
            //console.log('&lt; rcv', jsonData);
        });
    }

    onMessage = callback => {
        this.handleMessage = callback;
        return this;
    }

    onConnectionStateChanged = callback => {
        this.handleConnectionStateChanged = callback;
        return this;
    }

    onClose = callback => {
        this.handleClose = callback;
        return this;
    }

    send(data) {
        console.log('Send', data);
        this.socket.send(data);
        return this;
    }

    connectionStateAsText() {
        if (!this.socket) {
            return 'DISCONNECTED';
        }
        switch (this.socket.readyState) {
            case 0: return 'CONNECTING';
            case 1: return 'OPEN';
            case 2: return 'CLOSING';
            case 3: return 'CLOSED';
            default: return 'DISCONNECTED';
        }
    }

    _updateConnectionState(state) {
        this.handleConnectionStateChanged(state || this.connectionStateAsText());
    }

    _createCloseDefaultMessage = (code, reason) => {
        let text = <div>WebSocket connection closed with status code {code}</div>;
        let reas = reason !== '' ? <div>Reason: {reason}</div> : null;
        let desc = null;
        if (code === 1006) {
            desc = <div>Is API endpoint <em>{this.endpoint}</em> correct?</div>
        }
        return <div>{text}{reas}{desc}</div>;
    }
}
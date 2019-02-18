import React from 'react';
import { Button, InputNumber } from 'antd';

export default class InputFetchOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = { workplaceId: null };
    }

    render() {
        const { workplaceId } = this.state;
        const { onClick } = this.props;
        return (
            <>
                <Button disabled={!(Number(workplaceId) > 0)} onClick={() => onClick(workplaceId)}>fetch one</Button>
                <InputNumber className='fetchOne' min={1} value={workplaceId}
                    onChange={workplaceId => this.setState({ workplaceId })} />
            </>
        );
    }
}

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'antd';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

export const CountdownTimer = props => {
    const seconds = Math.max(0, props.seconds);
    const [count, setCount] = useState(seconds);
    const countdown$ = interval(1000).pipe(take(count));
    const decrement = () => setCount(count - 1);
    const subscription = useRef(null);
    const cancelTimer = () => {
        setCount(null); // null nie wywoła complete
        subscription.current.unsubscribe();
    }

    useEffect(() => {
        if (seconds === 0) {
            props.onCountdownComplete();
            return;
        }

        subscription.current = countdown$.subscribe({
            next() {
                decrement();
            },
            complete() {
                if (count === 0 && seconds > 0) {
                    props.onCountdownComplete();
                }
            }
        })
        return () => subscription.current.unsubscribe()
    })

    return (
        <Badge count={count} onClick={cancelTimer} className='countdownBagde'
            title='Time left to autorun next iteration. Click to cancel'>
            {props.children}
        </Badge>
    )
}

CountdownTimer.propTypes = {
    seconds: PropTypes.number.isRequired,
    onCountdownComplete: PropTypes.func.isRequired,
}
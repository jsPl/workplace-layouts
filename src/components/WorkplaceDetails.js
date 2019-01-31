import React from 'react';

export default function WorkplaceDetails(props) {
    return (
        <div className='wpDetails'>
            <div>{props.title || 'WorkplaceDetails'}</div>
        </div>
    )
}
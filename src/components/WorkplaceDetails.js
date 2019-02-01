import React from 'react';

export default function WorkplaceDetails({ workplace }) {
    return (
        <div className='wpDetails'>
            <div>id: {workplace.id}</div>
            <div>title: {workplace.title}</div>
            <div>x: {workplace.x} y: {workplace.y}</div>
            <div>width: {workplace.width} height: {workplace.height}</div>
        </div>
    )
}
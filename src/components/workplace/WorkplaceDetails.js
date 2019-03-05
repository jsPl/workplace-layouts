import React from 'react';

export default function WorkplaceDetails({ workplace }) {
    return (
        <div>
            <div>id: {workplace.id}</div>
            <div>title: {workplace.title}</div>
            <div>x: {workplace.x} y: {workplace.y}</div>
            <div>width: {workplace.width} height: {workplace.height}</div>
            <div>strefa robocza: długość {workplace.strefa_robocza_dlugosc + ' [m] '}
               szerokość {workplace.strefa_robocza_szerokosc + ' [m]'}</div>
        </div>
    )
}
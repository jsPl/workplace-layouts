import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { openPopup } from '../../util/utils';

export default function WorkplaceDetails({ workplace }) {

    const openWorkplacePopup = (id, evt) => {
        openPopup(`/eoffice/edm_system_object_frames.xml?action=edit&page=resources/edm_resource_workplaces_view.xml&oid=${id}`);
    }

    return (
        <div>
            {/* <div>id: {workplace.id}</div> */}
            <div>
                <span className='vmiddle'>{workplace.title}</span>
                <span title='Open details'>
                    <FaExternalLinkAlt className='vmiddle fa-icon' onClick={() => openWorkplacePopup(workplace.id)} />
                </span>
            </div>
            {/* <div>x: {workplace.x} y: {workplace.y}</div> */}
            {/* <div>width: {workplace.width} height: {workplace.height}</div> */}
            <div>długość: {workplace.strefa_robocza_dlugosc + ' m '}
                szerokość: {workplace.strefa_robocza_szerokosc + ' m'}</div>
        </div>
    )
}
import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { openPopup } from '../../../modules/utils/utils';
import { List, Tag } from 'antd';
import WorkplaceApiConnector from '../WorkplaceApiConnector';
//import { workplaceRepository } from '../../../modules/workplace/workplaceRepository';

export default function WorkplaceDetails({ workplace }) {
    const actions = [<WorkplaceApiConnector workplace={workplace} />]

    return (
        <List.Item actions={actions}>
            <List.Item.Meta
                avatar={<Image workplace={workplace} />}
                title={<Title workplace={workplace} />}
                description={<Details workplace={workplace} />}
            />
        </List.Item>
    )
}

const Image = ({ workplace }) => {
    if (workplace.imgPath) {
        return <img src={workplace.imgPath} alt={workplace.title} className='workplaceImage' />
    }
    return null;
}

const Title = ({ workplace }) => (
    <div>
        <span className='vmiddle'>{workplace.title}</span>
        <span title='Open details'>
            <FaExternalLinkAlt className='vmiddle fa-icon' onClick={() => openWorkplacePopup(workplace.id)} />
        </span>
    </div>
)

const Details = ({ workplace }) => {
    //const workplaceObj = workplaceRepository.findById(workplace.id);
    //const { x, y } = workplaceObj.getCenter();

    return (
        <div>
            <div>
                długość: {workplace.strefa_robocza_dlugosc + 'm, '}
                szerokość: {workplace.strefa_robocza_szerokosc + 'm'}
            </div>
            {/* <div>
                centroid: {x + ' ' + y}
            </div> */}
            <Tag color={workplace.state.code} className='wpState' visible={workplace.state.label !== ''} title='State'>
                {workplace.state.label}
            </Tag>
            <Tag color='#d5af91' className='wpFixedPosition' visible={workplace.fixedPosition} title='Not moveable'>
                fixed
            </Tag>
        </div>
    )
}

const openWorkplacePopup = (id, evt) => {
    openPopup(`/eoffice/edm_system_object_frames.xml?action=edit&page=resources/edm_resource_workplaces_view.xml&oid=${id}`);
}
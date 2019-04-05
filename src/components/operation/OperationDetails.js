import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { openPopup } from '../../modules/utils/utils';
import { List } from 'antd';

export default function OperationDetails({ operation }) {
    return (
        <List.Item>
            <List.Item.Meta
                title={<Title operation={operation} />}
                description={<Details operation={operation} />}
            />
        </List.Item>
    )
}

const Title = ({ operation }) => (
    <div>
        <span className='vmiddle position' title='Position'>{operation.position}</span>
        <span className='vmiddle'>{operation.title}</span>
        <span title='Open details'>
            <FaExternalLinkAlt className='vmiddle fa-icon' onClick={() => openOperationPopup(operation.id_system_object)} />
        </span>
    </div>
)

const Details = ({ operation }) => (
    <div>
        <span title='Workplace'>{operation.default_workplace_title}</span>
    </div>
)

const openOperationPopup = (id, evt) => {
    openPopup(`/eoffice/edm_system_object_frames.xml?action=edit&page=resources/edm_resource_operations_view.xml&oid=${id}`);
}
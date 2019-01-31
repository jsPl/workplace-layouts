import React from 'react';
import PropTypes from 'prop-types';

export default function WorkplaceList({ workplaces, selectedWorkplaceId }) {
    const listItems = workplaces.length === 0 ?
        <span> none</span>
        :
        <ol>
            {workplaces.map(wp =>
                <WorkplaceListItem key={wp.id} workplace={wp} isSelected={selectedWorkplaceId === wp.id} />
            )}
        </ol>

    return (
        <div className='wpList'>
            <label>Workplaces:</label>
            {listItems}
        </div>
    )
}

function WorkplaceListItem({ workplace, isSelected }) {
    return (
        <li className={isSelected ? 'selected' : null}>
            {workplace.title}
        </li>
    )
}

WorkplaceList.propTypes = {
    workplaces: PropTypes.array.isRequired,
    selectedWorkplaceId: PropTypes.number
}

WorkplaceListItem.propTypes = {
    workplace: PropTypes.object.isRequired,
    isSelected: PropTypes.bool
}
import React from 'react';
import PropTypes from 'prop-types';

export default function WorkplaceList({ workplaces, selectedWorkplace }) {
    const listItems = workplaces.length === 0 ?
        <span> none</span>
        :
        <ol>
            {workplaces.map(wp =>
                <WorkplaceListItem key={wp.id} workplace={wp} isSelected={selectedWorkplace === wp} />
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
    const colorBox = <div style={{ backgroundColor: workplace.color }} className='colorBox'></div>;

    return (
        <li className={isSelected ? 'selected' : null}>
            {colorBox}
            {workplace.title}
        </li>
    )
}

WorkplaceList.propTypes = {
    workplaces: PropTypes.array.isRequired,
    selectedWorkplace: PropTypes.object
}

WorkplaceListItem.propTypes = {
    workplace: PropTypes.object.isRequired,
    isSelected: PropTypes.bool
}
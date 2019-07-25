import React from 'react';
import { Table, Icon } from 'antd';
import { connect } from 'react-redux';
import { getSummaryIterations } from '../../../redux/craft';
import ApplyLayout from './ApplyLayout';

const columns = [
    {
        title: 'Iteration',
        dataIndex: 'key',
        align: 'right',
        width: 90,
    },
    {
        title: 'Layout cost',
        dataIndex: 'cost',
        width: 170,
    },
    {
        title: 'Exchange',
        dataIndex: 'titles',
        render: titles => {
            if (!titles) {
                return <span>Initial layout</span>
            }
            return <span>{titles[0]}<Icon type='swap' className='exchange' />{titles[1]}</span>
        }
    },
    {
        title: 'Apply layout',
        key: 'layout',
        width: 150,
        align: 'center',
        render: (_, record) => <ApplyLayout layout={record.layout} />
    }
];

const CraftSummaryIterationList = ({ iterations }) => {
    // rowClassName={record => record.key === iterations.length ? 'currentLayout' : ''}
    return (
        <Table dataSource={iterations} columns={columns} size='middle' pagination={false} scroll={{ y: 250 }} />
    )
}

const mapStateToProps = state => {
    const iterations = getSummaryIterations(state).map((o, idx) => {
        const { titles } = o.exchange;
        return { ...o, titles, key: idx + 1 }
    });

    return {
        iterations
    }
}

export default connect(mapStateToProps, null)(CraftSummaryIterationList)
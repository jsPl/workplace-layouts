import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { EmptyList } from '../panel/ControlPanel';
import { getProductionHall } from '../../redux/productionHall';
import { isLoadingWorkplaces } from '../../redux/workplace';

const ProductionHallDetails = ({ productionHall, isLoading }) => {
    return (
        <Spin spinning={isLoading}>
            {Object.keys(productionHall).length === 0 ? <EmptyList /> :
                <div>
                    {productionHall.title}
                    <span title='Scale' style={{ marginLeft: '0.5em' }}>
                        ({productionHall.svgScaleAsString})
                    </span>
                </div>
            }
        </Spin>
    )
}

const mapStateToProps = state => ({
    productionHall: getProductionHall(state),
    isLoading: isLoadingWorkplaces(state),
})

ProductionHallDetails.propTypes = {
    productionHall: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps)(ProductionHallDetails)
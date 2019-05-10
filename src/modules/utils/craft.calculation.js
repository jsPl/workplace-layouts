export const calculateDistanceData = (idsArray, distanceCalculationFunction) => {
    let i = 0, K = idsArray;
    const calculateDistances = (currentId, index, ids) => {
        const restIds = ids.slice(index + 1);
        const distances = restIds.map(id => distanceCalculationFunction(currentId, id));
        let result = {};
        restIds.forEach((id, i) => result[id] = distances[i]);
        return result;
    }

    let distance = {};
    while (i < K.length - 1) {
        let id = K[i];
        distance[id] = calculateDistances(id, i, K)
        i++;
    }
    return distance;
}

export const claculateFlowData = pairs => {
    return pairs.reduce((flowData, pair) => {
        const [first, second] = pair.map(o => o.default_workplace_id);
        flowData[first] = [...flowData[first] || [], second]
        return flowData
    }, {})
}

export const calculateCostData = pairs => {
    return pairs.reduce((costData, pair) => {
        const [first, second] = pair;
        const cost = first.koszt_transportu === 0 ? 1 : first.koszt_transportu;

        costData[first.default_workplace_id] = {
            ...costData[first.default_workplace_id],
            [second.default_workplace_id]: cost
        };
        return costData
    }, {})
}

export const claculateFlowPairs = operations => {
    let pairs = [];
    if (operations.length > 1) {
        let prev = operations[0];

        for (let i = 1; i < operations.length; i++) {
            const current = operations[i];
            pairs.push([prev, current]);
            prev = current;
        }
    }
    return pairs;
}
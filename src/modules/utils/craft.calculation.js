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
        const [first, second] = pair;
        flowData[first] = [...new Set([...flowData[first] || [], second])] // Set for unique values
        return flowData
    }, {})
}

export const claculateFlowPairs = operations => {
    let pairs = [];
    if (operations.length > 1) {
        let prev = operations[0].default_workplace_id;

        for (let i = 1; i < operations.length; i++) {
            const current = operations[i].default_workplace_id;
            pairs.push([prev, current]);
            prev = current;
        }
    }
    return pairs;
}
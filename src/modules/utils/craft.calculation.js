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
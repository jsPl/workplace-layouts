import { calculateDistanceData } from './craft.calculation';

const D = 10;
const distanceCalculationFun = (id1, id2) => D;

test('calculateDistanceData', () => {
    const obj1 = {
        1: { 2: D, 3: D, 4: D },
        2: { 3: D, 4: D },
        3: { 4: D },
    }
    expect(calculateDistanceData([1, 2, 3, 4], distanceCalculationFun)).toEqual(obj1);

    const obj2 = {
        A: { B: D, C: D },
        B: { C: D }
    }
    expect(calculateDistanceData(['A', 'B', 'C'], distanceCalculationFun)).toEqual(obj2);

    const obj3 = { 1: { 2: D } }
    expect(calculateDistanceData([1, 2], distanceCalculationFun)).toEqual(obj3);

    expect(calculateDistanceData([1], distanceCalculationFun)).toEqual({});
});
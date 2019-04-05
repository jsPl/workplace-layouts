import { metersToPixels, ONE_METER_IN_PIXELS } from './conversion'

test('conversions', () => {
    expect(metersToPixels(1)).toEqual(ONE_METER_IN_PIXELS);
    expect(metersToPixels(1, 1)).toEqual(ONE_METER_IN_PIXELS);
    expect(metersToPixels(1, 1/50)).toEqual(75.590551182);
    expect(metersToPixels(2.5, 1/50)).toEqual(188.976377955);
});
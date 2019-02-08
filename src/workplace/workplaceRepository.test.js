import { WorkplaceRepository } from './workplaceRepository';

test('workplace repo operations', () => {
    const repo = new WorkplaceRepository();
    
    expect(repo.list().length).toBe(0);

    repo.add({ id: 1, title: 'wp1' });
    expect(repo.list().length).toBe(1);

    repo.add({ id: 2, title: 'wp2' }, { id: 3, title: 'wp3' });

    expect(repo.list().length).toBe(3);

    repo.remove({ id: 2, title: 'wp2' });
    repo.remove({ id: 111111, title: 'wp2' });
    let expected =  [ { id: 1, title: 'wp1' }, { id: 3, title: 'wp3' } ];
    expect(repo.list()).toEqual(expect.arrayContaining(expected));

    expect(repo.findById(888)).toBeNull();
    expect(repo.findById(null)).toBeNull();
    expect(repo.findById(3)).toEqual({ id: 3, title: 'wp3' });

    expect(repo.findOtherThan(null)).toEqual(expect.arrayContaining(expected));
    expect(repo.findOtherThan({ id: 1, title: 'wp1' })).toEqual(expect.arrayContaining([{ id: 3, title: 'wp3' }]));
    expect(repo.findOtherThan({ id: 2323, title: 'wp2231' })).toEqual(expect.arrayContaining(expected));
});
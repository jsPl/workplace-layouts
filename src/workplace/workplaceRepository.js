import { isRectColliding } from '../util/collisions'

class WorkplaceRepository {
    constructor() {
        this.workplaces = [];
    }

    list() {
        return this.workplaces;
    }

    add(...toAdd) {
        let existing = this.workplaces.map(o => o.id);
        toAdd.forEach(workplace => {
            if (!existing.includes(workplace.id)) {
                this.workplaces.push(workplace);
            }
        })
        return this;
    }

    remove(toRemove) {
        this.workplaces = this.workplaces.filter(o => o.id !== toRemove.id);
        return this;
    }

    findById(id) {
        return id ? (this.workplaces.find(o => o.id === id) || null) : null;
    }

    findOtherThan(obj) {
        return obj ? this.workplaces.filter(o => o.id !== obj.id) : this.workplaces;
    }

    findCollisionsWith(obj) {
        let colliding = this.findOtherThan(obj)
            .filter(o => isRectColliding(obj.getSvgForCollisionCalculation(), o.getSvgForCollisionCalculation()));

        return colliding;
    }
}

export let workplaceRepository = new WorkplaceRepository();
import _ from 'lodash';

const Priority = {};

Priority.LEVEL = {};

Priority.LEVEL.LOW = Object.freeze({ value: 0 });
Priority.LEVEL.NORMAL = Object.freeze({ value: 1 });
Priority.LEVEL.HIGH = Object.freeze({ value: 2 });

Object.keys(Priority.LEVEL).forEach(level => {
    Priority[level] = Priority.LEVEL[level];
});

Priority.of = p => {
    const priority = Object.values(Priority.LEVEL)
        .filter(level => level.value === p)[0];

    if (_.isNil(priority)) throw 'Unknown priority';

    return priority;
};

Priority.up = p => {
    try {
        return Priority.of(p.value + 1);
    } catch (error) {
        if (error == 'Unknown priority') return p;
        throw error;
    }
}

Priority.down = p => {
    try {
        return Priority.of(p.value - 1);
    } catch (error) {
        if (error == 'Unknown priority') return p;
        throw error;
    }
}

Object.freeze(Priority);

export default Priority;
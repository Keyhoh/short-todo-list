const Priority = {};

Priority.LOW = Object.freeze({value: 0});
Priority.NORMAL = Object.freeze({value: 1});
Priority.HIGH = Object.freeze({value: 2});

Object.freeze(Priority);

export default Priority;
import uuid from 'uuid-random';

export default class Id {
    _value;

    static new(){
        let id = new Id();
        id._value = uuid();
        return id;
    }

    static of(value) {
        if(!Id.isUuid(value)) throw 'Illegal uuid';
        let id = new Id();
        id._value = value;
        return id;
    }

    get value() {
        return this._value;
    }

    static isUuid(id){
        const uuidPattern = /^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/;
        return uuidPattern.test(id);
    }
}
export default class Validation{


    static objectIsNull(obj) {
        return ['', undefined, null].indexOf(obj) !== -1;
    }

}
export default class Validation{


    static objectIsNull(obj) {
        return ['', undefined, null].indexOf(obj) !== -1;
    }

    static isValidDate(dateString) {
        let date = new Date(dateString);
        return !isNaN(date.getTime());
    }

}
'use strict';

class DataService {

    /**
     * add zeros at the beginning of the line (for example: 12 = 0012 if places = 2 and num = 12)
     * @param num
     * @param places - zeros count
     * @returns {*}
     */
    static zeroPad(num, places) {
        var zero = places - num.toString().length + 1;
        return Array(+(zero > 0 && zero)).join("0") + num;
    }

}

module.exports = DataService;
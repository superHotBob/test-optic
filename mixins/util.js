export default {
    methods: {
        in_array(value, array) {
            for(let i = 0, l = array.length; i < l; i++) {
                if(array[i] == value) {
                    return true;
                }
            }
            return false;
        },
        object_in_array(object) {
            var array = [];
            for(let i in object) {
                array.push(object[i]);
            }
            return array;
        },
        hasClass(element, hasClass) {
            if (!element.classList.contains(hasClass)) {
                return false;
            }
            return true;
        },
        wording(count) {
            let titles = ['товар', 'товара', 'товаров'];
            let cases = [2, 0, 1, 1, 1, 2];
            return titles[ (count%100>4 && count%100<20) ? 2 : cases[(count%10<5)?count%10:5] ];  
        },
    }
}
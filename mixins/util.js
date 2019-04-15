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
        }
    }
  }
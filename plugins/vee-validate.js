import Vue from 'vue'
import ru from 'vee-validate/dist/locale/ru';
import VeeValidate, { Validator } from 'vee-validate';

// Install the Plugin.
Vue.use(VeeValidate, {
    classes: true
});

// Localize takes the locale object as the second argument (optional) and merges it.
Validator.localize('ru', ru);
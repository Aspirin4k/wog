import { Validator } from 'vee-validate';

Validator.extend('task', {
    getMessage(field) {
        return 'По крайней мере 2 стороны должны принять участие в задании'
    },
    validate(value, [args]) {
        console.log(args);
        return value ? args[0] || args[1] : args[0] && args[1];
    }
})
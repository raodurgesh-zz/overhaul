import Vue from 'vue';

export const JustDigits = () => {
    Vue.directive('digitsonly', (el, binding) => {
        let newValue = el.value.replace(/\D+/ig, '');
        el.value = newValue;
        binding.value = el.value;
    });
  };    
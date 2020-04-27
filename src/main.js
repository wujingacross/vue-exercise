import Vue from 'vue';
import App from './App.vue';
import CurModal from './plugins/curModal';
import './index';

Vue.config.productionTip = false;

Vue.use(CurModal);

new Vue({
  render: h => h(App)
}).$mount('#app');

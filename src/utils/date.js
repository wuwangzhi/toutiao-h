import Vue from "vue";
import moment from "moment";
moment.locale("zh-cn");
Vue.filter('relativeTime', val => moment().to(val))
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <s-body />
    <validate-input :rules="rules" />
    <validate-text-area :rules="Trules" />
    <button @click="addCount(2)">add count</button>
    <button @click="asyncAddCount">async add count</button>
    {{count}} {{count22}}
    {{doubleCount}}
    <!-- <HelloWorld msg="aaa" />
    <EightQueue />-->
  </div>
</template>

<script>
// import EightQueue from "./components/EightQueue";
// import HelloWorld from "./components/HelloWorld";
import CustomInput from "./components/CusInput";
import CusTextArea from "./components/CusTextArea";
import ValidateHoc from "./components/hoc.js";
import SBody from "./components/SBody";
const ValidateInput = ValidateHoc(CustomInput);
const ValidateTextArea = ValidateHoc(CusTextArea);

import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "App",
  components: {
    // EightQueue,
    // HelloWorld,
    ValidateInput,
    ValidateTextArea,
    SBody
  },
  computed: {
    // ...mapState(["count"]),
    ...mapState({
      count: state => state.count,
      count22: state => state.count
    }),
    ...mapGetters(["doubleCount"])
    // count() {
    //   return this.$store.state.count;
    // },
    // doubleCount() {
    //   return this.$store.getters.doubleCount;
    // }
  },
  methods: {
    ...mapMutations(["addCount"]),
    ...mapActions(["asyncAddCount"])
    // addCount() {
    //   this.$store.commit("addCount", 3); // store的mutations中的方法名
    // },
    // asyncAddCount() {
    //   this.$store.dispatch("asyncAddCount"); // store的actions中的方法名
    // }
  },
  data() {
    return {
      rules: [
        {
          test: function(value) {
            return /^[0-9]*$/.test(value);
          },
          message: "请输入一个数字"
        }
      ],
      Trules: [
        {
          test: function(value) {
            return value;
          },
          message: "请输入内容"
        }
      ]
    };
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

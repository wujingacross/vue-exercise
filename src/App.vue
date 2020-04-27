<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <s-body />
    <validate-input :rules="rules" />
    <validate-text-area :rules="Trules" />
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

export default {
  name: "App",
  components: {
    // EightQueue,
    // HelloWorld,
    ValidateInput,
    ValidateTextArea,
    SBody
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

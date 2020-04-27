const notification = (opt = {}) => {
  const { title = '自定义弹窗', desc = '' } = opt;
  alert(title + desc);
  document.body.appendChild(
    <div class="curModal">
      <div>{title}</div>
      <div>{desc}</div>
    </div>
  );
};

export default {
  install: (Vue, opts = {}) => {
    console.log('install=', Vue, opts);

    Vue.prototype.$notify = notification;
  }
};

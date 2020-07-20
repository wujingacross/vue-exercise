/* eslint-disable no-unused-vars */
// let x;
// let y;
// let f = n => n * 100 + 100;

let active;

let watch = function(cb) {
  active = cb;
  active();
  active = null;
};

let queue = [];
let nextTick = cb => Promise.resolve().then(cb);
let queueJob = job => {
  if (!queue.includes(job)) {
    queue.push(job);
    nextTick(flushJobs);
  }
};
let flushJobs = () => {
  let job;
  while ((job = queue.shift()) !== undefined) {
    job();
  }
};

class Dep {
  constructor() {
    this.deps = new Set();
  }
  depend() {
    if (active) {
      this.deps.add(active);
    }
  }
  notify() {
    this.deps.forEach(dep => queueJob(dep));
  }
}

let ref = initValue => {
  let value = initValue;
  let dep = new Dep();

  return Object.defineProperty({}, 'value', {
    get() {
      dep.depend();
      return value;
    },
    set(newValue) {
      value = newValue;
      dep.notify();
    }
  });
};

let createReactive = (target, prop, value) => {
  let dep = new Dep();

  // return new Proxy(target, {
  //   get(target, prop) {
  //     dep.depend();
  //     return Reflect.get(target, prop);
  //   },
  //   set(target, prop, value) {
  //     Reflect.set(target, prop, value);
  //     dep.notify();
  //   },
  // });

  return Object.defineProperty(target, prop, {
    get() {
      dep.depend();
      return value;
    },
    set(newValue) {
      value = newValue;
      dep.notify();
    }
  });
};

export let reacitve = obj => {
  let dep = new Dep();

  Object.keys(obj).forEach(key => {
    let value = obj[key];
    createReactive(obj, key, value);
  });

  return obj;
};

// let data = reacitve({
//   count: 0
// });

import { Store } from './vuex';

let store = new Store({
  state: {
    count: 0
  },
  mutations: {
    addCount(state, payload) {
      state.count += payload || 1;
    }
  },
  plugins: [
    store =>
      store.subscribe((mutation, state) => {
        console.log(mutation);
      })
  ]
});

document.getElementById('add').addEventListener('click', function() {
  // data.count++;
  store.commit('addCount', 1);
});
let str;
watch(() => {
  str = `hello ${store.state.count}`;
  document.getElementById('app').innerText = str;
});

// let x;
// let y;
// let z;
// // let f = n => n * 100 + 100;

// let active;

// let watch = function(cb) {
//   active = cb;
//   active();
//   active = null;
// };

// let queue = [];
// let nextTick = cb => Promise.resolve().then(cb);

// let queueJob = job => {
//   if (!queue.includes(job)) {
//     queue.push(job);
//     console.log('rrr', queue);
//     // flushJob();
//     nextTick(flushJob); // 启用异步更新队列
//   }
// };

// let flushJob = () => {
//   console.log('----flushJob', queue.length);
//   while (queue.length > 0) {
//     const job = queue.shift();
//     console.log('eee', job);
//     job && job();
//   }
// };

// class Dep {
//   constructor() {
//     this.deps = new Set();
//   }
//   depend() {
//     if (active) {
//       this.deps.add(active);
//     }
//   }
//   notify() {
//     this.deps.forEach(dep => queueJob(dep));
//   }
// }

// let ref = initValue => {
//   let value = initValue;
//   let dep = new Dep();

//   return Object.defineProperty({}, 'value', {
//     get() {
//       dep.depend();
//       return value;
//     },
//     set(newValue) {
//       value = newValue;
//       dep.notify();
//     }
//   });
// };

// x = ref(1);
// y = ref(1);
// z = ref(1);

// watch(() => {
//   const tpls = `hello x=${x.value},  y=${y.value},  z=${z.value}`;
//   console.log(tpls);
//   document.write(tpls);
// });

// x.value = 2;
// y.value = 2;
// z.value = 2;

<template>
  <div class="wrapper">
    八皇后问题
    <div class="grid">
      <div class="row" v-for="(row, idx) in grids" :key="idx">
        <div
          class="cell"
          v-for="(cell, cidx) in row"
          :key="cidx"
          @click.stop="selectCell(idx, cidx)"
        >
          <div v-if="cell.ok">Q</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const grids = new Array(8).fill(1).map((i, idx) => {
  return new Array(8).fill(1).map((a, index) => ({
    key: `key-${idx}-${index}`,
    ok: false
  }));
});
console.log("-=-=", grids);

export default {
  name: "HelloWorld",
  data() {
    return {
      grids
    };
  },
  methods: {
    selectCell(ridx, cidx) {
      console.log("===", ridx, cidx);
      if (this.validate(ridx, cidx)) {
        this.grids[ridx][cidx].ok = !this.grids[ridx][cidx].ok;
      } else {
        alert("当前位置不能放置皇后");
      }
    },
    validate(ridx, cidx) {
      // 横
      for (let i = 0; i < this.grids[ridx].length; i++) {
        if (this.grids[ridx][i].ok) {
          return false;
        }
      }

      // 竖
      for (let i = 0; i < this.grids.length; i++) {
        if (this.grids[i][cidx].ok) {
          return false;
        }
      }

      // 撇
      for (let i = 0; i < this.grids[0].length; i++) {
        let y = ridx + cidx - i;
        if (y >= 0 && y < this.grids.length && this.grids[y][i].ok) {
          return false;
        }
      }

      // 捺
      for (let i = 0; i < this.grids[0].length; i++) {
        let y = ridx - cidx + i;
        if (y >= 0 && y < this.grids.length && this.grids[y][i].ok) {
          return false;
        }
      }

      return true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.row {
  display: flex;
}
.row:nth-child(2n) .cell:nth-child(2n) {
  background: #999;
}
.row:nth-child(2n) .cell:nth-child(2n-1) {
  background: #efefef;
}
.cell {
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: #999;
  cursor: pointer;
}
.cell:nth-child(2n) {
  background: #efefef;
}
</style>

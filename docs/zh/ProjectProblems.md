# ProjectProblems

## elementui table 树形 勾选父节点时勾选全部子节点

需要加以下三个方法
@select="selectChange"
@select-all="selectAllChange"
@selection-change="selectionChangeHandler"

```vue
<template>
  <el-table ref="multiTable" v-loading="loading" lazy :load="getMenus" :data="list" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" row-key="id" @select="selectChange" @select-all="selectAllChange" @selection-change="selectionChangeHandler"></el-table>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      getMenus: null,
      list: [],
    }
  },
  methods: {
    /**
     * 用于树形表格多选，单选的封装
     * @param selection
     * @param row
     */
    selectChange(selection, row) {
      // 如果selection中存在row代表是选中，否则是取消选中
      if (selection.find(val => { return this.getDataId(val) === this.getDataId(row) })) {
        if (row.children) {//注意这里的children是后台返回数据的children字段
          row.children.forEach(val => {
            this.$refs.multiTable.toggleRowSelection(val, true)
            selection.push(val)
            if (val.children) {
              this.selectChange(selection, val)
            }
          })
        }
      } else {
        this.toggleRowSelection(selection, row)
      }
    },
    /**
     * 用于树形表格多选, 选中所有
     * @param selection
     */
    selectAllChange(selection) {
      // 如果选中的数目与请求到的数目相同就选中子节点，否则就清空选中
      if (selection && selection.length === this.list.length) {
        selection.forEach(val => {
          this.selectChange(selection, val)
        })
      } else {
        this.$refs.multiTable.clearSelection()
      }
    },
    // 选择改变
    selectionChangeHandler(val) {
      this.selections = val
      this.unique(this.selections, 'id')//这里有一个问题就是这样点选完之后，数据有重复，所以根据id手动去重，期待优化
    },
    /**
     * 切换选中状态
     * @param selection
     * @param data
     */
    toggleRowSelection(selection, data) {
      if (data.children) {//注意这里的children也是后台返回数据的children字段
        data.children.forEach(val => {
          this.$refs.multiTable.toggleRowSelection(val, false)
          if (val.children) {
            this.toggleRowSelection(selection, val)
          }
        })
      }
    },
    getDataId(data) {
      return data['id']
    },
    //数组去重
    unique(arr, i) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[i].id === arr[j].id) {
            arr.splice(j, 1)
            j--
          }
        }
      }
    },
    //列表树懒加载
    getMenus(tree, treeNode, resolve) {
      const params = {pid: tree.id}
      setTimeout(() => {
        /*crudMenu.getMenus(params).then(res => {
         resolve(res.content)
         })*/
      }, 100)
    },
  }
}
</script>
```

---

```vue
<!-- 存货 弹窗 -->
<template>
  <el-dialog :title="titleName" @open="open" v-if="IsShowPage" :visible.sync="IsShowPage" :append-to-body="true" width="70%" @close="cancel" :close-on-click-modal="false" :close-on-press-escape="false">
    <div class="sc-list-body">
      <div class="table-btn-warp flex_between_center">
        <search @search="cliSearch" placeholder="请输入编码、名称"/>
      </div>
      <el-table ref="multiTable" row-key="stockCode" :data="tableData" :default-expand-all="defaultExpandAll" :row-class-name="tableRowClassName" max-height="500" @select="selectChange" @select-all="selectAllChange" @selection-change="selectionChangeHandler" :tree-props="treeProps">
        <el-table-column label="序号" type="index" align="center" width="60"/>
        <el-table-column type="selection" :reserve-selection="true" align="center"/>
        <el-table-column label="编号" prop="stockCode" width="180">
          <template slot-scope="{row}">
            <el-button type="text">{{ row.stockCode }}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="stockName" show-overflow-tooltip width="180"/>
        <el-table-column label="辅助属性" prop="customStockName" show-overflow-tooltip width="180"/>
        <el-table-column label="存货类别" prop="stockTypeName" show-overflow-tooltip width="180"/>
        <el-table-column label="规格型号" prop="specs" show-overflow-tooltip width="180"/>
        <el-table-column label="单位" prop="measureUnit" show-overflow-tooltip align="center" width="180"/>
        <el-table-column label="创建日期" prop="createTime" show-overflow-tooltip width="180"/>
        <el-table-column label="创建者" prop="createUserName" show-overflow-tooltip align="center" width="180"/>
        <el-table-column label="备注" prop="remark" show-overflow-tooltip width="180"/>
      </el-table>
      <pagination :total="pagination.total" :page.sync="pagination.page" :limit.sync="pagination.pageSize" @pagination="getLists"/>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save">确定</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import search from "@/views/setting/supplyChainSys/components/search";
import pagination from "@/views/setting/supplyChainSys/components/pagination";
import {getStockList} from "@/api/supplyChain";

export default {
  props: {
    dialogFormVisible: {type: Boolean, default: false},
    parent: {type: Boolean, default: false}, //勾选项带有子项时，父项是否可选默认为false不可选，true可选
    defaultExpandAll: {type: Boolean, default: true}, //带有子项时，是否默认展开所有子项
  },
  components: {search, pagination},
  data() {
    return {
      IsShowPage: false,
      titleName: "存货",
      tableData: [],
      keyword: "",
      pagination: {total: 0, pageSize: 10, page: 1},
      checkBoxData: [],
      treeProps: {children: "children", hasChildren: "hasChildren"},
    };
  },
  watch: {
    dialogFormVisible(val) {
      this.IsShowPage = val;
      if (val) {
        console.log(this.checkBoxData);
        this.getStockList();
      }
    },
  },
  methods: {
    // 弹窗每次打开都会执行一次这个方法，但是这个方法在列表接口调用之后才执行
    open() {},
    /**
     * 用于树形表格多选，单选的封装
     * @param selection
     * @param row
     */
    selectChange(selection, row) {
      // 如果selection中存在row代表是选中，否则是取消选中
      if (
        selection.find(val => {
          return this.getDataId(val) === this.getDataId(row);
        })
      ) {
        if (row.children) {
          //注意这里的children是后台返回数据的children字段
          row.children.forEach(val => {
            this.$refs.multiTable.toggleRowSelection(val, true);
            selection.push(val);
            if (val.children) {
              this.selectChange(selection, val);
            }
          });
        }
      } else {
        this.toggleRowSelection(selection, row);
      }
    },
    /**
     * 用于树形表格多选, 选中所有
     * @param selection
     */
    selectAllChange(selection) {
      // 如果选中的数目与请求到的数目相同就选中子节点，否则就清空选中
      if (selection && selection.length === this.tableData.length) {
        selection.forEach(val => {
          this.selectChange(selection, val);
        });
      } else {
        this.$refs.multiTable.clearSelection();
      }
    },
    // 选择改变
    selectionChangeHandler(val) {
      this.checkBoxData = val;
      this.unique(this.checkBoxData, "stockCode");
    },
    /**
     * 切换选中状态
     * @param selection
     * @param data
     */
    toggleRowSelection(selection, data) {
      if (data.children) {
        //注意这里的children也是后台返回数据的children字段
        data.children.forEach(val => {
          this.$refs.multiTable.toggleRowSelection(val, false);
          if (val.children) {
            this.toggleRowSelection(selection, val);
          }
        });
      }
    },
    getDataId(data) {
      return data["stockCode"];
    },
    //数组去重
    unique(arr, key) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[i][key] === arr[j][key]) {
            arr.splice(j, 1);
            j--;
          }
        }
      }
    },
    // 把每一行的索引放进row
    tableRowClassName({row, rowIndex}) {
      row.index = rowIndex;
    },
    getLists(val) {
      this.pagination.page = val.page;
      this.pagination.pageSize = val.pageSize;
      this.getStockList();
    },
    cliSearch(val) {
      this.keyword = val;
      this.pagination.page = 1;
      this.getStockList();
    },
    // 存货格式化 ps:阿威转一飞   (去除带有children的项)
    formatSotck(arr) {
      let stockArr = JSON.parse(JSON.stringify(arr));
      if (!this.parent) {
        stockArr = stockArr.filter(val => {
          return !val.children;
        });
      } //默认关闭带有children的项（根结点带有chindren，这个根结点在`parent`是false是会生效（把带有children的项过滤））
      stockArr.forEach(item => {
        item.stockId = item.id;
        item.stockSkuId = item.skuId;
        item.attributeType = item.customStockName;
        item.desc = item.remark;
        item.hasShelfLife = item.shelfLife;
        item.hasBatchNo = item.batch;
        item.hasSerialNo = item.serialNum;
        delete item.id;
        if (item.multimeasureUnit === 1) {
          item.unitList.forEach(unitItem => {
            unitItem.unitId = unitItem.id;
            unitItem.unitRatio = unitItem.exchangeRatio;
            delete unitItem.id;
            delete unitItem.exchangeRatio;
          });
        } else {
          this.$set(item, "unitList", [{unitId: item.measureUnitId, unitName: item.measureUnit, unitRatio: 1}]);
        }
        if (item.children && item.children.length) {
          this.formatSotck(item.children);
        }
      });
      return stockArr;
    },
    // 列表
    getStockList(obj = {}) {
      obj = Object.assign(obj, {
        page: this.pagination.page,
        pageSize: this.pagination.pageSize,
        stockTypeId: "000",
        status: 1,
        keyword: this.keyword,
      });
      getStockList(obj).then(res => {
        let {list, total} = res.data;
        this.tableData = list;
        this.pagination.total = total;
      });
    },
    cancel() {
      this.IsShowPage = false;
      this.$emit("cancel");
      this.reset();
    },
    save() {
      // 校验勾选项
      if (this.checkBoxData.length === 0) {
        this.$message.error("请勾选需要添加的存货");
        return false;
      }
      if (!this.parent) {
        // 开启根结点不可选， 则过滤父节点留下根节点
        let gather = []; //存放父级stockCode
        this.checkBoxData.forEach(item => {
          if (item.children && item.children.length) {
            gather.push(item.stockCode);
          }
        });
        // console.log(gather, 'gather');
        // console.log(this.checkBoxData, 'checkBoxData');
        //0时不提示
        if (gather.length === 0) {
          let arr = this.formatSotck(this.checkBoxData);
          this.$emit("save", arr);
          this.$emit("cancel");
          this.IsShowPage = false;
          this.reset();
        } else {
          this.$confirm(`勾选的存货中编号${gather.join(",")}是作为根结点的存货，不能录入，继续将过滤掉该项`, "提示", {
            confirmButtonText: "继续",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(() => {
            let arr = this.formatSotck(this.checkBoxData);
            this.$emit("save", arr);
            this.$emit("cancel");
            this.IsShowPage = false;
            this.reset();
          })
          .catch(() => {
            return false;
          });
        }
      } else {
        // 开启根结点可选
        let arr = this.formatSotck(this.checkBoxData);
        this.$emit("save", arr);
        this.$emit("cancel");
        this.IsShowPage = false;
        this.reset();
      }
      // 校验勾选项 \\
    },
    visible() {},
    reset() {
      this.keyword = "";
      this.tableData = [];
      this.checkBoxData = [];
      this.treeProps = {children: "children", hasChildren: "hasChildren"};
      this.pagination = {total: 0, pageSize: 10, page: 1};
    },
  },
};
</script>
<style lang="scss" scoped>
.table-btn-warp {
  margin-bottom: 16px;
}
</style>
```

## dialog 可拖拽移动

```vue

<script>
export default {
  // v-directives
  directives: {
    dialogDrag: {
      inserted: function (el) {
        const dialogHeaderEl = el.querySelector(".el-dialog__header");
        const dragDom = el.querySelector(".el-dialog");
        dialogHeaderEl.style.cursor = "move";
        dialogHeaderEl.onmousedown = e => {
          const disX = e["clientX"] - dialogHeaderEl.offsetLeft;
          const disY = e["clientY"] - dialogHeaderEl.offsetTop;
          document.onmousemove = function (e) {
            const l = e["clientX"] - disX;
            const t = e["clientY"] - disY;
            dragDom.style.left = `${l}px`;
            dragDom.style.top = `${t}px`;
          };
          document.onmouseup = function (e) {
            document.onmousemove = null;
            document.onmouseup = null;
          };
        };
      },
    },
  },
};
</script>
```

## Element UI 低版本使用 el-cascader 数据量大造成的卡顿[^13.2]

```vue

<template>
  <el-cascader @visible-change="visibleChange"></el-cascader>
</template>
<script>
export default {
  methods: {
    visibleChange() {
      this.$nextTick(() => {
        let $el = document.querySelectorAll(".el-cascader-panel .el-cascader-node[aria-owns]");
        Array.from($el).map(el => el.removeAttribute("aria-owns"));
      });
    },
  },
};
</script>
```

## Vite4 使用 Worker

### utils/hash.js

```js
// SHA256算法中用到的哈希初值H
self.hash = [
  0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c,
  0x1f83d9ab, 0x5be0cd19,
];
//监听前台传过来的信息
self.addEventListener(
  "message",
  function (event) {
    let uint8_array,
      message,
      block,
      nBitsTotal,
      output,
      nBitsLeft,
      nBitsTotalH,
      nBitsTotalL;
    uint8_array = new Uint8Array(event.data.message);
    message = bytesToWords(uint8_array);
    block = event.data.block;
    event = null;
    uint8_array = null;
    output = {
      block: block,
    };
    // 计算sha256摘要
    if (block.end === block.file_size) {
      nBitsTotal = block.file_size * 8;
      nBitsLeft = (block.end - block.start) * 8;
      nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
      nBitsTotalL = nBitsTotal & 0xffffffff;
      message[nBitsLeft >>> 5] |= 0x80 << (24 - (nBitsTotal % 32));
      message[(((nBitsLeft + 64) >>> 9) << 4) + 14] = nBitsTotalH;
      message[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotalL;
      self.hash = sha256(message, self.hash);
      output.result = bytesToHex(wordsToBytes(self.hash));
    } else {
      self.hash = sha256(message, self.hash);
    }
    message = null;
    self.postMessage(output);
  },
  false
);

// 在SHA256算法中，用到64个常量，这些常量是对自然数中前64个质数的立方根的小数部分取前32bit而来
var K = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1,
  0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
  0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786,
  0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
  0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
  0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b,
  0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a,
  0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
  0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
];

function sha256(m, H) {
  var w = [],
    a,
    b,
    c,
    d,
    e,
    f,
    g,
    h,
    i,
    j,
    t1,
    t2;

  for (var i = 0; i < m.length; i += 16) {
    a = H[0];
    b = H[1];
    c = H[2];
    d = H[3];
    e = H[4];
    f = H[5];
    g = H[6];
    h = H[7];

    for (var j = 0; j < 64; j++) {
      if (j < 16) w[j] = m[j + i];
      else {
        var gamma0x = w[j - 15],
          gamma1x = w[j - 2],
          gamma0 =
            ((gamma0x << 25) | (gamma0x >>> 7)) ^
            ((gamma0x << 14) | (gamma0x >>> 18)) ^
            (gamma0x >>> 3),
          gamma1 =
            ((gamma1x << 15) | (gamma1x >>> 17)) ^
            ((gamma1x << 13) | (gamma1x >>> 19)) ^
            (gamma1x >>> 10);

        w[j] = gamma0 + (w[j - 7] >>> 0) + gamma1 + (w[j - 16] >>> 0);
      }

      var ch = (e & f) ^ (~e & g),
        maj = (a & b) ^ (a & c) ^ (b & c),
        sigma0 =
          ((a << 30) | (a >>> 2)) ^
          ((a << 19) | (a >>> 13)) ^
          ((a << 10) | (a >>> 22)),
        sigma1 =
          ((e << 26) | (e >>> 6)) ^
          ((e << 21) | (e >>> 11)) ^
          ((e << 7) | (e >>> 25));

      t1 = (h >>> 0) + sigma1 + ch + K[j] + (w[j] >>> 0);
      t2 = sigma0 + maj;

      h = g;
      g = f;
      f = e;
      e = (d + t1) >>> 0;
      d = c;
      c = b;
      b = a;
      a = (t1 + t2) >>> 0;
    }

    H[0] = (H[0] + a) | 0;
    H[1] = (H[1] + b) | 0;
    H[2] = (H[2] + c) | 0;
    H[3] = (H[3] + d) | 0;
    H[4] = (H[4] + e) | 0;
    H[5] = (H[5] + f) | 0;
    H[6] = (H[6] + g) | 0;
    H[7] = (H[7] + h) | 0;
  }
  return H;
}

function bytesToWords(a) {
  for (var b = [], c = 0, d = 0; c < a.length; c++, d += 8) {
    b[d >>> 5] |= a[c] << (24 - (d % 32));
  }
  return b;
}
function wordsToBytes(a) {
  for (var b = [], c = 0; c < a.length * 32; c += 8) {
    b.push((a[c >>> 5] >>> (24 - (c % 32))) & 255);
  }
  return b;
}
function bytesToHex(a) {
  for (var b = [], c = 0; c < a.length; c++) {
    b.push((a[c] >>> 4).toString(16)), b.push((a[c] & 15).toString(16));
  }
  return b.join("");
}
```

### **.vue

```vue
<script setup>
  import WorkerLargeFileHashSha256 from '@utils/largeFileHash.js?worker'

const hashSha256 = e => {
  let files = [];
  let workerMap, worker;
  let file = e.target.files[0];
  if (!Array.isArray(file)) {
    files.push(file);
  } else {
    files = file;
  }
  // 支持上传多文件
  for (let i = 0; i < files.length; i++) {
    let currentFile = files[i];
    workerMap = [];
    // 开启多线程
    worker = new WorkerLargeFileHashSha256();
    // 监听worker消息
    worker.addEventListener("message", handleWorkerEvent(currentFile));
    workerMap.push(worker);
    //执行计算
    hashFile(currentFile, workerMap);
  }
}

const handleWorkerEvent = (item) => {
  return (event) => {
    if (event.data.result) {
      let fileDigestResult = event.data.result;
      console.log("计算结果为---------------:" + fileDigestResult);
    } else {
      console.log(
        "当前进度-----:",
        (
          (event.data.block.end * 100) /
          event.data.block.file_size
        ).toFixed(2) + "%"
      );
    }
  };
}

// 操作文件
const hashFile = (file, workers) => {
  let block, // 文件总块
    threads, //线程数量
    reader, // 读取文件类
    blob; // 当前分块
  let bufferSize = 10 * 1024; // 块大小默认 10KB
  block = {
    file_size: file.size,
    start: 0,
  };
  block.end = bufferSize > file.size ? file.size : bufferSize; // 源文件大小和块的单位大小对比 取小者
  threads = 0; // 线程数
  //
  const handleLoadBlock = (event) => {
    for (let i = 0; i < workers.length; i += 1) {
      threads += 1;
      workers[i].postMessage({
        message: event.target.result,
        block: block,
      });
    }
  };
  // 继续文件分块
  const handleHashBlock = () => {
    threads -= 1;
    if (threads === 0) {
      if (block.end !== file.size) {
        block.start += bufferSize;
        block.end += bufferSize;
        if (block.end > file.size) {
          block.end = file.size;
        }
        reader = new FileReader();
        reader.onload = handleLoadBlock;
        blob = file.slice(block.start, block.end);
        reader.readAsArrayBuffer(blob);
      }
    }
  };

  for (let i = 0; i < workers.length; i += 1) {
    workers[i].addEventListener("message", handleHashBlock);
  }
  reader = new FileReader();
  // 文件分块
  blob = file.slice(block.start, block.end);
  reader.readAsArrayBuffer(blob);
  reader.onload = handleLoadBlock;
};
  const videoChange = e => {
  hashSha256(e)
  }
</script>
<template>
      <input class="outline-none opacity-0 rounded-[50px] w-[50px] h-[50px]" type="file" @change="videoChange($event)" accept="video/*" capture="camcorder"/>
</template>
```


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
    };
  },
  methods: {
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
      if (selection && selection.length === this.list.length) {
        selection.forEach(val => {
          this.selectChange(selection, val);
        });
      } else {
        this.$refs.multiTable.clearSelection();
      }
    },
    // 选择改变
    selectionChangeHandler(val) {
      this.selections = val;
      this.unique(this.selections, "id"); //这里有一个问题就是这样点选完之后，数据有重复，所以根据id手动去重，期待优化
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
      return data["id"];
    },
    //数组去重
    unique(arr, i) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[i].id === arr[j].id) {
            arr.splice(j, 1);
            j--;
          }
        }
      }
    },
    //列表树懒加载
    getMenus(tree, treeNode, resolve) {
      const params = {pid: tree.id};
      setTimeout(() => {
        /*crudMenu.getMenus(params).then(res => {
         resolve(res.content)
         })*/
      }, 100);
    },
  },
};
</script>
```

---

```vue
<!-- 存货 弹窗 -->
<template>
  <el-dialog :title="titleName" @open="open" v-if="IsShowPage" :visible.sync="IsShowPage" :append-to-body="true" width="70%" @close="cancel" :close-on-click-modal="false" :close-on-press-escape="false">
    <div class="sc-list-body">
      <div class="table-btn-warp flex_between_center">
        <search @search="cliSearch" placeholder="请输入编码、名称" />
      </div>
      <el-table ref="multiTable" row-key="stockCode" :data="tableData" :default-expand-all="defaultExpandAll" :row-class-name="tableRowClassName" max-height="500" @select="selectChange" @select-all="selectAllChange" @selection-change="selectionChangeHandler" :tree-props="treeProps">
        <el-table-column label="序号" type="index" align="center" width="60" />
        <el-table-column type="selection" :reserve-selection="true" align="center" />
        <el-table-column label="编号" prop="stockCode" width="180">
          <template slot-scope="{row}">
            <el-button type="text">{{ row.stockCode }}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="stockName" show-overflow-tooltip width="180" />
        <el-table-column label="辅助属性" prop="customStockName" show-overflow-tooltip width="180" />
        <el-table-column label="存货类别" prop="stockTypeName" show-overflow-tooltip width="180" />
        <el-table-column label="规格型号" prop="specs" show-overflow-tooltip width="180" />
        <el-table-column label="单位" prop="measureUnit" show-overflow-tooltip align="center" width="180" />
        <el-table-column label="创建日期" prop="createTime" show-overflow-tooltip width="180" />
        <el-table-column label="创建者" prop="createUserName" show-overflow-tooltip align="center" width="180" />
        <el-table-column label="备注" prop="remark" show-overflow-tooltip width="180" />
      </el-table>
      <pagination :total="pagination.total" :page.sync="pagination.page" :limit.sync="pagination.pageSize" @pagination="getLists" />
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

<template>
  <div class="manage">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <!-- 用户的表单信息 -->
      <el-form
        ref="form"
        :rules="relus"
        :inline="true"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="form.gender" placeholder="请选择">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" prop="birth">
          <el-date-picker
            v-model="form.birth"
            type="date"
            value-format="yyyy-MM-DD"
            placeholder="请选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input placeholder="请输入地址" v-model="form.address"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="btn">
      <el-button type="primary" @click="handleAdd"> + 新增 </el-button>
      <!-- form搜索区域 -->
      <el-form :inline="true" :model="userForm">
        <el-form-item>
          <el-input placeholder="请输入名称" v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="common-tabel">
      <el-table stripe height="90%" :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="姓名"> </el-table-column>

        <el-table-column prop="gender" label="性别">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.row.gender == 1 ? "男" : "女"
            }}</span>
          </template></el-table-column
        >
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="birth" label="出生日期"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column prop="id" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="handlePage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, addUser, editUser, deleteUser } from "../api";
export default {
  name: "User",

  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        gender: "",
        birth: "",
        address: "",
      },
      relus: {
        name: [
          {
            required: true,
            message: "请输入姓名",
          },
        ],
        age: [
          {
            required: true,
            message: "请输入年龄",
          },
        ],
        gender: [
          {
            required: true,
            message: "请选择性别",
          },
        ],
        brith: [
          {
            required: true,
            message: "请选择出生日期",
          },
        ],
        address: [
          {
            required: true,
            message: "请输入地址",
          },
        ],
      },
      tableData: [],
      modelType: 0, //0表示新增的弹窗，1表示编辑的弹窗
      total: 0, //当前的总条数为0
      // 当前分页的参数
      pageData: {
        page: 1,
        limit: 10,
      },
      userForm: {
        name: "",
      },
    };
  },
  methods: {
    // 提交用户表单
    submit() {
      this.$refs.form.validate((valid) => {
        // console.log(valid);
        if (valid) {
          //当校验通过的时候，后续对表单数据的处理
          if (this.modelType === 0) {
            addUser(this.form).then(() => {
              // 重新刷新数据列表
              this.getList();
            });
          } else {
            // 获取列表的数据
            editUser(this.form).then(({}) => {
              this.getList();
            });
          }

          //关闭弹窗之前先清除表单里面的数据
          this.$refs.form.resetFields();

          // 关闭弹窗
          this.dialogVisible = false;
        }
      });
    },
    handleClose() {
      // 弹窗关闭的时候会触发
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    cancel() {
      // 点击取消按钮的时候
      this.handleClose();
    },
    // 编辑按钮
    handleEdit(row) {
      this.modelType = 1;
      this.dialogVisible = true;
      // 注意需要对当前数据进行深拷贝,否则会出现错误
      this.form = JSON.parse(JSON.stringify(row));
    },
    // 删除按钮
    handleDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteUser({ id: row.id }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 点击新增的时候modleTyoe赋值为0
    handleAdd() {
      this.modelType = 0;
      this.dialogVisible = true;
    },

    // 对获取列表的数据进行封装
    getList() {
      // 获取列表的数据
      // 利用es6合并对象的属性
      getUser({ params: { ...this.userForm, ...this.pageData } }).then(
        ({ data }) => {
          console.log(data);
          this.tableData = data.lsit;
          this.total = data.count || 0;
        }
      );
    },
    // 选择页码的回调函数
    handlePage(val) {
      // console.log("val", val);
      this.pageData.page = val;
      this.getList();
    },
    // 列表的查询
    onSubmit() {
      this.getList();
    },
  },
  mounted() {
    this.getList();
  },
};
</script>
<style lang="less" scoped>
.manage {
  height: 90%;
  .btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .common-tabel {
    height: calc(100% - 62px);
    position: relative;
    .pager {
      position: absolute;
      bottom: 0;
      right: 20px;
    }
  }
}
</style>
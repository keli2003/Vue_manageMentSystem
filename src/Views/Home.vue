<template>
  <el-row>
    <!-- 用户内容的主要部分以及购买数据列表 -->
    <el-col :span="8" style="padding-right: 10px">
      <el-card class="box-card">
        <div class="user">
          <img src="../assets/images/user.webp" alt="" />
          <div class="user-info">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2023-3-24</span></p>
          <p>上次登录地点：<span>河南</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 460px">
        <el-table :data="tableData">
          <!-- <el-table-column prop="name" label="手机品牌"> </el-table-column>
          <el-table-column prop="todayBuy" label="今日购买"> </el-table-column>
          <el-table-column prop="monthBuy" label="本月购买"> </el-table-column>
          <el-table-column prop="totalBuy" label="总购买"> </el-table-column> -->

          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          />
        </el-table>
      </el-card>
    </el-col>
    <!-- 用户支付与收藏和未支付的展示部分 -->
    <el-col :span="16" style="padding-left: 10px">
      <div class="num">
        <el-card
          v-for="items in countData"
          :key="items.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="'el-icon-' + items.icon"
            :style="{ background: items.color }"
          ></i>
          <div class="detail">
            <p class="price">￥{{ items.value }}</p>
            <p class="desc">{{ items.name }}</p>
          </div>
        </el-card>
      </div>
    </el-col>
    <!-- 折线图部分 -->
    <el-card style="height: 280px">
      <div ref="echarts1" style="height: 280px"></div>
    </el-card>
    <!-- 条形图和饼状图部分 -->
    <div class="graph">
      <el-card style="height: 260px">
        <div ref="echarts2" style="height: 260px"></div>
      </el-card>
      <el-card style="height: 260px">
        <div ref="echarts3" style="height: 240px"></div>
      </el-card>
    </div>
  </el-row>
</template>

<script>
import { getData } from "../api/index";
import * as echarts from "echarts";
export default {
  name: "Home",
  data() {
    return {
      tableData: [],
      // 代码优化，通过对象的方式存储数据，需要的时候进行遍历
      tableLabel: {
        name: "手机品牌",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 1234,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#52adf3",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#52adf3",
        },
      ],
    };
  },
  mounted() {
    getData().then(({ data }) => {
      // console.log(data);
      const { tabelData } = data.data;
      // console.log(tabelData);
      this.tableData = tabelData;

      // 基于准备好的DOM，创建echarts实例对象

      // 获取到当前节点
      // console.log(this.$refs.echarts1);
      const echarts1 = echarts.init(this.$refs.echarts1);

      // 指定图标的配置项和数据
      var echarts1Option = {};
      // 处理数据xAixs
      const { orderData, userData, videoData } = data.data;
      // 返回对象的一个枚举
      const xAxis = Object.keys(orderData.data[0]);
      const xAxisData = {
        data: xAxis,
      };
      //利用echarts定义x轴
      echarts1Option.xAxis = xAxisData;
      // 利用echarts定义y轴
      echarts1Option.yAxis = {};
      echarts1Option.legend = xAxisData;
      echarts1Option.series = [];
      xAxis.forEach((key) => {
        echarts1Option.series.push({
          name: key,
          data: orderData.data.map((item) => item[key]),
          type: "line",
        });
      });
      console.log(echarts1Option);
      // 使用配置的配置项和数据显示列表
      echarts1.setOption(echarts1Option);

      // 柱状图

      const echarts2 = echarts.init(this.$refs.echarts2);

      const echarts2Option = {
        legend: {
          // 图例文字颜色
          testStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        //提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", //类目轴
          data: userData.map((item) => item.date),
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de"],
        series: [
          {
            name: "新增用户",
            data: userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: userData.map((item) => item.active),
            type: "bar",
          },
        ],
      };
      echarts2.setOption(echarts2Option);

      // 饼状图

      const echarts3 = echarts.init(this.$refs.echarts3);
      const echarts3Option = {
        tooltip: {
          trigger: "item ",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [
          {
            data: videoData,
            type: "pie",
          },
        ],
      };
      echarts3.setOption(echarts3Option);
    });
  },
};
</script>

<style lang="less" scoped>
.user {
  display: flex;
  // justify-content: space-around;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-right: 40px;
  }
  .user-info {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      color: #999;
    }
  }
}

.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999;
    span {
      margin-left: 60px;
      color: #666;
    }
  }
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
  .icon {
    display: flex;
    display: inline-block;
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;
    align-items: center;
    // justify-content: space-around;
  }
  .detail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;
    height: 80px;
    line-height: 28px;
    p {
      margin: 0;
    }
    .price {
      font-size: 30px;
      margin-bottom: 10px;
    }
    .desc {
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }
}
.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 48%;
  }
}
</style>
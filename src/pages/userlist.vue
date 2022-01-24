<template>
  <Skeleton :row="6" :loading="state.loading" avatar>
    <div class="user-list">
      <div class="list-item" v-for="(v, idx) in meterList" :key="idx">
        <div class="each-item">
          <span>户号：</span>
          <span>{{ v.meterName }}</span>
        </div>
        <div class="each-item">
          <span>户名：</span>
          <span>{{ v.meterNumber }}</span>
        </div>
        <div class="each-item">
          <span>地址：</span>
          <span>{{ v.meterAddress }}</span>
        </div>
        <div class="each-btn">
          <Button type="success" size="small" @click="checkStatus(v)">下一步</Button>
        </div>
      </div>
    </div>
  </Skeleton>
</template>

<script setup>
import { Button, Skeleton, Toast } from "vant";
import { reactive, toRefs, onMounted } from "vue";
import request from "@/api/request";
import { GETMETERLIST, ISCONDITON } from "@/api/ApiConfig";
import { useRouter, useRoute } from "vue-router";

const state = reactive({
  loading: false,
  meterList: [],
});
const router = useRouter();
const route = useRoute();
let { meterList } = toRefs(state);

onMounted(() => {
  // let k = localStorage.getItem("m");
  // if (k) {
  //   state.meterList = JSON.parse(k);
  // } else {
    getMeterList();
  // }
});

/**
 * 获取户号列表
 */
const getMeterList = () => {
  state.loading = true;
  request({
    url: GETMETERLIST,
    method: "post",
    params: {},
  }).then((res) => {
    if (!res.status) {
      state.loading = false;
      state.meterList = res.data;
      localStorage.setItem("m", JSON.stringify(res.data));
    }
  });
};

/**
 * 检查用户状态
 */
const checkStatus = (v) => {
  request({
    url: ISCONDITON,
    method: "get",
    params: {
      cardNo: v.meterNumber,
    },
  }).then((res) => {
    let { message, data } = res;
    let url = route.fullPath;
    if(data === 'true') {
      localStorage.setItem("p", JSON.stringify(v));
      router.push(url.replace('user', 'form'));
    } else {
      Toast(message);
    }
  });
};
</script>

<style lang="scss">
.user-list {
  padding: 20px;
  min-height: calc(100vh - 40px);
  background: #f4f4f4;
  .list-item {
    background: #ffffff;
    border-radius: 26px;
    padding: 30px;
    margin-bottom: 20px;
    .each-item {
      padding-bottom: 30px;
      span:first-child {
        font-size: 30px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
      }
      span:last-child {
        font-size: 30px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #878787;
      }
    }
    .each-btn {
      float: right;
    }
    &:after {
      clear: both;
      content: "";
      display: block;
    }
  }
}
</style>

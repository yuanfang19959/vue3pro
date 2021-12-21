<script setup>
import { Button } from "vant";
</script>

<template>
  <div class="user-list">
    <div class="list-item">
      <div class="each-item">
        <span>户号：</span>
        <span>123456789</span>
      </div>
      <div class="each-item">
        <span>户名：</span>
        <span>321321321</span>
      </div>
      <div class="each-item">
        <span>地址：</span>
        <span>杭州市三川国德</span>
      </div>
      <div class="each-btn">
        <Button type="success">下一步</Button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.user-list {
  padding: 20px;
  min-height: calc(100vh - 40px);
  background: #f4f4f4;
  .list-item {
    background: #ffffff;
    border-radius: 26px;
    padding: 30px;
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

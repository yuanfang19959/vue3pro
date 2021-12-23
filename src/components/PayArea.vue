<script setup>
import { reactive, toRefs } from "vue";
import { Col, Row, Field } from "vant";

defineProps({
  msg: String,
});

const state = reactive({
  money: 0,
  nowIndex: 0,
  list: [10, 15, 20, 25, 50, 100],
});
let { money, list, nowIndex } = toRefs(state);
</script>

<template>
  <div class="money-input">
    <div>选择缴费金额</div>
    <Row>
      <Col span="24">
        <Field
          v-model="money"
          name="money"
          type="number"
          placeholder="输入缴费金额"
          :rules="[{ required: true, message: '请填写用户名' }]"
        >
          <template #button>
            <div class="btn">立即缴费</div>
          </template>
        </Field>
      </Col>
    </Row>
  </div>

  <div class="money-box">
    <Row gutter="10">
      <Col
        span="8"
        v-for="(r, idx) in list"
        :key="idx"
        @click="
          nowIndex = idx;
          money = r;
        "
      >
        <div :class="[nowIndex === idx ? 'money-select' : 'money-select active']">
          {{ r }}元
        </div>
      </Col>
    </Row>
  </div>
</template>

<style lang="scss" scoped>
.money-input {
  padding: 20px;
  .btn {
      color:rgb(25, 137, 250);
  }
}
.money-box {
  padding: 0 20px;
  .money-select {
    transition: all ease;
    margin-bottom: 20px;
    padding: 49px 0;
    text-align: center;
    font-size: 44px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    background: linear-gradient(138deg, rgba(0, 174, 126, 0.45) 0%, #00ae7e 100%);
    border-radius: 8px;
  }
  .active {
    background: #d8d8d8;
    color: #333333;
  }
}
</style>

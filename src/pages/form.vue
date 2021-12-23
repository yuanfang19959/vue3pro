<template>
  <!-- <div class="form">
    <Form>
      <Field
        v-model="detailJson.username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
    </Form>
  </div>

  <div class="upload">
    <Uploader></Uploader>
  </div> -->

  <div class="form-bottom">
    <!-- <Form>
      <Field
        v-model="detailJson.username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
    </Form> -->
    <PayArea/>
  </div>

  <div class="bottom-btn">
    <Button type="primary" size="large" round >提交</Button>
  </div>
</template>

<script setup>
import {
  RadioGroup,
  Radio,
  Field,
  Form,
  Uploader,
  Button,
  Dialog,
  Popup,
  Calendar,
  Picker,
  Toast,
} from "vant";
import PayArea from '@/components/PayArea.vue'
import { reactive } from "vue";

const state = reactive({
  detailJson: {
    username: 123,
  },
});

let { detailJson } = state;
</script>

<style lang="scss" scoped>
.bottom-btn {
  position: fixed;
  bottom: 0;
  width: calc(100% - 30px);
  padding:15px;
}
</style>

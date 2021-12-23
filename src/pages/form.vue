<template>
  <div class="form">
    3213123
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
import { reactive } from "vue";

const state = reactive({
  detailJson: {
    username: 123,
  },
});

let { detailJson } = state;
</script>

<style lang="scss"></style>

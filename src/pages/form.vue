<template>
  <div class="form">
    <Form @submit="onSubmit">
      <Field
        v-model="cardno"
        is-link
        required
        readonly
        name="picker"
        label="户号"
        placeholder="点击选择户号"
        @click="showPicker = true"
        :rules="[{ required: true, message: '点击选择户号' }]"
      />

      <Popup v-model:show="showPicker" position="bottom">
        <Picker :columns="columns" @confirm="onConfirms" @cancel="showPicker = false" />
      </Popup>

      <Field
        v-model="detailJson.username"
        name="上期行至"
        label="上期行至"
        placeholder="上期行至"
        :rules="[{ required: true, message: '请填写上期行至' }]"
      />

      <Field
        v-model="result"
        is-link
        readonly
        name="calendar"
        label="上期抄表日"
        placeholder="点击选择上期抄表日"
        @click="showCalendar = true"
        :rules="[{ required: true, message: '点击选择户号' }]"
      />

      <Field
        v-model="result"
        is-link
        readonly
        name="calendar"
        label="本期抄表日"
        placeholder="点击选择本期抄表日"
        :rules="[{ required: true, message: '点击选择户号' }]"
        @click="showCalendar = true"
      />

      <Field
        v-model="detailJson.username"
        name="本期行至"
        label="本期行至"
        placeholder="本期行至"
        :rules="[{ required: true, message: '请填写本期行至' }]"
      />


      <Field name="uploader" label="水表读数照片">
        <template #input>
          <Uploader></Uploader>
        </template>
      </Field>
      <div class="btn" @click="shows = true">?自报示例</div>

      <Field
        v-model="detailJson.username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />

      <Field
        v-model="detailJson.username"
        name="预计水费"
        label="预计水费"
        placeholder="预计水费"
        :rules="[{ required: true, message: '请填写预计水费' }]"
      />
      <Calendar v-model:show="showCalendar" @confirm="onConfirm" color="#1989fa" />
      <div class="bottom-btn">
        <Button type="primary" size="large" round native-type="submit">提交</Button>
      </div>
    </Form>
    <PayArea />
    
    <VanDialog :show="shows" title="示例" @confirm="shows = false">
      <img class="shuibiao" :src="example" />
    </VanDialog>
  </div>
</template>

<script setup>
import example from '@/assets/example.png';
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
import PayArea from "@/components/PayArea.vue";
import { reactive, ref, toRefs } from "vue";

const VanDialog = Dialog.Component;
const state = reactive({
  detailJson: {
    username: "",
    value: "",
    showCalendar: false,
  },
});

let { detailJson } = toRefs(state);
const result = ref("");
const showCalendar = ref(false);
const cardno = ref("");
const showPicker = ref(false);
const shows = ref(false);
const columns = [10000, 10002, 10003];

/**
 * 日期选择确认
 */
const onConfirm = (date) => {
  result.value = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  showCalendar.value = false;
  console.log(result.value);
};

/**
 * 户号选择确认
 */
const onConfirms = (value) => {
  cardno.value = value;
  showPicker.value = false;
};

/**
 * 表单提交
 */
const onSubmit = (values) => {
  console.log("submit", values);
};
</script>

<style lang="scss" scoped>
.form {
  padding-bottom: 140px;
  :deep(.van-field) {
    padding-left: 10px;
  }
  .btn {
    font-size: 28px;
    color: rgb(25, 137, 250);
    text-align: right;
    position: relative;
    right: 52px;
    bottom: 35px;
  }

  .bottom-btn {
    position: fixed;
    bottom: 0;
    width: calc(100% - 30px);
    padding: 15px;
    padding-bottom: 50px;
  }
  .shuibiao {
    width: 100%;
    height: 65vh;
  }
}
</style>

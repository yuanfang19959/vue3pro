<template>
  <div class="form">
    <Form @submit="onSubmit">
      <Field
        v-model="detailJson[f.paramsName]"
        :is-link="f.type === 'text' ? false : true"
        v-for="(f, idx) in paramsList"
        v-show="f.type != 'photo'"
        :key="idx"
        :required="f.required"
        :readonly="f.isread"
        :name="f.paramsName"
        :label="f.leftText"
        @click="showDiff(f)"
        :rules="[{ required: f.required, message: `请填写${f.leftText}` }]"
      />

      <Field name="uploader" label="水表读数照片">
        <template #input>
          <Uploader></Uploader>
        </template>
      </Field>
      <div class="btn" @click="shows = true">?自报示例</div>

      <div class="bottom-btn">
        <Button type="primary" size="large" round native-type="submit">提交</Button>
      </div>
    </Form>

    <!-- 支付区域start -->
    <PayArea />
    <!-- 支付区域end -->

    <!-- 户号下拉start -->
    <Popup v-model:show="showPicker" position="bottom">
      <Picker :columns="columns" @confirm="onConfirms" @cancel="showPicker = false" />
    </Popup>
    <!-- 户号下拉end -->

    <!-- 日期选择start -->
    <Calendar v-model:show="showCalendar" @confirm="onConfirm" color="#1989fa" />
    <!-- 日期选择end -->

    <!-- 示例弹窗start -->
    <VanDialog :show="shows" title="示例" @confirm="shows = false">
      <img class="shuibiao" :src="example" />
    </VanDialog>
    <!-- 示例弹窗end -->

    <div class="tips" v-if="state.obj.isjtyh == 1">
      *阶梯用户预计费不含阶梯费用，当前费用仅参考
    </div>
  </div>
</template>

<script setup>
import example from "@/assets/example.png";
import {
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
import request from "@/api/request";
import { reactive, ref, toRefs, onMounted } from "vue";
import { GETFORMINFO, GETPRICE } from "@/api/ApiConfig";
import { useRouter, useRoute } from "vue-router";

const VanDialog = Dialog.Component;
const state = reactive({
  detailJson: {},
  paramsList: [],
  obj: {},
});
let { detailJson, paramsList } = toRefs(state);
const showCalendar = ref(false);
const cardno = ref("");
const showPicker = ref(false);
const shows = ref(false);
const noShow = ref(false);
const columns = [10000, 10002, 10003];
const route = useRoute();

onMounted(() => {
  let p = localStorage.getItem("p");
  if (p) {
    state.obj = JSON.parse(p);
  }
  if (route.query.type == 1) {
    noShow.value = true;
    state.detailJson = {
      ...state.obj,
      cardno: state.obj.meterName,
    }
  }
  getFormData();
  getPrice();
});

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

/**
 * 获取表单渲染数据
 */
const getFormData = () => {
  let obj = {
    moduleId: 33,
    waterCorpId: 3,
    moduleName: "随机抄见",
    systemcode: "GD",
    flowcode: "randomautmeteraing",
  };
  request({
    method: "POST",
    url: GETFORMINFO,
    // params: {
    //   moduleId: 32,
    //   waterCorpId: 3,
    //   moduleName: "定期抄见",
    //   systemcode: "GD",
    //   flowcode: "autmeteraing",
    // },
    params:obj
  }).then((res) => {
    if (!res.status) {
      state.paramsList = res.data.moduleData.paramsList;
    }
  });
};

/**
 * 根据不同的点击显示不同的内容
 * @param {Object} v 数组传来的对象
 */
const showDiff = (v) => {
  if (v.type === "date") {
    showCalendar.value = true;
  } else if (v.paramsName === "cardno" && !noShow.value) {
    showPicker.value = true;
  }
};


const getPrice = () => {
  let { obj } = state
  request({
    method: "POST",
    url: GETPRICE,
    params: {
      // userStatus: obj.userStatus,
      // unitprice: obj.unitprice,
      // thisTo: obj.thisTo,
      // nextTo: obj.nextTo,
      // oldto: obj.oldto,
      // newto: obj.newto
      "userStatus":"04","unitprice":"1.2","thisTo":"123.3","nextTo":"132.7","oldto":"120","newto":"126"
    },
  }).then((res) => {
    if (!res.status) {
      state.detailJson.waternum = res.data.waterNumber;
      state.detailJson.estimatemoney = res.data.waterFee
    }
  });
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
.tips {
  padding: 20px;
  font-size: 24px;
  color: red;
}
</style>

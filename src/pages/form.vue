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
        :rules="[
          {
            required: f.required,
            message: `请填写${f.leftText}`,
            validator: special,
            paramsName: f.paramsName,
          },
        ]"
        @update:model-value="getPrice(f.paramsName)"
        :maxlength="f.paramsName === 'meterno' ? 4 : 30"
      />
      <Field name="uploader" label="水表读数照片">
        <template #input>
          <Uploader
            accept="image/*"
            :after-read="afterRead"
            v-model="fileList"
            :max-count="1"
            @delete="deletePicture"
          ></Uploader>
        </template>
      </Field>
      <div class="btn" @click="shows = true">?自报示例</div>

      <div class="bottom-btn">
        <Button type="primary" size="large" round native-type="submit">提交</Button>
      </div>
    </Form>

    <!-- 支付区域start -->
    <PayArea :arrearmoney="detailJson.arrearmoney" :obj="obj" />
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
  Notify,
} from "vant";
import PayArea from "@/components/PayArea.vue";
import request from "@/api/request";
import { ajaxForm } from "@/api/ajaxForm";
import { reactive, ref, toRefs, onMounted } from "vue";
import { GETFORMINFO, GETPRICE, CREATE } from "@/api/ApiConfig";
import { useRouter, useRoute, } from "vue-router";
import moment from "moment";

const VanDialog = Dialog.Component;
const state = reactive({
  detailJson: {
    arrearmoney: 0,
  },
  paramsList: [],
  obj: {},
  fileList: [],
  attachList: [],
});
let { detailJson, paramsList, obj, fileList } = toRefs(state);
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
      cardno: state.obj.meterNumber,
      lastreaddate: state.obj.nextreaddate,
      nexttosq: state.obj.nextto,
      nextreaddate: moment().format("yyyy-MM-DD"),
    };
  }
  getFormData();
});

/**
 * 删除照片
 */
const deletePicture = () =>{
  state.attachList = []
}
/**
 * 读取上传内容
 */
const afterRead = ({ content }) => {
  state.attachList = [
    {
      filetype: "sbdschj",
      files: [
        {
          filesuffix: "png",
          filecontent: content.replace("data:image/png;base64,", ""),
          fileid: "",
        },
      ],
    },
  ];
};

const special = (val, rule) => {
  if (rule.paramsName === "meterno") {
    if (!state.obj.bsh.includes(val)) {
      return "输入表身号后4位与实际档案不一致，请核实或咨询968936";
    }
  } else if (rule.paramsName === "nextto") {
    if (Number(val) < Number(state.detailJson.nexttosq)) {
      return "本期小于上期读数，请确认是否正确";
    }
  } else {
    return true;
  }
};

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
  let { detailJson, attachList } = state;
  if(!attachList.length) {
    Toast("请上传水表读数照片")
    return;
  }
  let kkp = {
    type: route.query.moduleId,
    title: route.query.moduleName,
    flowcode: route.query.flowcode,
  };

  ajaxForm({
    url: CREATE,
    base: "",
    type: "POST",
    params: {
      ...kkp,
      detailJson: JSON.stringify(detailJson),
      attachList,
      subType:"",
      columnname:"photoFile",
    },
    successFn: (res) => {
      let { message } = res;
        Toast(message)
      if(!res.status) {
      } else {
      }
    },
  });
};

/**
 * 获取表单渲染数据
 */
const getFormData = () => {
  let obj = {
    moduleId: 33,
    moduleName: "随机抄见",
    systemcode: "GD",
    flowcode: "randomautmeteraing",
  };
  document.title = obj.moduleName;
  request({
    method: "POST",
    url: GETFORMINFO,
    // params: {
    //   moduleId: 32,
    //   moduleName: "定期抄见",
    //   systemcode: "GD",
    //   flowcode: "autmeteraing",
    // },
    params: obj,
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

const getPrice = (paramsName) => {
  if (paramsName != "nextto") return;
  let { obj, detailJson } = state;
  request({
    method: "POST",
    url: GETPRICE,
    params: {
      userStatus: obj.cardstatus,
      unitprice: obj.unitprice,
      thisTo: obj.nextto,
      nextTo: detailJson.nextto,
      oldto: obj.oldto,
      newto: obj.newto,
      arrearage: obj.arrearage,
    },
  })
    .then((res) => {
      if (!res.status) {
        setPrice(res.data);
      } else {
        let { status, message } = res;
        Notify({ type: !status ? "success" : "danger", message, duration: 500 });
        setPrice();
      }
    })
    .catch((error) => {
      setPrice();
    });
};

/**
 * 设置价格
 * @param {Object} data
 * 不传data默认设置对应字段为0
 */
const setPrice = (data = { waterNumber: 0, waterFee: 0, feeSum: 0 }) => {
  let { waterNumber, waterFee, feeSum } = data;
  let obj = {
    waternum: waterNumber,
    estimatemoney: waterFee,
    arrearmoney: feeSum,
  };
  Object.assign(state.detailJson, obj);
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
    z-index: 999;
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

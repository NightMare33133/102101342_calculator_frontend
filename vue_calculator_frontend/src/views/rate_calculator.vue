<template>
  <div class="rate_calculator">

    <table style="margin: 0px auto;width: 140px;border-right: 1px solid #000000;
        border-bottom: 1px solid #000000;
        text-align: center;">
      <caption style="font-size: 22px;">存款利率表</caption>
      <tr style="border-left: 1px solid #000000;
        border-top: 1px solid #000000;" v-for="msg in rate_msg">
        <td style="border-left: 1px solid #000000;
        border-top: 1px solid #000000;" v-if="msg.type">{{msg.time}}</td>
        <td style="border-left: 1px solid #000000;
        border-top: 1px solid #000000;" v-if="msg.type">{{msg.rate}}</td>
      </tr>
    </table>
      <caption style="font-size: 20px;">存款利息计算器</caption>
      <tr>
        <td>整存整取定期存款：</td><td>存款金额</td><td><input type="text" id="Deposit_amount"></td>
        <td>存款时长</td>
        <select style="width: 150px;" id="Deposit_time">
          <option>三个月</option>
          <option>半年</option>
          <option>一年</option>
          <option>三年</option>
          <option>五年</option>
        </select>
        <td>
          <button @click="get_deposit_interest">获取存款利息结果</button>
        </td>
      </tr>
      <tr>
        <td>活期存款：</td><td>存款金额</td><td><input type="text" id="Deposit_amount1"></td>
        <td>存款时长</td><input type="text" style="width: 30px;" id="Deposit_time1">年(填入阿拉伯数字)
        <td>
          <button @click="get_deposit_interest1">获取存款利息结果</button>
        </td>
      </tr>
    <table>
      <tr>
        <td>整存整取定期存款利息:</td><td>{{deposit_interest}}</td>
      </tr>
    </table>
    <table>
      <tr>
        <td>活期存款利息:</td><td>{{deposit_interest1}}</td>
      </tr>
    </table>

    <table style="margin: 0px auto;width: 140px;border-right: 1px solid #000000;
        border-bottom: 1px solid #000000;
        text-align: center;">
      <caption style="font-size: 22px;">贷款利率表</caption>
      <tr style="border-left: 1px solid #000000;
        border-top: 1px solid #000000;" v-for="msg in rate_msg">
        <td style="border-left: 1px solid #000000;
        border-top: 1px solid #000000;" v-if="!msg.type">{{msg.time}}</td>
        <td style="border-left: 1px solid #000000;
        border-top: 1px solid #000000;" v-if="!msg.type">{{msg.rate}}</td>
      </tr>
    </table>
    <table style="margin: 0px auto;">
      <caption style="font-size: 20px;">贷款利息计算器</caption>
      <tr>
        <td>贷款金额</td><td><input type="text" id="Loan_amount"></td>
        <td>贷款时长</td>
        <input type="text" style="width: 30px;" id="Loan_time">年(填入阿拉伯数字)
        <td>
          <button @click="get_loan_interest">获取贷款利息结果</button>
        </td>
      </tr>
      <tr>
        <td>贷款利息:</td><td>{{loan_interest}}</td>
      </tr>
    </table>

    <table style="margin: 0px auto;">
      <caption style="font-size: 20px;width: 200px" >存贷款利率修改</caption>
      <tr>
        <td>
          存/贷款
            <select id="change_type" style="width: 60px;">
              <option>贷款</option>
              <option>存款</option>
            </select>
        </td>
      </tr>
      <tr>
        <td>
          存/贷款时长
          <select id="change_time" style="width: 90px;">
            <option>活期存款</option>
            <option>三个月</option>
            <option>半年</option>
            <option>六个月</option>
            <option>一年</option>
            <option>一至三年</option>
            <option>三年</option>
            <option>三至五年</option>
            <option>五年</option>
          </select>
        </td>
      </tr>
      <tr>
        <td>修改后利率
          <input type="text" style="width: 50px" id="change_rate">
        </td>
      </tr>
      <tr>
        <td>
          <button @click="change_rate" >修改</button>
        </td>
      </tr>
    </table>

  </div>
</template>

<style>
body{



  .rate_calculator table{
    border:10px;
  }
}

</style>

<script setup>
import {ref,onMounted} from "vue"
var rate_msg = ref([]);
var deposit_interest = ref("0");
var deposit_interest1 = ref("0");
var loan_interest = ref("0");


const get_deposit_interest= () => {
  let amount = document.getElementById('Deposit_amount');
  let time = document.getElementById('Deposit_time');
  let vl = {
    amount:amount.value,
    time:time.value
  };
  console.log(vl);
  fetch('http://127.0.0.1:5000/get_deposit_interest', {
    method: 'POST',
    body: JSON.stringify(vl),
    headers: {'Content-Type': 'application/json'},
  }).then((response) =>{
    return response.json();
  }).then((data) => {
    console.log(data);
    deposit_interest.value = data.result;
  });
}
const get_deposit_interest1= () => {
  let amount = document.getElementById('Deposit_amount1');
  let time = document.getElementById('Deposit_time1');
  let vl = {
    amount:amount.value,
    time:time.value
  };
  console.log(vl);
  fetch('http://127.0.0.1:5000/get_deposit_interest1', {
    method: 'POST',
    body: JSON.stringify(vl),
    headers: {'Content-Type': 'application/json'},
  }).then((response) =>{
    return response.json();
  }).then((data) => {
    console.log(data);
    deposit_interest1.value = data.result;
  });
}

const get_loan_interest= () => {
  let amount = document.getElementById('Loan_amount');
  let time = document.getElementById('Loan_time');
  let vl = {
    amount:amount.value,
    time:time.value
  };
  console.log(vl);
  fetch('http://127.0.0.1:5000/get_loan_interest', {
    method: 'POST',
    body: JSON.stringify(vl),
    headers: {'Content-Type': 'application/json'},
  }).then((response) =>{
    return response.json();
  }).then((data) => {
    console.log(data);
    loan_interest.value = data.result;
  });
}

const change_rate= () => {
  let rate = document.getElementById('change_rate');
  let time = document.getElementById('change_time');
  let type = document.getElementById('change_type');
  let vl = {
    rate:rate.value,
    time:time.value,
    type:type.value
  };
  console.log(vl);
  fetch('http://127.0.0.1:5000/change_rate', {
    method: 'PUT',
    body: JSON.stringify(vl),
    headers: {'Content-Type': 'application/json'},
  }).then((response) =>{
    return response.json();
  }).then((data) => {
    console.log(data);
    fetchData();
  });
}

const fetchData = () => {
  fetch('http://127.0.0.1:5000/get_rate_msg').then(res => {
    return res.json();
  }).then((data)=>{
    console.log(data);
    rate_msg.value = data


  });
}
onMounted(() => {
  fetchData();
});
</script>
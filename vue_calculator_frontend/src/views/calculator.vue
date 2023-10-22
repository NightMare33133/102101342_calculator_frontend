

<script setup>
import {  RouterView } from 'vue-router'
import {ref,onMounted} from "vue"
var equation = ref("");
var display_equation = ref("");
var equation2 = ref([]);


const append = (character,dis_character) => {
  if(equation.value == "" && display_equation.value != ""){
    display_equation.value = "";
  }

  display_equation.value = display_equation.value + dis_character;
  equation.value = equation.value + character;
}
const clear = () => {
  equation.value = "";
  display_equation.value = "";
}
const back = () => {
  let char = equation.value.slice(-1);
  console.log(char);
  let Arr = ["n","s","0",'g','i','t','*'];
  for (let i in Arr)
  {
    if(char == Arr[i])
    {
      switch (char){
        case 'n':
          equation.value = equation.value.split("").slice(0, -3).join("");
          display_equation.value = display_equation.value.split("").slice(0, -3).join("");
          return;
        case 's':
          equation.value = equation.value.split("").slice(0, -3).join("");
          display_equation.value = display_equation.value.split("").slice(0, -3).join("");
          return;
        case '0':
          let t = equation.value.slice(-5);
          if(t == 'log10'){
            equation.value = equation.value.split("").slice(0, -5).join("");
            display_equation.value = display_equation.value.split("").slice(0, -5).join("");
            return;
          }
          else break;
        case 'g':
          equation.value = equation.value.split("").slice(0, -3).join("");
          display_equation.value = display_equation.value.split("").slice(0, -2).join("");
          return
        case 'i':
          equation.value = equation.value.split("").slice(0, -2).join("");
          display_equation.value = display_equation.value.split("").slice(0, -1).join("");
          return;
        case 't':
          equation.value = equation.value.split("").slice(0, -4).join("");
          display_equation.value = display_equation.value.split("").slice(0, -4).join("");
          return;
        case '*':
          let t1 = equation.value.slice(-2);
          if(t1=="**"){
            equation.value = equation.value.split("").slice(0, -2).join("");
            display_equation.value = display_equation.value.split("").slice(0, -1).join("");
            return;
          }
          else break;

      }
    }
  }
  equation.value = equation.value.split("").slice(0, -1).join("");
  display_equation.value = display_equation.value.split("").slice(0, -1).join("");
}

const calculate= () => {
  let vl = {
    result:equation.value,
    dis_result:display_equation.value
  };
  fetch('http://127.0.0.1:5000/calculate', {
    method: 'POST',
    body: JSON.stringify(vl),
    headers: {'Content-Type': 'application/json'},
  }).then((response) =>{
    return response.json();
  }).then((data) => {
    console.log(data);
    equation.value = '';
    display_equation.value = data.result
    fetchData();
  });
}
const Ans = () => {
  fetch('http://127.0.0.1:5000/Ans').then(res => {
    return res.json();
  }).then((data)=>{
    console.log(data);
    display_equation.value = display_equation.value + data.result;
    equation.value = equation.value + data.result;
  });
}
const fetchData = () => {
  fetch('http://127.0.0.1:5000/history').then(res => {
    return res.json();
  }).then((data)=>{
    console.log(data);
    equation2.value = data;
    console.log(equation2)
  });
}

onMounted(() => {
  fetchData();
});

</script>


<template>
  <table>
    <tr>
      <td>
        <div class="calculator">
          <div class="result" style="grid-area: result">
            {{ display_equation }}
          </div>

          <button style="grid-area: clear" @click="clear">C</button>
          <button style="grid-area: percent" @click="append('%','%')">%</button>
          <button style="grid-area: back" @click="back">←</button>
          <button style="grid-area: add" @click="append('+','+')">+</button>
          <button style="grid-area: subtract" @click="append('-','-')">-</button>
          <button style="grid-area: multiply" @click="append('*','×')">×</button>
          <button style="grid-area: divide" @click="append('/','÷')">÷</button>
          <button style="grid-area: equal" @click="calculate">=</button>
          <button style="grid-area: sin" @click="append('sin','sin')">sin</button>
          <button style="grid-area: cos" @click="append('cos','cos')">cos</button>
          <button style="grid-area: tan" @click="append('tan','tan')">tan</button>
          <button style="grid-area: Left_bracket" @click="append('(','(')">(</button>
          <button style="grid-area: Right_bracket" @click="append(')',')')">)</button>
          <button style="grid-area: Log10" @click="append('log10','log10')">log10</button>
          <button style="grid-area: Ans" @click="Ans">Ans</button>
          <button style="grid-area: π" @click="append('pi','π')">π</button>
          <button style="grid-area: √" @click="append('sqrt','sqrt')">√</button>
          <button style="grid-area: pow" @click="append('**','^')">^</button>


          <button style="grid-area: number-1" @click="append(1,1)">1</button>
          <button style="grid-area: number-2" @click="append(2,2)">2</button>
          <button style="grid-area: number-3" @click="append(3,3)">3</button>
          <button style="grid-area: number-4" @click="append(4,4)">4</button>
          <button style="grid-area: number-5" @click="append(5,5)">5</button>
          <button style="grid-area: number-6" @click="append(6,6)">6</button>
          <button style="grid-area: number-7" @click="append(7,7)">7</button>
          <button style="grid-area: number-8" @click="append(8,8)">8</button>
          <button style="grid-area: number-9" @click="append(9,9)">9</button>
          <button style="grid-area: number-0" @click="append(0,0)">0</button>

          <button style="grid-area: dot" @click="append('.','.')">.</button>
        </div>
      </td>
      <td>
        <div class="history" style=" border-radius: 20px;background-color: #eee;width: 450px;
        opacity:0.8;padding: 24px;
        background-image: linear-gradient(to top, #fad0c4 0%, #fad0c4 1%, #ffd1ff 100%);">
          历史记录：<br>
          <label v-for="msg in equation2">
            <span> {{ msg.result }}</span><br>
          </label>
        </div>
      </td>
    </tr>
  </table>
  <footer>
    <hr style="width: 80%;
    margin: 10px auto;
    height: 1px;
    background-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      cyan,
      rgba(0, 0, 0, 0)
    );"/>
  </footer>
  <table style="margin: 0px auto;">

    <tr>
      <td>
        <img  src="@/assets/银狼.png" width="125" height="125"/>
      </td>
    </tr>
  </table>
  <h5 align="center">我来填充底部</h5>
  <RouterView />
</template>

<style >
body{
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background-color: #eee;
  /*background-image: linear-gradient(to top, #fad0c4 0%, #fad0c4 1%, #ffd1ff 100%);*/
  /*    background-color: #DCD9D4;*/
  /*    background-image: linear-gradient(to bottom, rgba(255,255,255,0.50) 0%, rgba(0,0,0,0.50) 100%),*/
  /*radial-gradient(at 50% 0%, rgba(255,255,255,0.10) 0%, rgba(0,0,0,0.50) 50%); background-blend-mode: soft-light,screen;*/
  /*}*/
  background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
  .calculator {
    --button-width: 80px;
    --button-height: 80px;

    display: grid;
    grid-template-areas: "result result result result result"
    "π √ pow clear back"
    "sin Left_bracket Right_bracket percent divide"
    "cos number-7 number-8 number-9 multiply "
    "tan number-4 number-5 number-6 subtract"
    "Log10 number-1 number-2 number-3 add"
    "Ans number-0 number-0 dot equal";
    grid-template-columns: repeat(5, var(--button-width));
    grid-template-rows: repeat(7, var(--button-height));
  //background:#7AD2FF;
    box-shadow: -8px -8px 16px -10px rgba(255, 255, 255, 1),
    8px 8px 16px -10px rgba(0, 0, 0, .15);
    /*
    box-shadow为计算器阴影
    参数对应分别为阴影长度x,阴影宽度y,模糊半径,扩散半径,颜色填充
    */
    padding: 24px;/*设置内边距属性*/
    /*background-color: #eee;*/
    background-image: linear-gradient(to top, #fddb92 0%, #d1fdff 100%);
    border-radius: 20px;/*设置圆角*/


  }

  .calculator button{
    margin: 8px;/*外边距*/
    padding:0;/*设置内边距属性*/
    border:0;/*边界*/
    border-radius: calc(var(--button-height)/2);
    /*外边框圆角，给出button的半径即可设置为圆形按钮*/
    font-size: 20px;
    font-family: system-ui;
    font-weight: normal;
    color: #999;

    /*//color: #FCFCFC;*/
    /*//background:#FF9600;*/


    background: linear-gradient(135deg,
    rgba(230, 230, 230, 1) 0%,
    rgba(246, 246, 246, 1) 100%);
    box-shadow: -4px -4px 10px -8px
    rgba(255, 255, 255, 1),
    4px 4px 10px -8px
    rgba(0, 0, 0, .3);
    /*linear-gradient创建一个由两种或多种颜色沿一条直线进行线性过渡的图像*/

  }


  .calculator button:active {

    box-shadow: -4px -4px 10px -8px
    rgba(255, 255, 255, 1) inset,
    4px 4px 10px -8px
    rgba(0, 0, 0, .3) inset;

    /*
    background:#FFC371
    */
  }
  .result {
    text-align: right;
    line-height: var(--button-height);
    font-size: 48px;
    font-family: system-ui;
    padding: 0 20px;

    border-radius: calc(var(--button-height)/2);
    box-shadow: -8px -8px 16px -10px rgba(255, 255, 255, 1),
    8px 8px 16px -10px rgba(0, 0, 0, .15);
    color: #666;
  }
  .history {
    margin: 20px; /*外边距*/
    padding:0;/*设置内边距属性*/
    border: 0;
    font-size: 25px;
    font-family: system-ui;
    line-height: 2;

  }
  .history label{
    font-size: 25px;
    font-family: system-ui;
    line-height: 2
  }

}

</style>

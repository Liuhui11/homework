// const json = require("./index.json");//commonJS
// import { add } from "./other.js";//es module
import './index.scss';
// import img from './images/01.jpeg'
// consol.log(json, add(2, 3));
// // document.body.append(`<img src="${img}"/>`)
// // console.log(img)


// import axios from 'axios';
// axios.get('/api/info').then(res=>{
//     console.log(res)
// })


// var btn = document.createElement("button");
// btn.innerHTML = "新增1"; document.body.appendChild(btn);
// btn.onclick = function() {
//   var div = document.createElement("div");
//   div.innerHTML = "item";
//   document.body.appendChild(div);
// };


// const arr = [new Promise(() => {}), new Promise(() => {})];
// arr.map(item => {
//   console.log(item);
// });


import React, { Component } from "react";
import ReactDom from "react-dom";
class App extends Component {
  render() {
    return <div>hello world</div>;
  }
}
ReactDom.render(<App />, document.getElementById("app"));


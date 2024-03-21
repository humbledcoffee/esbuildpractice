// src/index.jsx
//使用npm中的依赖 写一个简单的组件
// import Server from "react-dom/server";
// let Greet = () => <h1>Hello, juejin!</h1>;
// console.log(Server.renderToString(<Greet />));

//使用cdn 写一个简单的组件
import { render } from "https://cdn.skypack.dev/react-dom";
import React from 'https://cdn.skypack.dev/react'

let Greet = () => <h1>Hello, juejin!</h1>;

render(<Greet />, document.getElementById("root"));
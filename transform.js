// transform.js
const { transform, transformSync } = require("esbuild");

//异步 有并发处理能力,推荐,vite也用的这个
async function runTransform() {
  // 第一个参数是代码字符串，第二个参数为编译配置
  const content = await transform(
    "const isNull = (str: string): boolean => str.length > 0;",
    {
      sourcemap: true,
      loader: "tsx",
    }
  );
    console.log(content);
    
}
// 同步,不推荐
// function runTransform {
//       const content = await transformSync(/* 参数和 transform 相同 */)
//       console.log(content);
//     }

runTransform();

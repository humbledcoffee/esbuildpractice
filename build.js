const { build, buildSync, serve } = require("esbuild");
const httpImport = require("./http-import-plugin");
const html = require("./html-plugin");


//插件简单开发示例
let envPlugin = {
  name: 'env',
  setup(build) {
    build.onResolve({ filter: /^env$/ }, args => ({
      path: args.path,
      namespace: 'env-ns',
    }))

    build.onLoad({ filter: /.*/, namespace: 'env-ns' }, () => ({
      contents: JSON.stringify(process.env),
      loader: 'json',
    }))
  },
}

async function runBuild() {
  // 异步方法，返回一个 Promise
    const result = await build({
      // ----  如下是一些常见的配置  ---
      // 当前项目根目录
      absWorkingDir: process.cwd(),
      // 入口文件列表，为一个数组
      entryPoints: ["./src/index.jsx"],
      // 打包产物目录
      outdir: "dist",
      // 是否需要打包，一般设为 true
      bundle: true,
      // 模块格式，包括`esm`、`commonjs`和`iife`
      format: "esm",
      // 需要排除打包的依赖列表
      external: [],
      // 是否开启自动拆包
      splitting: true,
      // 是否生成 SourceMap 文件
      sourcemap: true,
      // 是否生成打包的元信息文件
      metafile: true,
      // 是否进行代码压缩
      minify: false,
      // 是否开启 watch 模式，在 watch 模式下代码变动则会触发重新打包
      watch: false,
      // 是否将产物写入磁盘
      write: true,
      // Esbuild 内置了一系列的 loader，包括 base64、binary、css、dataurl、file、js(x)、ts(x)、text、json
      // 针对一些特殊的文件，调用不同的 loader 进行加载
      loader: {
        ".png": "base64",
      },
      plugins: [httpImport(), html()],
    })
      .then((result) => {
        console.log("🚀 Build Finished!");
        return result;
      })
      .catch(() => process.exit(1));
    console.log(result);
    
// // 同步方法
// const result = buildSync({
//     // 省略一系列的配置
//   });
//   console.log(result);
    
    serve(
    {
        port: 1025,
        // 静态资源目录
        servedir: './dist'
    },
    {
        absWorkingDir: process.cwd(),
        entryPoints: ["./src/index.jsx"],
        bundle: true,
        format: "esm",
        splitting: true,
        sourcemap: true,
        ignoreAnnotations: true,
        metafile: true,
    }
    ).then((server) => {
    console.log("HTTP Server starts at port", server.port);
    });
}

runBuild();

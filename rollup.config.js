import commonjs from "rollup-plugin-commonjs";
import vue from "rollup-plugin-vue";
import typescript from "rollup-plugin-typescript2";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import css from "rollup-plugin-css-only";

export default {
  input: "src/components/index.ts",
  output: [
    {
      dir: "lib",
      format: "cjs",
      exports: "named",
    },
  ],
  external: ["ant-design-vue", "vue", "xlsx", "@purge-icons/generated", "@ant-design/icons-vue"],
  plugins: [typescript(), css(), vue({ css: false }), nodeResolve(), commonjs()],
};

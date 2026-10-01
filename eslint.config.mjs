import nextConfig from "eslint-config-next";

/** @type {import("eslint/types").Config[]} */
const config = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  ...nextConfig,
];

export default config;

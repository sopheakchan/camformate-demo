module.exports = {
  extends: ["next", "turbo", "prettier", "plugin:json/recommended"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
  },
};

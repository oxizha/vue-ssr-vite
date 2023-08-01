import lodash from "lodash";

const compileOptions = {
  escape: /{{([^{][\s\S]+?[^}])}}/g,
  interpolate: /{{{([\s\S]+?)}}}/g,
};

//
export default function (template) {
  return lodash.template(template, compileOptions);
}

import config from "../../../server/config";

const TEXT_CONFIG = `
const config = ${JSON.stringify(config)}
export default config`;

export default function myPlugin() {
  const virtualModuleId = "virtual:config";
  const resolvedVirtualModuleId = "\0" + virtualModuleId;

  return {
    name: "config-plugin", // 必须的，将会在 warning 和 error 中显示
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return TEXT_CONFIG;
      }
    },
  };
}

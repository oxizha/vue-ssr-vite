import { createPinia } from "pinia";

import { useStore as useAppStore } from "./app";

export default () => {
  const pinia = createPinia();

  useAppStore(pinia);

  return pinia;
};

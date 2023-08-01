import { defineStore } from "pinia";

import api from "@/api";

import type { StateType } from "./types";

export const useStore = defineStore("app", {
  state: (): StateType => {
    return {
      /*
      ------------------------------------------------
      BASE
      ------------------------------------------------
      */
    };
  },
  //
  actions: {
    setState(payload: Partial<StateType>) {
      if (payload) {
        Object.assign(this, payload);
      }
    },
    /*
    ---------------------------------------------------------
      API
    ---------------------------------------------------------
    */
    //
    createCashier(params: any) {
      const reqParams = {
        apiName: "tsCreateCashier" as const,
        apiParams: params,
      };
      // @ts-ignore
      return api.getRequest(reqParams);
    },
  },
});

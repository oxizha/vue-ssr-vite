import { defineStore } from "pinia";
export { storeToRefs } from "pinia";

import api from "@/api";

import type { HTTPResult } from "@/api/types";
import type {
  Req_SalesSummary, //
  Res_SalesSummary,
  SalesInfoDTO,
} from "../types";

export interface StateType {
  pageParams: Record<string, string>;
  dataList: SalesInfoDTO[];
}

export const initialState = JSON.stringify({
  pageParams: {},
  dataList: [],
});

export const storeName = "test_salesProfile";

export const useStore = defineStore(storeName, {
  /*
  ---------------------------------------------------------
    STATE
  ---------------------------------------------------------
  */
  state: (): StateType => {
    return JSON.parse(initialState);
  },
  /*
  ---------------------------------------------------------
    GETTERS
  ---------------------------------------------------------
  */

  getters: {},
  /*
  ---------------------------------------------------------
    ACTIONS
  ---------------------------------------------------------
  */
  actions: {
    setState(payload: Partial<StateType>) {
      if (payload) {
        Object.assign(this, payload);
      }
    },
    // 初始状态
    resetState() {
      this.setState(JSON.parse(initialState));
    },
    /*-------------------MODULE---------------------*/
    // 注册前验证
    async querySalesProfile(params: Req_SalesSummary) {
      const response: HTTPResult<Res_SalesSummary> = await api.request({
        url: "/kfptapi/sales/summary",
        method: "post",
        data: params,
      });
      const { data } = response;

      if (data?.success) {
        this.dataList = data.data;

        return data;
      } else {
        throw "no data";
      }
    },
  },
});

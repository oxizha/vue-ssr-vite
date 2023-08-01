const _app = {
  toast: (params: any) => {},
  loading: (params?: any) => {},
};

function useToast() {}
function useLoading() {}
function useAlert() {}
function useConfirm() {}

export const setApp = () => {
  _app.toast = useToast;
  _app.loading = useLoading;

  //
};

export const getApp = () => {
  return _app;
};

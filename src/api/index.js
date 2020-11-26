import request from "@/plugins/request";

export function verify(data) {
  return request({
    url: "/api/oauth/anno/verify",
    method: "post",
    data
  });
}

export function checkLastOrder(data) {
  return request({
    url: "/memberWeb/deposit/checkLastOrder",
    method: "post",
    data
  });
}

export function queryByTenant(data) {
  return request({
    url: "/memberWeb/deposit/queryByTenant",
    method: "post",
    data
  });
}

export function queryChannelByDepositType(data) {
  return request({
    url: "/memberWeb/deposit/queryChannelByDepositType",
    method: "post",
    data
  });
}

export function submitDeposit(data) {
  return request({
    url: "/memberWeb/deposit/submitDeposit",
    method: "post",
    data
  });
}

export function bankList() {
  return request({
    url: "/tenantManage/dic/withdraw/initBank",
    method: "post"
  });
}


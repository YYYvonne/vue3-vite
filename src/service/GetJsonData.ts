import getAxiosJson from '@/service/index';
// 获取本地json数据
export function getJsonDataApi() {
  return getAxiosJson.get({
    url: '/data/panel_lib.json'
  });
};
import $axiosJson from '@/service/index'; 
// 获取本地json数据
export const getJsonDataApi = () => {
  return $axiosJson({
    url: '/data/panel_lib.json',
    method: 'GET',
  });
};
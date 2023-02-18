//axios简易封装
import axios from "axios";

class axiosRequest {
  instance: any;
  constructor(timeout: number) {
    this.instance = axios.create({
      timeout,
    });
  }

  request(config: any) {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res: { data: any }) => {
          resolve(res.data);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  get(config: any) {
    return this.request({ ...config, method: "get" });
  }

  post(config: any) {
    return this.request({ ...config, method: "post" });
  }
}

export default new axiosRequest(1000);

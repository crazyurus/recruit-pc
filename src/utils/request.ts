import axios from 'axios';

const instance = axios.create({
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Auth: 'Baisc MTAyNDY6MTAyNDY='
  }
});

instance.interceptors.request.use(config => {
  const schoolID = config.data.school || '';

  delete config.data.school;

  Object.assign(config.data, {
    school_id: schoolID,
    login_user_id: 1,
    login_admin_school_code: '',
    login_admin_school_id: schoolID
  });

  config.baseURL =
    schoolID === 'b525083d-b83c-4c7e-892f-29909421d961'
      ? 'https://scc.whut.edu.cn/mobile.php'
      : 'https://a.jiuyeb.cn/mobile.php';

  const query = new URLSearchParams(config.data);
  config.data = query.toString();

  return config;
});

instance.interceptors.response.use(
  response => {
    if (response.status !== 200) {
      return Promise.reject('服务器错误 ' + response.statusText);
    }

    if (response.data.code === 0) {
      return response.data.data;
    }

    return Promise.reject(response.data.msg);
  },
  error => {
    return Promise.reject(error);
  }
);

function request(url: string, data: any = {}) {
  return instance({
    url,
    data
  });
}

export default request;

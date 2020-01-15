import qs from 'qs';
export default function ({ $axios, redirect }) {
  $axios.setHeader('Content-Type', 'application/x-www-form-urlencoded', [
    'post'
  ])
  //$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
  $axios.setBaseURL('http://huxiaojun.work');
  //$axios.defaults.baseURL = 'http://huxiaojun.work:8082';
  $axios.onRequest(config => {
    if (config.method === 'get') {
      config.data && (config.progress = config.data.progress)
      config.data = null
    } else {
      let contentType = config.headers['Content-Type'];
      if (contentType && contentType.indexOf('multipart/form-data') === -1) {
        let data = {}
        for (let [key, value] of Object.entries(config.data)) {
          key !== 'progress' && (data[key] = value)
        }
        config.data = data
      }
      // if(config.method === 'post'){
      //   config.data = qs.stringify(config.data);
      // }
      config.progress = config.headers.progress
      delete config.headers.progress
    }
    return config
  })

  $axios.onResponse(response => {
    response.data = {
      data: response.data,
      status: response.status,
      headers: response.headers,
      statusText: response.statusText
    }
    return response
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    code >= 400 && redirect(`/${code}`)
    return Promise.reject(error)
  })
}

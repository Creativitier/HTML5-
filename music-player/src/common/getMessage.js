import Vue from 'vue'
export  function getMessage(keyWord, page) {
  return Vue.prototype.$http.get('http://route.showapi.com/213-1', {
    params: {
      showapi_appid: 34565,
      showapi_sign: 'c38a8f85afc24a429be423d2fc465ecc',
      keyword: keyWord,
      page: page
    }
  }).then((response) => {
    return Promise.resolve(response.data.showapi_res_body.pagebean)
  }).catch((error) => {
    console.log('error:' + error);
  })
}

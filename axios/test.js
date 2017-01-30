let axios = require('axios')

axios({
  method: 'post',
  url: 'http://127.0.0.1:8080',
  params: {
    id: 12345
  }
})
.then((res) => {
  // console.log(res)
})
.catch((err) => {
  console.log(err)
})

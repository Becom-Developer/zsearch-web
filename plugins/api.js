export default function ({ app }, inject) {
  const authURL = process.env.authURL
  const zsearchURL = process.env.zsearchURL
  inject('authapi', (qParams) => {
    return app.$axios.$post(authURL, {
      resource: qParams[0],
      method: qParams[1],
      params: qParams[2],
      apikey: 'becom',
    })
  })
  inject('zsearchapi', (qParams) => {
    return app.$axios.$post(zsearchURL, {
      resource: qParams[0],
      method: qParams[1],
      params: qParams[2],
      apikey: 'becom',
    })
  })
}

// import qs from 'qs'
// paramsSerializer: (params) =>
// qs.stringify(params, { arrayFormat: 'repeat' }),
// })

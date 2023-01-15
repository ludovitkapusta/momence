export const fetchTXTData = (url: string) =>
  fetch(`${url}`, {
    method: 'GET',
    headers: {
      Accept: 'text/plain',
      'Content-type': 'text/plain'
    }
  })
    .then(function (res) {
      if (!res.ok) {
        throw Error(res.statusText)
      }
      return res
    })
    .then(async (res) => {
      const text = await res.text()
      return text
    })
    .catch(function (error) {
      console.error(error)
    })

export default function PF(url, data, type) {
  return new Promise((reslove, reject) => {
    $.ajax({
      type: type ? type : "GET",
      url: url,
      data: data,
      success: (res) => {
        reslove(res)
      },
      error: (err) => {
        reject(err)
      }
    });
  })
}
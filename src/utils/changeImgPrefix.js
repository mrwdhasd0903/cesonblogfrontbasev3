if (location.hostname === "localhost") {
  setTimeout(() => {
    let imgs = document.getElementsByTagName("img")
    for (let i = 0; i < imgs.length; i++) {
      if (imgs[i].src.indexOf('upload') != -1) {
        imgs[i].src = "https://www.wdhhh.cn/upload" + imgs[i].src.split("upload")[1]
      };
    }
  }, 500)
}

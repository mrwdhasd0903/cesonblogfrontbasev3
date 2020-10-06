let qrcode = (size, id) => {
  let target = document.getElementById(id)
  let latNode = target.lastElementChild
  while (latNode && (latNode.nodeName === "IMG" || latNode.nodeName === "CANVAS")) {
    target.removeChild(latNode)
    latNode = target.lastElementChild
  }
  new QRCode(target, {
    text: window.location.href,
    width: size,
    height: size,
    correctLevel: QRCode.CorrectLevel.L
  });
};
export default qrcode
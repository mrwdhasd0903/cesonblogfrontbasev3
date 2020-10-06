function onKeyDown(keyCode, callback) {
  document.onkeydown = event => {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == keyCode) {
      callback()
    }
  };
}
export default onKeyDown
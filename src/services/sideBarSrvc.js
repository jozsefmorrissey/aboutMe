exports.sideBarSrvc = () => {
  const obj = {};

  function showBar() {
    obj.show = true;
  }

  function hideBar() {
    obj.show = false;
  }

  function isShowing() {
    return obj.show;
  }

  obj.isShowing = isShowing;
  obj.showBar = showBar;
  obj.hideBar = hideBar;

  return obj;
};

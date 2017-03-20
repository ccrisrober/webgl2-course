window.addEventListener("gamepadconnected", function(e) {
  console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
    e.gamepad.index, e.gamepad.id,
    e.gamepad.buttons.length, e.gamepad.axes.length);
});
window.addEventListener("gamepaddisconnected", function(e) {
  console.log("Gamepad disconnected from index %d: %s",
    e.gamepad.index, e.gamepad.id);
});
var gpState = {
  topButton: { pressed: false },
  leftButton: { pressed: false },
  rightButton: { pressed: false },
  bottomButton: { pressed: false },
  LButton: { pressed: false },
  RButton: { pressed: false },
  xAxis: 0.0,
  yAxis: 0.0
};

function setGPState(gamepad)
{
  gpState.topButton.pressed = gamepad.buttons[12].pressed;
  gpState.leftButton.pressed = gamepad.buttons[14].pressed;
  gpState.rightButton.pressed = gamepad.buttons[15].pressed;
  gpState.bottomButton.pressed = gamepad.buttons[13].pressed;
  gpState.LButton.pressed = gamepad.buttons[6].pressed;
  gpState.RButton.pressed = gamepad.buttons[7].pressed;

  var axis = gamepad.axes;
  var leftAxis = [axis[0], axis[1]];
  //var rightAxis = [axis[2], axis[3]];

  if (Math.abs(leftAxis[0]) > 0.1)
  {
    gpState.xAxis = leftAxis[0] * 0.1;
  } else {
    gpState.xAxis = 0.0;
  }
  if (Math.abs(leftAxis[1]) > 0.1)
  {
    gpState.yAxis = -leftAxis[1] * 0.1;
  } else {
    gpState.yAxis = 0.0;
  }
}
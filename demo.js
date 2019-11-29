/**
 * Example of usage with some extra stuff to test the config on the fly
 */

 // Canvas element to use - style/position this with CSS
var canvasId = 'space'; // required

// Illusion of changing view direction due to mouse pos
var followMouse = false; // optional, default false

// Star color
var color = { r: 255, g: 255, b: 255 }; // optional, default 255, 255, 255

// Subtle glow with canvas shadow - performance drain
var glow = false; // optional, default false

// Min velocity range
var minV = 2; // optional, default 2

// Max velocity range
var maxV = 5; // optional, default 5

// Perforance starts to degrade beyond around 1500 stars, system-dependent
var numStars = 400; // optional, default 400

// Subtle trail lines which help the illusion of speed
var trails = true; // optional, default false

// Setup the Starfield
// var starfield = new Starfield.Starfield(canvasId); // Run with defaults
var starfield = new StarFieldCanvas.StarField(canvasId, {
  followMouse: followMouse,
  color: color,
  glow: glow,
  minV: minV,
  maxV: maxV,
  numStars: numStars,
  trails: trails
});

// Make stars happen
starfield.start();


// == Demo config stuff below - not needed for usage ==

// Get config edit fields and set current defaults
var txtNumStars = document.getElementById('ctrlNumStars');
txtNumStars.value = numStars.toString();
var txtMaxV = document.getElementById('ctrlMaxV');
txtMaxV.value = maxV.toString();
var txtMinV = document.getElementById('ctrlMinV');
txtMinV.value = minV.toString();
var chkMouse = document.getElementById('ctrlMouse');
chkMouse.checked = followMouse;

// Some key events for the config test form
txtNumStars.onkeyup = function () {
  starfield.setNumStars(parseInt(txtNumStars.value));
};
txtMaxV.onkeyup = function () {
  starfield.setMaxV(parseInt(txtMaxV.value));
};
txtMinV.onkeyup = function () {
  starfield.setMinV(parseInt(txtMinV.value));
};
chkMouse.onchange = function () {
  starfield.setFollowMouse(chkMouse.checked);
};
'use strict';

/*

Each of these functions will toggle image display colors (from black and white to color)
and render specified paragraphs with info about each developer

*/

//Heres one for Joanna
function joannaToggle() {
  var x = document.getElementById('joannaInfo');
  //Checks if paragraph is being displayed
  //No? - display info paragraph 
  if (x.style.display === 'none') {
    x.style.display = 'block';
  }else {
  //Yes? - remove display
    x.style.display = 'none';
  }

}

//Here is one for Evan
function denevanToggle() {
  var x = document.getElementById('denevanInfo');
  if (x.style.display === 'none') {
    x.style.display = 'block';
  } else {
    x.style.display = 'none';
  }

}

//Here is one for Pratiibh
function pratiibhToggle() {
  var x = document.getElementById('pratiibhInfo');
  if (x.style.display === 'none') {
    x.style.display = 'block';
  } else {
    x.style.display = 'none';
  }

}

//Here is one for Melissa
function melissaToggle() {
  var x = document.getElementById('melissaInfo');
  if (x.style.display === 'none') {
    x.style.display = 'block';
  } else {
    x.style.display = 'none';
  }

}

//Here is one for Williams
function williamsToggle() {
  var x = document.getElementById('williamsInfo');
  if (x.style.display === 'none') {
    x.style.display = 'block';
  } else {
    x.style.display = 'none';
  }
}
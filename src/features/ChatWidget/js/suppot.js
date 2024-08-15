/* eslint-disable func-names */
import $ from 'jquery';

function support() {
  // rename save get started
  document.getElementById('renameColor').onclick = function () {
    $('#renameMsg').toggleClass('show hide');
    setTimeout(() => {
      $('#renameMsg').removeClass('show');
    }, 5000);
  };

  // save Widget Appearance
  document.getElementById('saveWidgetAppearance').onclick = function () {
    $('#saveAppearanceMsg').toggleClass('show hide');
    setTimeout(() => {
      $('#saveAppearanceMsg').removeClass('show');
    }, 5000);
  };

  // delete Widget Appearance
  document.getElementById('deleteAppearance').onclick = function () {
    $('#deleteAppearanceMsg').toggleClass('show hide');
    setTimeout(() => {
      $('#deleteAppearanceMsg').removeClass('show');
    }, 5000);
  };
  // delete Widget Appearance
  document.getElementById('deleteTopic').onclick = function () {
    $('#deleteTopicMsg').toggleClass('show hide');
    setTimeout(() => {
      $('#deleteTopicMsg').removeClass('show');
    }, 5000);
  };

  // toast update theme
  document.getElementById('updateTheme').onclick = function () {
    $('#updateThemeMsg').toggleClass('show hide');
    setTimeout(() => {
      $('#updateThemeMsg').removeClass('show');
    }, 5000);
  };

  // toast save theming
  document.getElementById('Newtheme').onclick = function () {
    $('#Newthememsg').toggleClass('show hide');
    setTimeout(() => {
      $('#Newthememsg').removeClass('show');
    }, 5000);
  };
  // map bot

  document.getElementById('saveMapTopics').onclick = function () {
    $('#liveToastBotMapmsg').toggleClass('show hide');
    setTimeout(() => {
      $('#liveToastBotMapmsg').removeClass('show');
    }, 5000);
  };

  // faq save
  document.getElementById('saveFaq').onclick = function () {
    $('#liveToastFaqBtnmsg').toggleClass('show hide');
    setTimeout(() => {
      $('#liveToastFaqBtnmsg').removeClass('show');
    }, 5000);
  };

  const singleColor = document.querySelector('.single-color');
  const color1 = document.querySelector('.color1');
  const color2 = document.querySelector('.color2');
  const body = document.querySelector('.change');

  // Changing color for the gradient
  function changeGradient() {
    body.style.background = `linear-gradient(to right, ${color1.value}, ${color2.value})`;

    // css.textContent = body.style.background + ";";
  }

  color1.addEventListener('input', changeGradient);

  color2.addEventListener('input', changeGradient);
  // Changing color
  function changeColor() {
    body.style.background = `linear-gradient(to right, ${singleColor.value}, ${singleColor.value})`;

    // css.textContent = body.style.background + ";";
  }

  singleColor.addEventListener('input', changeColor);

  // save
  document.getElementById('SaveConfig').onclick = function () {
    $('#SaveConfigmsg').toggleClass('show hide');
    setTimeout(() => {
      $('#SaveConfigmsg').removeClass('show');
    }, 5000);
  };
}

export default support;

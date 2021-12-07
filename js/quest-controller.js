'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;
var gGameOn = false


$(document).ready(init);
$('.btn-start').click(onStartGuessing);
$('.btn-yes').click({ ans: 'yes' }, onUserResponse);
$('.btn-no').click({ ans: 'no' }, onUserResponse);
$('.btn-add-guess').click(onAddGuess);
$('.close-btn').click(onCloseModal);
$('.modal-btn').click(onModalRestart);


function init() {
  console.log('Started...');
  createQuestsTree();
  gGameOn = true
}

function onStartGuessing() {
  // DONE: hide the game-start section
  $('.game-start').hide()
  renderQuest();
  // DONE: show the quest section
}

function renderQuest() {
  // DONE: select the <h2> inside quest and update
  const $quest = $('.quest')
  $quest.css({ display: 'block' })
  // $quest.children('h2').text(getCurrQuest().txt)
  $('.quest h2').text(getCurrQuest().txt)
  // its text by the currQuest text
}

function onUserResponse(ev) {
  if (!gGameOn) return
  var res = ev.data.ans;
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      $('.modal').addClass('open')
      gGameOn = false
      // TODO: improve UX
    } else {
      $('.new-quest').css({ display: 'block' })
      // gLastRes = res
      // DONE: hide and show new-quest section

      // alert('I dont know...teach me!');
    }
  } else {
    // DONE: update the lastRes global var
    gLastRes = res
    moveToNextQuest(res);
    renderQuest();
  }
}

function onAddGuess(ev) {
  ev.preventDefault();
  var newGuess = $('#newGuess').val();
  var newQuest = $('#newQuest').val();
  console.log(newGuess);
  console.log(newQuest);

  addGuess(newQuest, newGuess, gLastRes)

  // TODO: Get the inputs' values
  // TODO: Call the service addGuess

  onRestartGame();
}

function onRestartGame() {
  $('.new-quest').hide();
  $('.quest').hide()
  $('.game-start').show();
  gLastRes = null;
}

function onCloseModal() {
  $('.close-btn').closest('.modal').removeClass('open')
}

function onModalRestart() {
  $('.new-quest').hide();
  $('.quest').hide()
  $('.game-start').show();
  onCloseModal()
  gLastRes = null;
  restartGame()
  gGameOn = true

}

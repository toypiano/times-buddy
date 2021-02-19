import { resetPlayState } from './js/state.js';
import {
  startQuiz,
  restartQuiz,
  evaluateAnswer,
  setNextQuestion,
} from './js/quiz.js';
import { goTo } from './js/router.js';
import { loadSound } from './js/helpers.js';

// load audio files
const { hitSound, openingMusic } = loadSound();

//=====================================
// Event Handlers
//=====================================

/**
 * Select answer to move to next question if correct
 * @param {number} delay - delay until showing next question
 */
async function handleAnswerButtonClick(e) {
  // wait for pass/fail animation sequence to end
  hitSound.play();
  await evaluateAnswer(e);
  setNextQuestion();
}

function handleSelectButtonClick() {
  // get selected table from data attribute
  const table = this.dataset.table;

  startQuiz(table);
}

function handleAgainButtonClick() {
  restartQuiz();
}

function handleMainButtonClick() {
  resetPlayState();
  goTo('start');
}

//=====================================
// Event Bindings
//=====================================

// Start
$('.table-select > button').each(function (i, button) {
  $(button).on('click', handleSelectButtonClick);
});

// Play
$('.answer-buttons').children().on('click', handleAnswerButtonClick);

// Results
$('.btn-again').on('click', handleAgainButtonClick);
$('.btn-main').on('click', handleMainButtonClick);

// TODO: save result to the localStorage
// TODO: load result from localStorage on mount

goTo('start');

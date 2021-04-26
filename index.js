const settingsToggle = document.querySelector('#js-settings__icon--toggle');
const settingsCloseBtn = document.querySelector('#settings__close-btn');
const settingsModal = document.querySelector('#js-settings__modal');
const timerDisplay = document.querySelector('.min-sec');

const inputNumbers = document.querySelectorAll('.settings__set-time--input');
const incrementSvgs = document.querySelectorAll('.up-arrow');
const decrementSvg = document.querySelectorAll('.down-arrow');

// Open modal on the settings button click
settingsToggle.addEventListener('click', () => {
  // add the class 'show-modal' which changes the display property
  settingsModal.classList.add('show-modal');
});

// Close modal on the X icon click
settingsCloseBtn.addEventListener('click', () => {
  // remove the class 'show-modal' which changes the display property
  settingsModal.classList.remove('show-modal');
});

// Close modal on the click outside the modal
window.addEventListener('click', (event) => {
  // if the click happens on the modal wrapper
  // then remove the class 'show-modal'
  event.target === settingsModal
    ? settingsModal.classList.remove('show-modal')
    : false;
});

// set the total seconds
let totalSeconds = 500;
// check the seconds elasped
let secondsElasped = 65;

const getFormatedMinutes = () => {
  // check how many seconds are left
  let secondsLeft = totalSeconds - secondsElasped;
  // check remaining minutes by dividing the secondsLeft by 60
  let minutesLeft = Math.floor(secondsLeft / 60);

  // set the formated mintes
  let formattedMinutes;
  // format minutes if less than 10
  if (minutesLeft < 0) {
    formattedMinutes = `0${minutesLeft}`;
  } else {
    formattedMinutes = minutesLeft;
  }

  console.log(formattedMinutes);
  return formattedMinutes;
};

const getFormatedSeconds = () => {
  // get the remainder seconds
  let secondsLeft = (totalSeconds - secondsElasped) % 60;

  // set formated seconds
  let formattedSeconds;
  // format seconds if less than 10
  if (secondsLeft < 10) {
    formattedSeconds = `0${secondsLeft}`;
  } else {
    formattedSeconds = secondsLeft;
  }

  console.log(formattedSeconds);
  return formattedSeconds;
};

const renderTime = () => {
  timerDisplay.textContent = `${getFormatedMinutes()}:${getFormatedSeconds()}`;
};

renderTime();

const getInputValue = (e) => {
  const { name, value } = e.target;

  return {
    [name]: value,
  };
};

console.log(inputNumbers);

const settingsToggle = document.querySelector('#js-settings__icon--toggle');
const settingsCloseBtn = document.querySelector('#settings__close-btn');
const settingsModal = document.querySelector('#js-settings__modal');
const timerDisplay = document.querySelector('.min-sec');

// Modal inputs
const pomodoroInput = document.querySelector('#js-settings__modal #pomodoro');
const shortBreakInput = document.querySelector(
  '#js-settings__modal #short-break'
);
const longBreakInput = document.querySelector(
  '#js-settings__modal #long-break'
);
// Increase and Decrease buttons
const jsIncreasePomodoro = document.querySelector('#jsIncreasePomodoro');
const jsDecreasePomodoro = document.querySelector('#jsDecreasePomodoro');
const jsIncreaseShortBreak = document.querySelector('#jsIncreaseShortBreak');
const jsDecreaseShortBreak = document.querySelector('#jsDecreaseShortBreak');
const jsIncreaseLongBreak = document.querySelector('#jsIncreaseLongBreak');
const jsDecreaseLongBreak = document.querySelector('#jsDecreaseLongBreak');

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

// setup function to check in the input value is greater than 90 (minutes)
function setMaxInputValue(input) {
  input.addEventListener('keyup', (e) => {
    if (e.target.value > 90) {
      input.value = 90;
      console.log("Can't enter a number greater than 90");
    }
  });
}
// call on all of the inputs
setMaxInputValue(pomodoroInput);
setMaxInputValue(shortBreakInput);
setMaxInputValue(longBreakInput);

// setup function to increase an input value
function increaseInputValue(input, button) {
  button.addEventListener('click', () => {
    // keep the value going higher than 90 minutes
    if (input.value < 90) {
      return input.value++;
    }
    return;
  });
}
// call on all of the increase buttons
increaseInputValue(pomodoroInput, jsIncreasePomodoro);
increaseInputValue(shortBreakInput, jsIncreaseShortBreak);
increaseInputValue(longBreakInput, jsIncreaseLongBreak);

// setup function to decrease an input value
function decreaseInputValue(input, button) {
  button.addEventListener('click', () => {
    // keep the value from going below 0
    if (input.value > 0) {
      input.value--;
    }
  });
}
// call on all of the increase buttons
decreaseInputValue(pomodoroInput, jsDecreasePomodoro);
decreaseInputValue(shortBreakInput, jsDecreaseShortBreak);
decreaseInputValue(longBreakInput, jsDecreaseLongBreak);

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

// const timer = {
//   started: false,
//   pomodoro: 25,
//   shortBreak: 5,
//   longBreak: 15
// }

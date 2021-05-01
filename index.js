const settingsToggle = document.querySelector('#js-settings__icon--toggle');
const settingsCloseBtn = document.querySelector('#settings__close-btn');
const settingsModal = document.querySelector('#js-settings__modal');
const timerDisplay = document.querySelector('.min-sec');

// Get root styles
const root = document.querySelector(':root');
// root variable values
const fontKumbhSans = getComputedStyle(root)
  .getPropertyValue('--kumbhsans-font')
  .trim();
const fontRobotoSlab = getComputedStyle(root)
  .getPropertyValue('--robotoslab-font')
  .trim();
const fontSpaceMono = getComputedStyle(root)
  .getPropertyValue('--spacemono-font')
  .trim();

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

// Modal font buttons
const fontSettings = document.getElementsByName('fonts');
// Modal color buttons
const themeRed = document.querySelector('#primary-red');
const themeTeal = document.querySelector('#primary-teal');
const themePurple = document.querySelector('#primary-purple');
const colorSettings = document.getElementsByName('colors');
// Modal form
const settingsForm = document.querySelector('#settings__form');

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

function saveUserPreferences() {
  let color = '';
  let font = '';

  for (let i = 0; i < fontSettings.length; i++) {
    const element = fontSettings[i];
    if (element.checked) {
      if (element.value === 'kumbh-sans') {
        font = fontKumbhSans;
      }
      if (element.value === 'roboto-slab') {
        font = fontRobotoSlab;
      }
      if (element.value === 'space-mono') {
        font = fontSpaceMono;
      }
    }
  }

  for (let i = 0; i < colorSettings.length; i++) {
    const element = colorSettings[i];
    if (element.checked) {
      color = element.value;
    }
  }

  const preferences = {
    theme: color,
    font: font,
    pomodoroTime: Number(pomodoroInput.value),
    shortBreakTime: Number(shortBreakInput.value),
    longBreakTime: Number(longBreakInput.value),
  };

  console.log(preferences);
  localStorage.setItem('userPreferences', JSON.stringify(preferences));
}

settingsForm.addEventListener('submit', (e) => {
  e.preventDefault();

  saveUserPreferences();
  getUserPreferences();
});

function getUserPreferences() {
  const saved = JSON.parse(localStorage.getItem('userPreferences'));

  console.log(saved);

  if (saved !== null) {
    document.documentElement.style.setProperty(
      '--set-theme-primary',
      saved.theme
    );
    document.documentElement.style.setProperty('--set-font-style', saved.font);
  } else {
    const defaultPreferences = {
      theme: '#f87070',
      font: 'Kumbh Sans, sans-serif',
      pomodoroTime: 25,
      shortBreakTime: 5,
      longBreakTime: 10,
    };

    localStorage.setItem('userPreferences', JSON.stringify(defaultPreferences));
    const defaultSaved = JSON.parse(localStorage.getItem('userPreferences'));
    document.documentElement.style.setProperty(
      '--set-theme-primary',
      defaultSaved.theme
    );
    document.documentElement.style.setProperty(
      '--set-font-style',
      defaultSaved.font
    );
  }
}

getUserPreferences();

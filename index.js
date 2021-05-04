const settingsToggle = document.querySelector('#js-settings__icon--toggle');
const settingsCloseBtn = document.querySelector('#settings__close-btn');
const settingsModal = document.querySelector('#js-settings__modal');
const timerDisplay = document.querySelector('.min-sec');
const startBtn = document.querySelector('#start');
const endTimeEl = document.querySelector('#end-time');
const circleSvg = document.querySelector('.timer__path-elapsed');

// Control buttons
const controlDiv = document.querySelector('.control__buttons');
const controlBtns = controlDiv.querySelectorAll('.btn');

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
const applyBtn = document.querySelector('#apply-btn');

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

// Apply button
applyBtn.addEventListener('click', (e) => {
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
  // initialize variables to save data to
  let color = '';
  let font = '';

  // loop over font settings node list
  for (let i = 0; i < fontSettings.length; i++) {
    // save node list values to variable
    const element = fontSettings[i];
    // check is an element is checked
    if (element.checked) {
      // if the element checked is 'kumbh-sans'
      if (element.value === 'kumbh-sans') {
        // set the font to the CSS value of --kumbhsans-font (from the root styles)
        font = fontKumbhSans;
      }
      // if the element checked is 'roboto-slab'
      if (element.value === 'roboto-slab') {
        // set the font to the CSS value of  --robotoslab-font (from the root styles)
        font = fontRobotoSlab;
      }
      // if the element checked is 'space-mono'
      if (element.value === 'space-mono') {
        // set the font to the CSS value of --spacemono-font (from the root styles)
        font = fontSpaceMono;
      }
    }
  }

  // loop over color settings node list
  for (let i = 0; i < colorSettings.length; i++) {
    // save node list values to variable
    const element = colorSettings[i];
    // check is an element is checked
    if (element.checked) {
      // set the checked color to the element value
      color = element.value;
    }
  }

  // create the object to hold user entered data
  const preferences = {
    theme: color,
    font: font,
    pomodoroTime: Number(pomodoroInput.value * 60),
    shortBreakTime: Number(shortBreakInput.value * 60),
    longBreakTime: Number(longBreakInput.value * 60),
  };

  console.log(preferences);
  // set the preferences object in local storage
  localStorage.setItem('userPreferences', JSON.stringify(preferences));
}

settingsForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // clear any existing timers
  clearInterval(countdown);

  // save the user entered data
  saveUserPreferences();
  // get the user entered data (without this, the page would need refreshed for changes to take affect)
  getUserPreferences();
});

function getUserPreferences() {
  // varible to parse local storage back into an object
  const saved = JSON.parse(localStorage.getItem('userPreferences'));

  // if preferences are in local storage, save the theme and font styles to CSS variables
  if (saved !== null) {
    // set the CSS variable color
    document.documentElement.style.setProperty(
      '--set-theme-primary',
      saved.theme
    );
    // set the CSS variable font style
    document.documentElement.style.setProperty('--set-font-style', saved.font);
    renderTime(saved.pomodoroTime);
  } else {
    // otherwise, set preference default values
    const defaultPreferences = {
      theme: '#f87070',
      font: 'Kumbh Sans, sans-serif',
      pomodoroTime: 1500,
      shortBreakTime: 300,
      longBreakTime: 600,
    };
    localStorage.setItem('userPreferences', JSON.stringify(defaultPreferences));
    // get the default settings from local storage
    const defaultSaved = JSON.parse(localStorage.getItem('userPreferences'));
    // set the CSS variable color
    document.documentElement.style.setProperty(
      '--set-theme-primary',
      defaultSaved.theme
    );
    // set the CSS variable font style
    document.documentElement.style.setProperty(
      '--set-font-style',
      defaultSaved.font
    );
  }
}

// initialize preferences on page load
getUserPreferences();

// get circle radius value
const radius = circleSvg.r.baseVal.value;
// set the circumference value of the circle
let circumference = radius * 2 * Math.PI;
console.log(circumference);

circleSvg.style.strokeDasharray = circumference;

function setProgress(percent) {
  // calculate the percentage of time left
  circleSvg.style.strokeDashoffset =
    circumference - (percent / 100) * circumference;
}

function renderTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;
  const adjustedSeconds = secondsLeft < 10 ? '0' : '';
  const display = `${minutes}:${adjustedSeconds}${secondsLeft}`;
  timerDisplay.textContent = display;
}

function renderEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  const adjustedMinutes = minutes < 10 ? '0' : '';
  endTimeEl.textContent = `Be back at ${adjustedHour}:${adjustedMinutes}${minutes}`;
}

// set variable to clear interval with
let countdown;

function timer(seconds) {
  // clear any existing timers
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;

  renderTime(seconds);
  renderEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    // making the remaing time into a percent friendly value (ex. 98, 97, 96)
    setProgress((secondsLeft / seconds) * 100);
    renderTime(secondsLeft);
  }, 1000);
}

startBtn.addEventListener('click', (e) => {
  clearInterval(countdown);
  // get the saved settings from local storage
  const settingsObj = JSON.parse(localStorage.getItem('userPreferences'));
  // gets the clicked button class' btn--state-active'
  const current = document.getElementsByClassName('btn--state-active');

  if (current[0].id === 'pomodoro') {
    renderTime(settingsObj.pomodoroTime);
    timer(settingsObj.pomodoroTime);
  } else if (current[0].id === 'short-break') {
    renderTime(settingsObj.shortBreakTime);
    timer(settingsObj.shortBreakTime);
  } else {
    renderTime(settingsObj.longBreakTime);
    timer(settingsObj.longBreakTime);
  }
});

function btnTimerControl(e) {
  // clear any existing timers
  clearInterval(countdown);
  // get the saved settings from local storage
  const settingsObj = JSON.parse(localStorage.getItem('userPreferences'));

  // gets the clicked button class' btn--state-active'
  const current = document.getElementsByClassName('btn--state-active');

  // If there's no active class
  if (current.length > 0) {
    current[0].className = current[0].className.replace(
      ' btn--state-active',
      ''
    );
  }

  // add the active class to the current clicked button
  e.target.classList.add('btn--state-active');

  if (current[0].id === 'pomodoro') {
    renderTime(settingsObj.pomodoroTime);
  } else if (current[0].id === 'short-break') {
    renderTime(settingsObj.shortBreakTime);
  } else {
    renderTime(settingsObj.longBreakTime);
  }
}

controlBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    btnTimerControl(e);
  });
});

settingsForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // clear any existing timers
  clearInterval(countdown);

  // save the user entered data
  saveUserPreferences();
  // get the user entered data (without this, the page would need refreshed for changes to take affect)
  getUserPreferences();

  // get the saved settings from local storage
  const settingsObj = JSON.parse(localStorage.getItem('userPreferences'));

  // gets the clicked button class' btn--state-active'
  const current = document.getElementsByClassName('btn--state-active');

  if (current[0].id === 'pomodoro') {
    renderTime(settingsObj.pomodoroTime);
  } else if (current[0].id === 'short-break') {
    renderTime(settingsObj.shortBreakTime);
  } else {
    renderTime(settingsObj.longBreakTime);
  }
});

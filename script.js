import { keysEng, keysRu } from './keys.js';

let isEnglish = JSON.parse(localStorage.getItem('isEnglish'));
if (isEnglish === null) {
  isEnglish = true;
}
localStorage.setItem('isEnglish', isEnglish);

function createApp() {
  const container = document.createElement('div');
  container.classList.add('container');
  container.innerHTML = `<h1 class="title">Keyboard</h1>
  <div class="descr">
    <p>OS the virtual keyboard is MacOS</p>
    <p>The keyboard shortcut for changing language is Shift + Meta</p>
  </div>

    <textarea class="textarea"></textarea>

  <div class="keyboard">
    <div class="row"></div>
    <div class="row"></div>
    <div class="row"></div>
    <div class="row"></div>
    <div class="row"></div>
  </div>`;

  document.body.append(container);
}

function createKeyboard(keys) {
  const rows = document.querySelectorAll('.row');
  keys.forEach((item, index) => {
    if (index <= 13) {
      const key = document.createElement('div');
      key.classList.add('key');
      key.textContent = item.key;
      key.setAttribute('code', item.code);
      key.setAttribute('key', item.key);
      key.setAttribute('keyShift', item.shiftKey ? item.shiftKey : item.key);
      if (item.additionalClass) {
        key.classList.add(`${item.additionalClass}`);
      }
      if (item.shiftKey) {
        key.textContent += ` ${item.shiftKey}`;
      }
      rows[0].append(key);
    }
    if (index > 13 && index <= 28) {
      const key = document.createElement('div');
      key.classList.add('key');
      key.textContent = item.shiftKey ? item.shiftKey : item.key;
      key.setAttribute('code', item.code);
      key.setAttribute('key', item.key);
      key.setAttribute('keyShift', item.shiftKey ? item.shiftKey : item.key);
      if (item.additionalClass) {
        key.classList.add(`${item.additionalClass}`);
      }
      if (isEnglish) {
        if (index >= 25 && index <= 27) {
          key.textContent += ` ${item.key}`;
        }
      }
      rows[1].append(key);
    }
    if (index > 28 && index <= 41) {
      const key = document.createElement('div');
      key.classList.add('key');
      key.textContent = item.shiftKey ? item.shiftKey : item.key;
      key.setAttribute('code', item.code);
      key.setAttribute('key', item.key);
      key.setAttribute('keyShift', item.shiftKey ? item.shiftKey : item.key);
      if (item.additionalClass) {
        key.classList.add(`${item.additionalClass}`);
      }
      if (isEnglish) {
        if (index === 39 || index === 40) {
          key.textContent += ` ${item.key}`;
        }
      }
      rows[2].append(key);
    }
    if (index > 41 && index <= 54) {
      const key = document.createElement('div');
      key.classList.add('key');
      key.textContent = item.shiftKey ? item.shiftKey : item.key;
      key.setAttribute('code', item.code);
      key.setAttribute('key', item.key);
      key.setAttribute('keyShift', item.shiftKey ? item.shiftKey : item.key);
      if (item.additionalClass) {
        key.classList.add(`${item.additionalClass}`);
      }
      if (isEnglish) {
        if (index >= 50 && index <= 52) {
          key.textContent += ` ${item.key}`;
        }
      }
      if (index === 53) {
        key.innerHTML = '&#8657;';
      }
      rows[3].append(key);
    }
    if (index > 54) {
      const key = document.createElement('div');
      key.classList.add('key');
      key.textContent = item.shiftKey ? item.shiftKey : item.key;
      key.setAttribute('code', item.code);
      key.setAttribute('key', item.key);
      key.setAttribute('keyShift', item.shiftKey ? item.shiftKey : item.key);
      if (item.additionalClass) {
        key.classList.add(`${item.additionalClass}`);
      }
      if (index === 61) {
        key.innerHTML = '&#8656;';
      }
      if (index === 62) {
        key.innerHTML = '&#8659;';
      }
      if (index === 63) {
        key.innerHTML = '&#8658;';
      }
      rows[4].append(key);
    }
  });
}

function lightLetterinVirtualKeyboard(event) {
  const letter = document.querySelector(`[code=${event.code}]`);
  letter.classList.add('key--active');
}

function removeLightLetterinVirtualKeyboard(event) {
  const letter = document.querySelector(`[code=${event.code}]`);
  letter.classList.remove('key--active');
}

function initApp() {
  createApp();

  if (isEnglish) {
    createKeyboard(keysEng);
  }

  if (!isEnglish) {
    createKeyboard(keysRu);
  }
}

initApp();

window.addEventListener('keydown', lightLetterinVirtualKeyboard);
window.addEventListener('keyup', removeLightLetterinVirtualKeyboard);

let isShift = false;
const input = document.querySelector('.input');
const keysArray = document.querySelectorAll('.key');

window.addEventListener('keyup', (e) => {
  if (e.code === 'ShiftRight' || e.code === 'ShiftLeft') {
    isShift = false;
  }
});

window.addEventListener('keydown', (e) => {
  if (e.code === 'ShiftRight' || e.code === 'ShiftLeft') {
    isShift = true;
  }

  if ((e.code === 'MetaLeft' || e.code === 'MetaRight') && isShift === true) {
    isEnglish = !isEnglish;
    localStorage.setItem('isEnglish', isEnglish);

    document.body.innerHTML = '';
    initApp();
  }
});

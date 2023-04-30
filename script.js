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

    <textarea class="textarea" id="textarea"></textarea>

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
      if (item.shiftKey) {
        key.setAttribute('keyShift', item.shiftKey);
      }
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
      if (index === 14) {
        key.textContent = item.key;
      }
      key.setAttribute('code', item.code);
      key.setAttribute('key', item.key);
      if (item.shiftKey) {
        key.setAttribute('keyShift', item.shiftKey);
      }
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
      if (item.shiftKey) {
        key.setAttribute('keyShift', item.shiftKey);
      }
      if (item.additionalClass) {
        key.classList.add(`${item.additionalClass}`);
      }
      if (isEnglish) {
        if (index === 39 || index === 40) {
          key.textContent += ` ${item.key}`;
        }
      }

      if (item.code === 'Enter') {
        key.setAttribute('enter', item.enter);
      }
      rows[2].append(key);
    }
    if (index > 41 && index <= 54) {
      const key = document.createElement('div');
      key.classList.add('key');
      key.textContent = item.shiftKey ? item.shiftKey : item.key;
      key.setAttribute('code', item.code);
      key.setAttribute('key', item.key);
      if (item.shiftKey) {
        key.setAttribute('keyShift', item.shiftKey);
      }
      if (item.additionalClass) {
        key.classList.add(`${item.additionalClass}`);
      }
      if (isEnglish) {
        if (index >= 50 && index <= 52) {
          key.textContent += ` ${item.key}`;
        }
      }
      if (!isEnglish) {
        if (index === 52) {
          key.textContent = `${item.shiftKey} ${item.key}`;
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
      if (item.shiftKey) {
        key.setAttribute('keyShift', item.shiftKey);
      }
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

let isCapsLock = JSON.parse(localStorage.getItem('isCapsLock'));

if (isCapsLock === true) {
  document.querySelector('[code=CapsLock]').classList.add('key--active');
}
if (isCapsLock === null) {
  isCapsLock = false;
}
localStorage.setItem('isCapslock', isCapsLock);

window.addEventListener('keydown', lightLetterinVirtualKeyboard);
window.addEventListener('keyup', removeLightLetterinVirtualKeyboard);

let isShift = false;
const keyboard = document.querySelector('.keyboard');

function setCaretPosition(elem, pos) {
  if (elem.setSelectionRange) {
    elem.focus();
    elem.setSelectionRange(pos, pos);
  } else if (elem.createTextRange) {
    const range = elem.createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
  }
}

function deleteLetter() {
  document.querySelector('.textarea').focus();

  const position = document.querySelector('.textarea').selectionStart;
  const text = document.querySelector('.textarea').value;

  document.querySelector('.textarea').value = `${text.slice(0, `${position - 1}`)}${text.slice(position)}`;

  const textarea = document.getElementById('textarea');
  setCaretPosition(textarea, `${position - 1}`);
}

document.querySelector('[code="Backspace"]').addEventListener('click', deleteLetter);

function moveLeft() {
  const position = document.querySelector('.textarea').selectionStart;

  const textarea = document.getElementById('textarea');
  setCaretPosition(textarea, `${position - 1}`);
}

document.querySelector('[code="ArrowLeft"]').addEventListener('click', moveLeft);

function moveRight() {
  const position = document.querySelector('.textarea').selectionStart;

  const textarea = document.getElementById('textarea');
  setCaretPosition(textarea, `${position + 1}`);
}

document.querySelector('[code="ArrowRight"]').addEventListener('click', moveRight);

function deleteNextLetter() {
  document.querySelector('.textarea').focus();

  const position = document.querySelector('.textarea').selectionStart;
  const text = document.querySelector('.textarea').value;

  document.querySelector('.textarea').value = `${text.slice(0, `${position}`)}${text.slice(`${position + 1}`)}`;

  const textarea = document.getElementById('textarea');
  setCaretPosition(textarea, `${position}`);
}

document.querySelector('[code="Delete"]').addEventListener('click', deleteNextLetter);

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

    setTimeout(() => {
      document.querySelector('.keyboard').innerHTML = `<div class="row"></div>
      <div class="row"></div>
      <div class="row"></div>
      <div class="row"></div>
      <div class="row"></div>`;

      if (isEnglish) {
        createKeyboard(keysEng);
      }

      if (!isEnglish) {
        createKeyboard(keysRu);
      }

      if (JSON.parse(localStorage.getItem('isCapsLock')) === true) {
        document.querySelector('[code=CapsLock]').classList.add('key--active');
      }

      document.querySelector('[code=CapsLock]').addEventListener('click', (event) => {
        event.target.classList.toggle('key--active');
        if (event.target.classList.contains('key--active')) {
          localStorage.setItem('isCapsLock', true);
        }
        if (!event.target.classList.contains('key--active')) {
          localStorage.setItem('isCapsLock', false);
        }
      });
      document.querySelector('[code="Backspace"]').addEventListener('click', deleteLetter);
      document.querySelector('[code="Delete"]').addEventListener('click', deleteNextLetter);
      document.querySelector('[code="ArrowRight"]').addEventListener('click', moveRight);
      document.querySelector('[code="ArrowLeft"]').addEventListener('click', moveLeft);
    }, 40);
  }
});

// function printLetter(event) {
//   if (event.target.hasAttribute('keyshift')) {
//     if (document.querySelector(`[code=CapsLock]`).classList.contains('key--active')) {
//       document.querySelector('.textarea').focus();
//       document.querySelector('.textarea').value += event.target.getAttribute('keyshift');
//     } else {
//       document.querySelector('.textarea').focus();
//       if(event.target.getAttribute('code') === 'Tab') {
//         document.querySelector('.textarea').value += event.target.getAttribute('keyshift');
//         return;
//       }
//       document.querySelector('.textarea').value += event.target.getAttribute('key');
//     }
//   }

//   if (event.target.getAttribute('code') === 'Enter') {
//     document.querySelector('.textarea').value += event.target.getAttribute('enter');
//     document.querySelector('.textarea').focus();
//   }

//   const position = document.querySelector('.textarea').selectionStart;
//   console.log(position);
// }

document.querySelector('.textarea').focus();

function printLetter(event) {
  if (event.target.hasAttribute('keyshift')) {
    if (document.querySelector('[code=CapsLock]').classList.contains('key--active')) {
      document.querySelector('.textarea').focus();

      const position = document.querySelector('.textarea').selectionStart;
      const text = document.querySelector('.textarea').value;

      document.querySelector('.textarea').value = `${text.slice(0, position)}${event.target.getAttribute('keyshift')}${text.slice(position)}`;

      const textarea = document.getElementById('textarea');
      setCaretPosition(textarea, `${position + 1}`);
    } else {
      document.querySelector('.textarea').focus();

      if (event.target.getAttribute('code') === 'Tab') {
        document.querySelector('.textarea').focus();
        const position = document.querySelector('.textarea').selectionStart;
        const text = document.querySelector('.textarea').value;
        document.querySelector('.textarea').value = `${text.slice(0, position)}${event.target.getAttribute('keyshift')}${text.slice(position)}`;
        const textarea = document.getElementById('textarea');
        setCaretPosition(textarea, `${position + 1}`);
        return;
      }
      const position = document.querySelector('.textarea').selectionStart;
      const text = document.querySelector('.textarea').value;

      document.querySelector('.textarea').value = `${text.slice(0, position)}${event.target.getAttribute('key')}${text.slice(position)}`;

      const textarea = document.getElementById('textarea');
      setCaretPosition(textarea, `${position + 1}`);
    }
  }

  if (event.target.getAttribute('code') === 'Enter') {
    document.querySelector('.textarea').focus();
    const position = document.querySelector('.textarea').selectionStart;
    const text = document.querySelector('.textarea').value;

    document.querySelector('.textarea').value = `${text.slice(0, position)}${event.target.getAttribute('enter')}${text.slice(position)}`;

    const textarea = document.getElementById('textarea');
    setCaretPosition(textarea, `${position + 1}`);
  }

  // const position = document.querySelector('.textarea').selectionStart;
}

document.querySelector('[code=CapsLock]').addEventListener('click', (event) => {
  event.target.classList.toggle('key--active');
  if (event.target.classList.contains('key--active')) {
    localStorage.setItem('isCapsLock', true);
  }

  if (!event.target.classList.contains('key--active')) {
    localStorage.setItem('isCapsLock', false);
  }
});

keyboard.addEventListener('click', printLetter);

window.onkeydown = (evt) => {
  if (evt.key === 'Tab') {
    evt.preventDefault();
  }
};

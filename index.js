const boardName = document.querySelector('.board-name');
const renamePopUp = document.querySelector('.rename-board');
const closeIcon = document.querySelector('.fas');
const renameBoardForm = document.querySelector('form');

// Retrieves Board Name from Local Storage
localStorage.getItem('boardName') ? boardName.innerHTML = localStorage.getItem('boardName') : '';

function openRenameBoard() {
  renamePopUp.classList.add('open');
}

function closeRenameBoard() {
  renamePopUp.classList.remove('open');
}

function renameBoard(e) {
  e.preventDefault();
  let value = document.querySelector('input[type=text]').value;
  boardName.innerHTML = value;
  localStorage.setItem('boardName', value);
  renamePopUp.classList.remove('open');
  renameBoardForm.reset();
}

boardName.addEventListener('click', openRenameBoard);
closeIcon.addEventListener('click', closeRenameBoard);
renameBoardForm.addEventListener('submit', renameBoard);

const boardName = document.querySelector('.board-name');
const renamePopUp = document.querySelector('.rename-board.wrapper');
const boardCloseIcon = document.querySelector('.close-board');
const listCloseIcon = document.querySelector('.close-list');
const renameBoardForm = document.querySelector('form');
const renameTextField = document.querySelector('.rename-board input[type=text]');
const listTextField = document.querySelector('.create-list input[type=text]');
const canvas = document.querySelector('.canvas');
const addListButton = document.querySelector('.add-list');
const createList = document.querySelector('.create-list');
const createListForm = document.querySelector('.create-list form');

// Retrieves Board Name from Local Storage
localStorage.getItem('boardName') ? boardName.innerHTML = localStorage.getItem('boardName') : '';

// Opens rename board pop up
function openRenameBoard() {
  renamePopUp.classList.add('open');
  renameTextField.focus();
}

// Closes rename board pop up
function closeRenameBoard() {
  renamePopUp.classList.remove('open');
  renameBoardForm.reset();
}
 
// Renames board with user's input value
function renameBoard(e) {
  e.preventDefault();
  let value = renameTextField.value.trim();

  if(value.length < 1) {
    renameBoardForm.reset();
  } else {
    boardName.innerHTML = value;
    localStorage.setItem('boardName', value);
    renamePopUp.style.top = '-50%';
  }
}

// Opens the "Add a list" modal
function addListPopUp() {
  const addListCoords = {
    'top': document.querySelector('.add-list-button').getBoundingClientRect().top,
    'left': document.querySelector('.add-list-button').getBoundingClientRect().left
  }

  createList.style.top = `${addListCoords.top}px`;
  createList.style.left = `${addListCoords.left}px`;

  createList.classList.add('open');
  listTextField.focus();
}

// Closes the "Add a list" modal
function closeList() {
  createList.classList.remove('open');
  createListForm.reset();
}

// Creates a new list column with user's input as the title
function createListColumn(e) {
  e.preventDefault();
  let value = listTextField.value.trim()
  
  if (value.length < 1) {
    createListForm.reset()
  } else {
  const createdList = document.createElement('div');
  createdList.classList.add('list-column');
  canvas.insertBefore(createdList, document.querySelector('.add-list-button'));

  const card = document.createElement('div');
  card.classList.add('card');
  createdList.appendChild(card);

  const cardHeading = document.createElement('div');
  cardHeading.classList.add('card-heading');
  card.appendChild(cardHeading);

  const cardTitle = document.createElement('p');
  cardTitle.classList.add('card-title');
  cardTitle.setAttribute('contenteditable', 'true');
  cardHeading.appendChild(cardTitle);
  cardTitle.innerHTML = value;

  const cardHeadingOptions = document.createElement('span');
  cardHeadingOptions.classList.add('card-options');
  cardHeading.appendChild(cardHeadingOptions);
  cardHeadingOptions.innerHTML = '<i class="fas fa-bars move-list"></i><i class="fas fa-ellipsis-h"></i>';

  const cardContent = document.createElement('div');
  cardContent.classList.add('card-content');
  card.appendChild(cardContent);

  const addCardDetails = document.createElement('a');
  addCardDetails.classList.add('add-card-details');
  card.appendChild(addCardDetails);
  addCardDetails.innerHTML = '<span class="card-details-span">+ Add a card</span>';

  const cardDetailsForm = document.createElement('form');
  addCardDetails.appendChild(cardDetailsForm);
  cardDetailsForm.innerHTML = 
    `<input type='text' class='card-details-input'>
      <div class='submit-options'>
        <span class="invisibile"></span>
        <input type='submit' value = 'Add card' class='add-card'>
        <i class="fas fa-times close-details"></i>
      </div>`

  canvas.id = 'canvas';
  Sortable.create(canvas, {
    handle: '.move-list',
    animation: 150
  });

  addListButton.innerHTML === '+ Add a list' ? addListButton.innerHTML = '+ Add another list' : '';
  closeList();
  createListForm.reset();
  addListPopUp();
  }
}

document.body.addEventListener('click', (e) => {
  let tar = e.target;
  console.log(tar)

  if (tar.className === 'card-details-span') {
    tar.parentNode.classList.add('open');
    console.log(tar.parentNode.previousSibling);
    tar.nextSibling.firstElementChild.focus();
  }

  if (tar.className === 'fas fa-times close-details') {
    tar.parentNode.parentNode.parentNode.classList.remove('open');
    tar.parentNode.parentNode.reset();
  }

  if (tar.className === 'add-card') {
    e.preventDefault();
    const textarea = tar.parentNode.parentNode.firstElementChild;
  
    const newCard = document.createElement('div');
    newCard.classList.add('sub-card');
    
    const textSpan = document.createElement('span');
    textSpan.classList.add('sub-card-title');
    textSpan.setAttribute('contenteditable', 'true');
    newCard.appendChild(textSpan);
    const handle = document.createElement('span');
    handle.innerHTML = "<i class='fas fa-bars'></i><i class='fas fa-ellipsis-h'></i>";
    newCard.appendChild(handle);

    if (textarea.value.trim().length < 1) {
      textarea.parentNode.reset();
      textarea.focus();
    } else {
      textSpan.innerHTML = textarea.value;
      textarea.parentNode.reset();
      const cardContent = tar.parentNode.parentNode.parentNode.previousSibling;
      cardContent.appendChild(newCard);
      textarea.focus();
    }  

    const cardContainer = newCard.parentNode;
    cardContainer.id = 'cardContainer';

    [...document.querySelectorAll('#cardContainer')].map( cardContainer => {
      Sortable.create(cardContainer, {
        handle: '.fa-bars',
        group: 'card',
        animation: 150
      });
    });
  }
});

boardName.addEventListener('click', openRenameBoard);
boardCloseIcon.addEventListener('click', closeRenameBoard);
renameBoardForm.addEventListener('submit', renameBoard);
renamePopUp.addEventListener('transitionend', () => {
  renamePopUp.classList.remove('open');
  renamePopUp.style.top = '75px';
  renameBoardForm.reset();
});
addListButton.addEventListener('click', addListPopUp);
listCloseIcon.addEventListener('click', closeList);
createList.addEventListener('submit', createListColumn);
document.addEventListener('keydown', (e) => {
  if (e.keyCode === 27) {
    createList.className.includes('open') ? closeList() : '';
    renamePopUp.className.includes('open') ? closeRenameBoard() : '';
  }
});

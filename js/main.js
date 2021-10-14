
function addMealList(searchName) {
  if(arguments.length < 1 || searchName.length === 0) return;

  const temp = searchName;
  const mealList = [];
  const url= `https://www.themealdb.com/api/json/v1/1/search.php?s=${temp}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      mealList.push({
        name: temp,
        count: data.meals.length,
      })
      renderItem(mealList, "mealList");
    });
}

function createMealItem(mealItem) {
  const mealTemplate = document.getElementById("MealTemplate");
  if (!mealTemplate) return;

  const trElement = mealTemplate.content.firstElementChild.cloneNode(true);

  const noTdElement = trElement.querySelector(".no");
  const nameTdElement = trElement.querySelector(".name");
  const countTdElement = trElement.querySelector(".count");
  const editButton = trElement.querySelector("#edit");
  const removeButton = trElement.querySelector("#remove");

  
  // render DOM
  noTdElement.textContent = 1;
  nameTdElement.textContent = mealItem.name;
  countTdElement.textContent = mealItem.count;
  trElement.dataset.name = mealItem.name;

  //add event for edit and del
  editButton.addEventListener('click', () => {
    handlerEditClick(mealItem.name);
  });
  removeButton.addEventListener('click', () => {
    handlerRemoveClick(mealItem.name, mealItem.count);
  });

  return trElement;
}
function handlerEditClick(name) {
  // show update modal
  showModal('Edit meal','Update', name);
  // populate temp
  //handle click update button
}
function handlerRemoveClick(name, count) {
  // show delete modal
  showModal('Delete','Delete', name, count);
}

function showModal(title, textButton, name, count) {
  // init modal
  const modalTemplate = document.querySelector('#modal');

  const modal  = document.querySelector('.modal')

  const titleModal = modal.querySelector('.modal-title');
  const textModal = modal.querySelector('.modal-body');
  const modalButton = modal.querySelector('.modal-footer > .btn');

  titleModal.textContent = title;
  modalButton.textContent = textButton;

  if(modalButton.textContent.toLowerCase() === 'delete') {
    textModal.textContent = `Are you want to delete "${capitalize(name)}" with the count is ${count}`;
  }

  if(name.toLowerCase() === 'update') {
    // show input
    // update text
  }
  modal.dataset.name = '';
  modal.dataset.name = name;

  // show modal
  modal.style.display = 'block';
}

function renderItem(mealList, mealListId) {
  if (!Array.isArray(mealList) || mealList.length === 0) return [];

  const tbodyElelment = document.getElementById(mealListId);
  if (!tbodyElelment) return;

  mealList.forEach((meal) => {
    const trEleMent = createMealItem(meal);
    tbodyElelment.appendChild(trEleMent);
  });
}

function capitalize(word) {
  const letterList = word.split("");
  const [first, ...rest] = letterList;

  return `${first.toUpperCase()}${rest.join('')}`
}


(() => {
  addMealList('chicken');
  addMealList('pie');
  addMealList('arrabiata');
  
  const modal = document.querySelector('.modal');
  const CloseModalButton = document.querySelector('.btn-close');
  if(CloseModalButton) {
    CloseModalButton.addEventListener('click', () => {
      modal.style.display = 'none';
    })
  }

  const modalButton = document.querySelector('.btn') 
  if(!modalButton) return;

  modalButton.addEventListener('click', () => {
    const trElementList = document.querySelectorAll('#mealList > tr')

    if(modalButton.textContent === 'Delete') {
      trElementList.forEach(trElement => {
        if(trElement.dataset.name === modal.dataset.name) {
          trElement.remove();
        }
      })
    }

    if(modalButton.textContent === 'Update') {

    }

    if(modalButton.textContent === 'Add') {

    }


    // hide modal
    modal.style.display = 'none';
  })
})();

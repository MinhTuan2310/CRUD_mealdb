function addMealList(searchName) {
  if (arguments.length < 1 || searchName.length === 0) return;

  const temp = searchName;
  const mealList = [];
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${temp}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      mealList.push({
        name: temp,
        count: data.meals?.length || 0,
      });
      renderItem(mealList, "mealList");
    })
    .catch((err) => {
      console.error(err)
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
  editButton.addEventListener("click", () => {
    handlerEditClick(mealItem.name);
  });
  removeButton.addEventListener("click", () => {
    handlerRemoveClick(mealItem.name, mealItem.count);
  });

  return trElement;
}
function handlerEditClick(name) {
  // show update modal
  showModal("Edit meal", "Update", name);
  // populate temp
  //handle click update button
}
function handlerRemoveClick(name, count) {
  // show delete modal
  showModal("Delete", "Delete", name, count);
}

function showModal(title, textButton, name, count) {
  // init modal
  const modalTemplate = document.querySelector("#modal");

  const modal = document.querySelector(".modal");

  const titleModal = modal.querySelector(".modal-title");
  const textModal = modal.querySelector(".modal-body");
  const modalButton = modal.querySelector(".modal-footer > .btn");

  titleModal.textContent = title;
  modalButton.textContent = textButton;

  if (modalButton.textContent.toLowerCase() === "delete") {
    textModal.textContent = `Are you want to delete "${capitalize(
      name
    )}" with the count is ${count || 0} ?`;
  }

  if (name.toLowerCase() === "update") {
    // show input
    // update text
  }
  modal.dataset.name = "";
  modal.dataset.name = name;

  // show modal
  modal.style.display = "block";
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

  return `${first.toUpperCase()}${rest.join("")}`;
}

function showModalForm(title, name, count) {
  const modalForm = document.querySelector(".modal-form");
  if (!modalForm) return;
  const modalFormTitle = modalForm.querySelector(".modal-title");
  if (!modalFormTitle) return;
  const modalFormDesc = modalForm.querySelector("small");
  if (!modalFormDesc) return;
  const modalButton = modalForm.querySelector(".btn");
  if (!modalButton) return;

  // show modal
  modalForm.style.display = "block";

  // add props for modal form
  if (title === "Add new") {
    modalFormTitle.textContent = title;
    modalFormDesc.textContent = "Input the meal name will count";
    modalButton.textContent = "Add";
  }

  if (title === "Eadit meal") {
    // show title
    modalFormTitle.textContent = title;
    // populate name into input value

    // show the count

    // update buttontext
    modalButton.textContent = "Update";
  }
}

function handlerAddButton() {
  // show modal
  showModalForm("Add new", 1);
}

function handlerFormSubmit(event) {
  const modalForm = document.querySelector("form");
  const inputForm = modalForm.querySelector("input[type=text]");

  addMealList(inputForm.value);
  inputForm.value = '';
}

(() => {
  addMealList("chicken");
  addMealList("pie");
  addMealList("arrabiata");

  const modal = document.querySelector(".modal");
  const CloseModalButton = document.querySelector(".btn-close");
  if (CloseModalButton) {
    CloseModalButton.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  const deleteButton = modal.querySelector(".btn");
  if (!deleteButton) return;

  deleteButton.addEventListener("click", () => {
    const trElementList = document.querySelectorAll("#mealList > tr");

    trElementList.forEach((trElement) => {
      if (trElement.dataset.name === modal.dataset.name) {
        trElement.remove();
      }
    });

    // hide modal
    modal.style.display = "none";
  });

  const addButton = document.getElementById("add");
  addButton.addEventListener("click", handlerAddButton);

  const modalForm = document.querySelector(".modal-form");
  const closeModalFormButton = document.querySelector(".modal-form .btn-close");
  if (closeModalFormButton) {
    closeModalFormButton.addEventListener("click", () => {
      modalForm.style.display = "none";
    });
  }

  // handler add new button
  // const modalFromButton = document.querySelector(".modal-form .btn");
  // if (modalFromButton) {
  //   modalFromButton.addEventListener("click", handlerFormButton);
  // }

  const form = document.querySelector("form");
  if(!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    handlerFormSubmit();
  })
})();

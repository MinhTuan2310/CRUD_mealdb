function addMealList(searchName, mode, trElement) {
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
      if (mode === "Update") {
        updateItem(mealList, trElement);
        return;
      }

      renderItem(mealList, "mealList");
    })
    .catch((err) => {
      console.error(err);
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
  editButton.addEventListener("click", (e) => {
    handlerEditClick(e.target.parentNode.parentNode.dataset.name, e.target.parentNode.parentNode.dataset.count || mealItem.count);
  });
  removeButton.addEventListener("click", (e) => {
    handlerRemoveClick(e.target.parentNode.parentNode.dataset.name, e.target.parentNode.parentNode.dataset.count || mealItem.count);
  });

  return trElement;
}
function handlerEditClick(name, count) {
  // show update modal
  // console.log(name, count);
  showModalForm("Edit meal", name, count);
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
  const modalFormText = modalForm.querySelector(".form-text");
  if (!modalFormText) return;
  const form = modalForm.querySelector("form");
  if (!form) return;
  const inputForm = modalForm.querySelector("input");
  if(!inputForm) return;

  // show modal
  modalForm.style.display = "block";
  // add name trElement into form element
  form.dataset.name = name;

  // add props for modal form
  if (title === "Add new") {
    inputForm.value = '';
    modalFormText.textContent = '';

    modalFormTitle.textContent = title;
    modalFormDesc.textContent = "Input the meal name will count";
    modalButton.textContent = "Add";
  }

  if (title === "Edit meal") {
    // show title
    modalFormTitle.textContent = title;
    // populate name into input value
    inputForm.value = capitalize(name);
    // show the desc
    modalFormText.textContent = `The count is ${count || 0}`;
    // hide desc text
    modalFormDesc.textContent = "";
    // update buttontext
    modalButton.textContent = "Update";
  }
}

function handlerAddButton() {
  // show modal
  showModalForm("Add new");
}

function handlerFormSubmit(event) {
  const modalForm = document.querySelector(".modal-form");
  const inputForm = modalForm.querySelector("input[type=text]");
  const form = modalForm.querySelector("form");
  const formText = modalForm.querySelector('.form-text');

  if (modalForm.querySelector(".btn").textContent === "Add") {
    addMealList(inputForm.value);
  }

  if (modalForm.querySelector(".btn").textContent === "Update") {
    // udpdate mealList
    const trElementList = document.querySelectorAll("#mealList > tr");
    trElementList.forEach((trElement) => {
      if (trElement.dataset.name === form.dataset.name) {
        addMealList(inputForm.value, "Update", trElement);
      }
    });

    // update input form


    // close modalForm
    modalForm.style.display = "none";
  }

  // reset
  inputForm.value = "";
  formText.textContent = "";
}

function updateItem(mealList, trElement) {
  const nameTrElement = trElement.querySelector(".name");
  const countTrElement = trElement.querySelector(".count");

  nameTrElement.textContent = mealList[0].name;
  countTrElement.textContent = mealList[0].count;

  
  nameTrElement.parentNode.dataset.name = nameTrElement.textContent;
  countTrElement.parentNode.dataset.count = countTrElement.textContent;
  console.log(countTrElement.parentNode.dataset.count);
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

  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    handlerFormSubmit();
  });
})();

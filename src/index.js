import moment from 'moment';
import React from 'react';
import ReactDom from 'react-dom';

// Инициируем элементы
const form = document.querySelector('.toDoForm');
const searchField = document.querySelector('.searchField');
const titleField = document.querySelector('.title');
const descriptionField = document.querySelector('.description');
const workSpace = document.querySelector('.workSpace');
const stringOfResult = document.querySelector('.result');
const counterOfComplited = document.querySelector('.counterOfComplited');
const uncomplitedStatus = document.querySelector('.uncompl');
const complitedStatus = document.querySelector('.compl');
const clearDataButton = document.querySelector('.clearData');

// Инициируем массив задач

let tasks = [];
let complitedTasks = [];

let countOfComplit = 0;

// Первичная отрисовка 
let lsTasks = JSON.parse(localStorage.getItem('lsTasks'));
console.log(lsTasks);
let lsComplitedTasks = JSON.parse(localStorage.getItem('lsComplitedTasks'));
console.log(lsComplitedTasks);
stringOfResult.dataset.vievStatus = 'uncomplited';

if (lsTasks != null) {
  tasks = [...lsTasks];
}
if (lsComplitedTasks != null) {
  complitedTasks = [...lsComplitedTasks];
}

renderPage(tasks);


function createTask (task, index, status) {
  let wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');
  
  let text = document.createElement('div');
  text.classList.add('textInfo');

    let tagForTitle = document.createElement('h3');
    tagForTitle.innerHTML = index+1 +'. '+ task.title;
    text.append(tagForTitle);

    let tagForDescription = document.createElement('p');
    tagForDescription.innerHTML = task.description;
    text.append(tagForDescription);  

  wrapper.append(text);

  let functions = document.createElement('div');
  functions.classList.add('functions');

  let buttonForDelete = document.createElement('button');
  buttonForDelete.classList.add('deleteButton');
  buttonForDelete.classList.add('hide');
    let redCross = document.createElement('span');
    let redCross2 = document.createElement('span');
    buttonForDelete.append(redCross);
    buttonForDelete.append(redCross2);
    buttonForDelete.disabled = true;
  buttonForDelete.onclick = function() {
    complitedTasks.push(...tasks.splice(index, 1));
    countOfComplit--; 
    localStorage.setItem("lsTasks", JSON.stringify(tasks));
    localStorage.setItem("lsComplitedTasks", JSON.stringify(complitedTasks));

    renderPage(tasks);
  }

  const checkbox = document.createElement('span');
  checkbox.classList.add('checkbox');
  checkbox.onclick = function () {
    tasks[index].checkboxStatus = !tasks[index].checkboxStatus;
    countOfComplit++;
    renderPage(tasks);
  }
  functions.append(checkbox); 

  if (status === true) {
    checkbox.classList.add('hide');
    wrapper.classList.add('approved');
    buttonForDelete.disabled = !buttonForDelete.disabled;
    buttonForDelete.classList.add('deleteButton_hover');
    buttonForDelete.classList.remove('hide');
  }

  if (stringOfResult.dataset.vievStatus !== 'complited') {
    functions.appendChild(buttonForDelete);
  }

  wrapper.append(functions);

  return wrapper;
} 

function renderPage (array) {
  workSpace.innerHTML = '';
  
  array.forEach((elem, index) => {
    let createdMarkup = createTask(elem, index, elem.checkboxStatus);
    workSpace.appendChild(createdMarkup);
  })

  if (stringOfResult.dataset.vievStatus === 'uncomplited') {
    counterOfComplited.innerHTML = countOfComplit + ' complited tasks';
  } else if (stringOfResult.dataset.vievStatus === 'complited') {
    counterOfComplited.innerHTML = complitedTasks.length + ' complited tasks';
  }

}


form.onsubmit = (event) => {
  event.preventDefault();

  const title = titleField.value.trim();
  const description = descriptionField.value.trim();

  form.reset();

  const task = {
    title, 
    description,
    checkboxStatus: false,
  }



  if (title === '') {
    titleField.classList.add('notApproved');
  } else {
    titleField.classList.remove('notApproved');
    tasks.push(task);

    localStorage.setItem("lsTasks", JSON.stringify(tasks));

    renderPage(tasks);  
  }
}
uncomplitedStatus.onclick = () => {
  complitedStatus.classList.remove('focusedStatus');
  uncomplitedStatus.classList.add('focusedStatus');
  uncomplitedStatus.disabled = true;
  stringOfResult.dataset.vievStatus = 'uncomplited';
  renderPage(tasks);
} 
complitedStatus.onclick = () => {
  uncomplitedStatus.classList.remove('focusedStatus');
  complitedStatus.classList.add('focusedStatus');
  complitedStatus.disabled = true;
  stringOfResult.dataset.vievStatus = 'complited';
  renderPage(complitedTasks);
}
clearDataButton.onclick = () => {
  if (stringOfResult.dataset.vievStatus === 'uncomplited'){
    tasks = [];
    localStorage.setItem("lsTasks", JSON.stringify(tasks));
    renderPage(tasks);
  } else if (stringOfResult.dataset.vievStatus === 'complited') {
    complitedTasks = [];
    localStorage.setItem("lsComplitedTasks", JSON.stringify(complitedTasks));
    renderPage(complitedTasks);
  }
}
searchField.oninput = () => {
  let searchPrase = searchField.value.trim().toLowerCase();
  const searchedTasks = [];

  if (stringOfResult.dataset.vievStatus === 'uncomplited') {
    createFiltered (tasks, searchPrase, searchedTasks);
  } else if (stringOfResult.dataset.vievStatus === 'complited') {
    createFiltered (complitedTasks, searchPrase, searchedTasks);
  }

  renderPage(searchedTasks);
}

function createFiltered (inputArray, searchPrase, outputArray ) {
  inputArray.forEach((task) => {
    if (task.title.toLowerCase().includes(searchPrase)) {
      const searchedTask = {...task};
      
      const index = searchedTask.title.toLowerCase().indexOf(searchPrase);
      console.log(index);
      
      searchedTask.title = `${searchedTask.title.slice(0, index)}<span class="highlight">${searchedTask.title.slice(index, index+searchPrase.length)}</span>${searchedTask.title.slice(index + searchPrase.length, searchedTask.title.length)}`;
      console.log(searchedTask.title);
      outputArray.push(searchedTask);
    }
  })
}
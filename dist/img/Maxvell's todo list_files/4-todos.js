var form = document.querySelector('.toDoForm');
var searchField = document.querySelector('.searchField');
var buttonForAdd = document.querySelector('.buttonForAdd');
var tasksField = document.querySelector('.tasksField');
var tasks = [];

function createTask(task, index) {
  var wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');

  var checkbox = document.createElement('input');
  checkbox.style = 'checkbox';
  wrapper.appendChild(checkbox); 
  checkbox.checked = task.status;
  checkbox.onchange = function() {
    tasks[index].status = !tasks[index].status;
  }
  
  var tagForTitle = document.createElement('h3');
  tagForTitle.textContent = task.title;
  wrapper.appendChild(tagForTitle);
  
  var tagForDiscription = document.createElement('p');
  tagForDiscription.textContent = task.discription;
  wrapper.appendChild(tegForDiscription);  

  var buttonForDelete = document.createElement('button');
  buttonForDelete.textContent = 'Удалить';
  wrapper.appendChild(buttonForDelete);
  buttonForDelete.onclick = function() {
    tasks.splice(index, 1);
    renderHtml(tasks);
  }

  return wrapper;
}

function renderPage(array) {
  tasksField.innerHTML = '';
  for (var i = 0; i < array.length; i++) {
    var createdMarkup = createTask(array[i], i);
    body.appendChild(createdMarkup);
  }
}


buttonForAdd.onsubmit = function(event) {
  event.preventDefault();
  var titleField = document.querySelector('.title');
  var title = titleField.value;
  var discriptionField = document.querySelector('.discription');
  var discription = discriptionField.value;
  form.reset();
  var task = {
    title: title, 
    discription: discription,
    checkboxStatus: false,
  }
  tasks.push(task);
  renderPage(tasks);
}
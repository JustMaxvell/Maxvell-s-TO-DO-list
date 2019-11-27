// 1

// function multiply (a, b) {
//   return a * b;
// }

// 2
var nameField = document.querySelector('.nameField');
var nameOutputString = document.querySelector('.nameOutputString');
function greet(name){
  nameOutputString.innerHTML = '';
  var name = nameField.value;
  var tagForGreet = document.createElement('div');
  tagForGreet.classList.add('greeting');
  tagForGreet.textContent = 'Hello, ' + name + ' , how are you doing today?';
  nameOutputString.appendChild(tagForGreet);
}

nameField.onchange = function() {
  greet();
}

// 3 

function getSmallest (array) {
  var smallestElement = array[0];
  array.forEach(function (elem) {
    if (elem < smallestElement) {
      smallestElement = elem;
    }
  })
  return smallestElement;
}

// 4

function toWeirdCase(string) {
  var letters = string.split('');
  var newLetters = letters.map(function(elem, index) {
    if (index % 2 === 0 || index === 0) {
      return elem.toUpperCase();
    } else {
      return elem.toLowerCase();
    }
  })
  var weirdSrting = newLetters.join('');
  return weirdSrting;
}

// 5

function findeUniq (array) {
  // Не работает, если уникальный элемент стоит первым
  // var temp = array[0];
  // var uniq = array.filter(function (elem) {
  // return elem != temp;
  // });
  // return uniq;

  // Не гибкое решение
  var temp = array[0];
  var firstStack = array.filter(function (elem) {
    return elem != temp;
  });
  if (firstStack.length === 1) {
    return firstStack[0];
  } else {
    var secondStack = array.filter(function (elem) {
      return elem != firstStack[0];
    });
    return secondStack;
    
  }
}
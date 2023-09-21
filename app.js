let section = document.querySelector("section");
let add = document.querySelector("form button");
let sort = document.querySelector("div.sort button");


//Function for Add To Do List
function addTodo(inputText, inputDate, _isnew) {
  let todoText = inputText;
  let todoDate = inputDate;

  let todo = document.createElement("div");
  todo.classList.add("todo");
  let text = document.createElement("p");
  text.classList.add("todoText");
  text.innerText = todoText;
  let time = document.createElement("p");
  time.classList.add("todoDate");
  time.innerText = todoDate;
  todo.appendChild(text);
  todo.appendChild(time);

  let checkButton = document.createElement("button");
  checkButton.classList.add("check");
  checkButton.innerHTML = '<i class="fa-solid fa-check"></i>';
  checkButton.addEventListener("click", e => {
    e.target.parentElement.children[0].classList.toggle("delLine");
    e.target.parentElement.children[1].classList.toggle("delLine");
    e.target.parentElement.children[2].classList.toggle("delLine");
    e.target.parentElement.children[3].classList.toggle("delLine");
  })

  let trashButton = document.createElement("button");
  trashButton.classList.add("trash");
  trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  trashButton.addEventListener("click", e => {
    e.target.parentElement.addEventListener("animationend", eve => {
      let nowText = e.target.parentElement.children[0].innerText;
      let nowDate = e.target.parentElement.children[1].innerText;
      console.log(nowText + nowDate);
      let myListArray = JSON.parse(localStorage.getItem("list"));
      myListArray.forEach((item, index) => {
        if(item.todoText === nowText && item.todoDate === nowDate) {
          myListArray.splice(index, 1);
          localStorage.setItem("list", JSON.stringify(myListArray));
        }
      });
      eve.target.remove();
    })

    e.target.parentElement.style.animation = "scaleDown 0.2s forwards";
  })

  todo.appendChild(checkButton);
  todo.appendChild(trashButton);

  todo.style.animation = "scaleUp 0.2s forwards";

  section.appendChild(todo);
}


//Add New To Do
add.addEventListener("click", (e) => {
  e.preventDefault();

  let form = e.target.parentElement;

  if(form.children[0].value === "") {
    alert("To Do can't be empty!");
    return;
  }

  let todoText = form.children[0].value;
  let todoDate = form.children[1].value;

  addTodo(todoText, todoDate, true);

  let myTo = {
    todoText,
    todoDate
  }

  let myList = localStorage.getItem("list");
  if(myList == null) {
    localStorage.setItem("list", JSON.stringify([myTo]));
  }
  else {
    let myListArray = JSON.parse(myList);
    myListArray.push(myTo);
    localStorage.setItem("list", JSON.stringify(myListArray));
  }

  form.children[0].value = "";
  form.children[1].value = "";

});


//Show To Do List from LocalStorage
let myList = localStorage.getItem("list");
if(myList !== null) {
  let myListArray = JSON.parse(myList);
  
  myListArray.forEach(item => {
    addTodo(item.todoText, item.todoDate, false);
  });
}

sort.addEventListener("click", e => {
  console.log(section.children.length);
  if(section.children.length == 0) {
    return;
  }
  else {
    for (let i = 0; i < section.children.length; i++) {
      let nowNum = i;
      console.log("i = " + i);
      let nowList = section.children[i];
      for (let j = i+1; j < section.children.length; j++) {
        console.log("j = " + j);
        if(nowList.children[1].innerText > section.children[j].children[1].innerText) {
          nowList = section.children[j];
          nowNum = j;
        }
      }
      section.removeChild(section.children[nowNum]);
      section.insertBefore(nowList, section.children[i]);
    }
  }
})
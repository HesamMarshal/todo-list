// functions:
function addTodo(e) {
    e.preventDefault();
    // console.log(e);
    // get todo value
    // create new todo
    // add to DOM
    // reset input

    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    const newTodo = `
                <li>${todoInput.value}</li>
                <span><i class="far fa-check-square"></i></span>
                <span><i class="far fa-trash-alt"></i></span>`;
    todoDiv.innerHTML = newTodo;
    const todoList = document.querySelector(".todo-container");
    todoList.append(todoDiv)
    saveLocalTodos(todoInput.value);
    todoInput.value = "";

}
function checkRemove(e) {
    const classList = [...e.target.classList];
    const item = e.target;
    // console.log(item.parentElement.parentElement);
    // console.log(classList)
    if (classList[1] === "fa-check-square") {
        const todo = item.parentElement.parentElement;
        todo.classList.toggle("completed");

    }
    else if (classList[1] === "fa-trash-alt") {
        const todo = item.parentElement.parentElement;
        removeLocalTodos(todo);
        todo.remove();

    }
}

function filterTodos(e) {
    // console.log(e.target.value);
    // console.log(todoList.childNodes);
    const todos = [...todoList.childNodes];
    todos.forEach(todo => {
        switch (e.target.value) {
            case 'all':
                todo.style.display = "flex";
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;

            case 'uncompleted':
                if (todo.classList.contains('uncompleted')) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;
        }
    });


}
// Local Storage
function getLocalTodos() {


    let savedTodos = localStorage.getItem('todos')
        ? JSON.parse(localStorage.getItem('todos'))
        : [];
    savedTodos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
        const newTodo = `
                <li>${todo}</li>
                <span><i class="far fa-check-square"></i></span>
                <span><i class="far fa-trash-alt"></i></span>`;
        todoDiv.innerHTML = newTodo;
        const todoList = document.querySelector(".todo-container");
        todoList.append(todoDiv)
    })

}
function saveLocalTodos(todo) {
    // console.log(todo);
    // localStorage.getItem('todos');
    // localStorage.setItem('todos', JSON.stringify(todos));

    let savedTodos = localStorage.getItem('todos')
        ? JSON.parse(localStorage.getItem('todos'))
        : [];
    savedTodos.push(todo);
    // console.log(savedTodos);
    localStorage.setItem('todos', JSON.stringify(savedTodos));

}

function removeLocalTodos(todo) {
    // console.log(todo.children[0].innerText);

    let savedTodos = localStorage.getItem('todos')
        ? JSON.parse(localStorage.getItem('todos'))
        : [];

    const newTodos = savedTodos.filter(t => t !== todo.children[0].innerText);
    localStorage.setItem('todos', JSON.stringify(newTodos));
}

// selectors:
const todoInput = document.querySelector(".todo-input");
const addBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-container");
const filterOption = document.querySelector(".filter-todos");


// event listeners:
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', checkRemove);
filterOption.addEventListener('click', filterTodos);
document.addEventListener("DOMContentLoaded", getLocalTodos);
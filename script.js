const inputEle = document.getElementById("input")
const addButton = document.getElementById("button")
const todoContainer = document.getElementById("todo-container")
let todoList = []
let todo;

addButton.addEventListener("click", (e)=> {
    e.preventDefault()
    todo = inputEle.value
    if(todo.length > 0) {
        todoList.push({id : Date.now(), todo: todo, isCompleted:false})
        addTodo()
        inputEle.value = ""
    }
})

todoContainer.addEventListener("click", (e)=>{
    let key = e.target.dataset.key
    let delKey = e.target.dataset.delkey

    todoList = todoList.map(todo => 
        todo.id === Number(key) ? {...todo, isCompleted: !todo.isCompleted} : todo
    )
    todoList = todoList.filter(todo => todo.id !== Number(delKey))

    addTodo()
})

function addTodo() {
    todoContainer.innerHTML = todoList.map(({id, todo, isCompleted})=> {
        return `
        <div class="todo-item">
            <input type="checkbox" id="item-${id}" data-key="${id}" ${isCompleted ? "checked" : ""}>
            <p data-key="${id}">${todo}</p>
            <button data-delkey="${id}">Delete</button>
        </div>
        `
    }).join("")
}
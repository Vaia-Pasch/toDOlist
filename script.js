const listsContainer = document.querySelector("[data-lists]");
const newListForm = document.querySelector("data-new-list-form");
const newListInput = document.querySelector("data-new-list-input");

const localStorageListKey = "task.lists";
const localStorageSelectedListIdKey = "task.selectedListId"

let lists = JSON.parse(localStorage.getItem(localStorageListKey)) || [];
let selectedListId = localStorage.getItem(localStorageSelectedListIdKey);

listsContainer.addEventListener("click", e => {
    if(e.target.tagName.toLowerCase() === "li") {
       selectedListId = e.target.dataset.listId 
       saveAndRender()
    }
})

newListForm.addEventListener("submit", e => {
    e.preventDefault()
    const listName = newListInput.value
    if (listName == null || listName === "") return
    const list = createList(listName)
    newListInput.value = null
    lists.push(list)
    saveAndRender()
  })
  

function createList(name) {
    return { id: Date.now().toString(), name: name, tasks: []}
}

function saveAndRender () {
    save()
    render()
}

function save() {
    localStorage.setItem(localStorageListKey, JSON.stringify(lists))
}

function render() {
    clearElement(listsContainer)
    lists.forEach(list => {
       const listElement = document.createElement("li")
       listElement.dataset.listId = list.id 
       listElement.classList.add("list-name")
       listElement.innerHTML = list.name
       if (list.id === selectedListId) listElement.classList.add("active-list")
       listsContainer.appendChild(listElement)
    });
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

render();
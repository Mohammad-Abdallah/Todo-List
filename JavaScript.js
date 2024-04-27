let arrTask = [];
let doneArr = [];
let todoArr = [];
let taskIdCounter = 0;


// Check if There are Tasks In Local Storage
if (localStorage.getItem("tasks")) {
    arrTask = JSON.parse(localStorage.getItem("tasks"));
}


// Trigger Get Data From Local Storage Function
getDataFromLocalStorage();

// Add New Task Function
function addNewTask(){
    let taskText = document.getElementById("inputField").value;
    let regExp = /^[A-Za-z]+$/;
    if (taskText.value !== "") { 
        // Create object for every non-empty input field
        const newTask = {
            id: taskIdCounter++,
            text: taskText,
            done: false,
        };
        // Ensure the input field contains only characters
        if (!regExp.test(taskText)) {
            let Popup = document.querySelector('.warningPopup');
            Popup.classList.add('openWarningPopup');
        } else {
            arrTask.push(newTask);
        }
    }
    addDataToLocalStorageFrom(arrTask);
    // Clear the input field value
    document.getElementById("inputField").value = '';
} 

function addDataToLocalStorageFrom() {
    window.localStorage.setItem("tasks", JSON.stringify(arrTask));
}

function getDataFromLocalStorage() {
    let data = localStorage.getItem("tasks");
    if (data == true) {
        arrTask = JSON.parse(data);
        updateDisplay();
    }
}

// Create Task Element Function
function createTaskElements(task){
    const taskContainer = document.querySelector('.taskContainer');
    const taskElement = document.createElement('div');
        taskElement.classList.add('TasksList');
        taskElement.innerHTML = `
            <div class="content">
                <p id='${task.id}' class="${task.done ? 'done-task' : ''}">${task.text}</p>
            </div>
            <div class="Icons">
                <input type="checkbox"  class="checkbox" onchange="updateCheckbox(${task.id})" ${task.done ? 'checked' : ''}>
                <button type="button" class="edit" onclick="openEditPopup(${task.id},'${task.text}')"><i class='fas fa-pen'></i></button>
                <button type="button" class="delete" onclick="openDeletePopup(${task.id})"><i class="fas fa-trash"></i></button>
            </div>
        `;
        taskContainer.appendChild(taskElement);
}



//End Create Task Element Function

//Start eventListener


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("inputField").addEventListener('keypress',function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("addTaskButton").click();
            document.getElementById("allButton").click();
        }
    });
    
    document.getElementById("allButton").addEventListener("click", function() {
        document.querySelectorAll('.Buttons button').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        updateDisplay(); 
    });
    document.getElementById("doneButton").addEventListener("click", function() {
        document.querySelectorAll('.Buttons button').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        updateDisplay(); 
    });
    document.getElementById("todoButton").addEventListener("click", function() {
        document.querySelectorAll('.Buttons button').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        updateDisplay(); 
    });

    document.getElementById("newText").addEventListener('keypress',function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("edit").click();
        }
    });

    document.getElementById("allButton").click();
    updateDisplay();


});

//End eventListener 

//Start Display All Tasks Function
function displayAllTasks(){
    document.querySelector('.taskContainer').innerHTML = '';
    arrTask.forEach(task => createTaskElements(task) );
}
//End Display All Tasks Function

//Start display done task function
function displayDoneTasks(){
    document.querySelector('.taskContainer').innerHTML = '';
    doneArr=arrTask.filter(task => task.done );
    doneArr.forEach(task=> createTaskElements(task));

}
//End display done task function

//Start display Todo task function
function displayTodoTasks() {
    document.querySelector('.taskContainer').innerHTML = '';
    todoArr=arrTask.filter(task => !task.done );
    todoArr.forEach(task=> createTaskElements(task));
}
//End display Todo task function

//Start updateCheckbox function
function updateCheckbox(taskId) {
    let task = arrTask.find(task => task.id === taskId);
    task.done = !task.done; 
    const taskElement = document.getElementById(taskId);
    taskElement.classList.toggle('done-task', task.done);
    if (task.done) {
        doneArr.push(task);   
        todoArr = todoArr.filter(task => task.id !== taskId);
    } else {
        
        todoArr.push(task);
        doneArr = doneArr.filter(task => task.id !== taskId);
    }
    addDataToLocalStorageFrom(arrTask);
    updateDisplay();
}
//End updateCheckbox function

//Start updateDisplay function
function updateDisplay() {
    const allButton = document.getElementById("allButton");
    const doneButton = document.getElementById("doneButton");
    if (allButton.classList.contains("active")) {
        displayAllTasks();
    } else if (doneButton.classList.contains("active")) {
        displayDoneTasks();
    } else {
        displayTodoTasks();
    }
}
//End updateDisplay function

//Start closeWarningPopup function
function closeWarningPopup(){
    let Popup=document.querySelector('.warningPopup');
    Popup.classList.remove('openWarningPopup');
}
//End closeWarningPopup function

let taskIdToEdit;
//Start openEditPopup function
function openEditPopup(taskId,taskText){
    taskIdToEdit=taskId;
    document.getElementById('editTaskText').textContent= `Edit ${taskText} task`;
    let editPopup=document.querySelector(".editPopup");
    editPopup.classList.add("openEditPopup")
}
//End openEditPopup function

//Start editTask function
function editTask() {  

    arrTask.forEach(task=>{
        if(task.id == taskIdToEdit){
            let indexTask=arrTask.indexOf(task);
            let regExp=/^[A-Za-z]+$/;
            if(regExp.test(task.text)){
                arrTask[indexTask].text=document.getElementById('newText').value;
                
            }
            /*else{
                Popup
            } */
        }
    });

    

    doneArr.forEach(task=>{
        if(task.id == taskIdToEdit){
            let indexTask=doneArr.indexOf(task);
            let regExp=/^[A-Za-z]+$/;
            if(regExp.test(task.text)){
                doneArr[indexTask].text=document.getElementById('newText').value;
            }
            /*else{
                Popup
            } */
        }
    });

    todoArr.forEach(task=>{
        if(task.id == taskIdToEdit){
            let indexTask=todoArr.indexOf(task);
            let regExp=/^[A-Za-z]+$/;
            if(regExp.test(task.text)){
                todoArr[indexTask].text=document.getElementById('newText').value;
            }
            /*else{
                Popup warning
            } */
        }
    });
    updateDisplay();
    closeEditPopup();
    addDataToLocalStorageFrom(arrTask);
    document.getElementById('newText').value='';
}
//End editTask function

//Start closeEditPopup function
function closeEditPopup(){
    let editPopup=document.querySelector(".editPopup");
    editPopup.classList.remove("openEditPopup");
}
//End closeEditPopup function

let taskIdToDelete;
//Start openDeletePopup function
function openDeletePopup(taskId) {
    taskIdToDelete = taskId;
    let popup = document.querySelector(".deletePopup");
    popup.classList.add("openPopup");
}
//End openDeletePopup function

//Start closeDeletePopup function
function closeDeletePopup(){
    let popup = document.querySelector(".deletePopup");
    popup.classList.remove("openPopup");
}
//End closeDeletePopup function

//Start openYesPopup function
function openYesPopup() {
    let popup = document.querySelector(".yesPopup");
    popup.classList.add("openPopup");
    closeDeletePopup();

    
    arrTask = arrTask.filter(task => task.id !== taskIdToDelete);
    doneArr = doneArr.filter(task => task.id !== taskIdToDelete);
    todoArr = todoArr.filter(task => task.id !== taskIdToDelete);

    updateDisplay();
    addDataToLocalStorageFrom(arrTask);
}
//End openYesPopup function

//Start closeYesPopup function
function closeYesPopup(){
    let popup = document.querySelector(".yesPopup");
    popup.classList.remove("openPopup");
}
//End closeYesPopup function

//Start deleteDoneTasks function
function deleteDoneTasks(){
    arrTask = arrTask.filter(task => !task.done);
    doneArr = []; 
    addDataToLocalStorageFrom(arrTask);
    updateDisplay();
}
//End deleteDoneTasks function

//Start deleteAllTasks function
function deleteAllTasks(){
    arrTask=[];
    addDataToLocalStorageFrom(arrTask);
    updateDisplay();
}
//End deleteAllTasks function








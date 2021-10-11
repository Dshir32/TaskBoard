let allTasks = [];
const textInputElement = document.getElementById('text');
const dateInputElement = document.getElementById('date');
const timeInputElement = document.getElementById('time');
const textAlertSpan = document.getElementById('textAlert');
const dateAlertSpan = document.getElementById('dateAlert');

function clearForm(){
    document.getElementById("tasksForm").reset();
    textInputElement.style.backgroundColor = "white";
    dateInputElement.style.backgroundColor = "white";
    dateAlertSpan.innerHTML = '';
    textAlertSpan.innerHTML = '';
}

function clearAllTasks(){
    var tasksExist = localStorage.getItem("tasks");
    if (tasksExist.length > 0) {
        var deleteAllTasksConfirmation = confirm('Are you sure you want to delete ALL assignments?');
        if(deleteAllTasksConfirmation){
            localStorage.setItem("tasks", []);
            allTasks = [];
            clearForm();
            showTasksToPage();
        } 
    } else {
        alert('There are no tasks to delete!');
    }   
}

function createTask(){
    var text = textInputElement.value;
    var date = dateInputElement.value;
    var time = timeInputElement.value;
    var taskInfo = {
        task: text,
        date: date,
        time: time,
    };
    //Reset the alert color 
    if (text === "") { // Validate the message box is filled
        textAlertSpan.innerHTML = '** required';
        textInputElement.style.backgroundColor = "pink";
        dateInputElement.style.backgroundColor = "white";
        dateAlertSpan.innerHTML = '';
        return;
        }
    if (date === "") { // Validate the date box is filled
        dateAlertSpan.innerHTML = '** required';
        textAlertSpan.innerHTML = '';
        dateInputElement.style.backgroundColor = "pink";
        textInputElement.style.backgroundColor = "white";

        return;
        }
    if ( new Date(date).toISOString().split('T')[0] < (new Date(Date.now())).toISOString().split('T')[0] ) { // Validate the date box is filled
        dateAlertSpan.innerHTML = '** Invalid Date';
        textAlertSpan.innerHTML = '';
        dateInputElement.style.backgroundColor = "pink";
        textInputElement.style.backgroundColor = "white";
        return;
        }
    else { // Save task to local storage
        allTasks.push(taskInfo);
        localStorage.setItem("tasks", JSON.stringify(allTasks));
        textAlertSpan.innerHTML = '';
        textInputElement.style.backgroundColor = "white";
        dateAlertSpan.innerHTML = '';
        dateInputElement.style.backgroundColor = "white";
    } 
    showTasksToPage();
    clearForm();
}

function removeTask(index){
    var confirmation = confirm('Are you sure you want to delete this assignment?');
    if(confirmation){
        allTasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(allTasks));
        $(this).parent('.taskContainer').fadeOut(200, function () {
            $(this).remove();
        });
        showTasksToPage();
    }
}

function showTasksToPage(){
    var tasksContainer = document.getElementById("tasksContainer");
    // Clear the page from all shown tasks
    tasksContainer.innerHTML = "";
    if( localStorage.getItem("tasks") != "" && localStorage.getItem("tasks") != null){
        taskExist = JSON.parse(localStorage.getItem("tasks"));
        if(taskExist){
            for(var i = 0; i < taskExist.length ; i++) { // Loop through all tasks on local storage and HTML them to page
                var taskDiv = `
                <div class="taskContainer fade-in" id="taskContainer_${i}">
                    <button class="closeButton" type="button" class="btn btn-default" aria-label="Close">
                        <span onclick="removeTask(${i})" class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                    </button>
                    <p class="task">${taskExist[i].task}</p>
                    <p class="due">Due: ${taskExist[i].date} <br> ${taskExist[i].time}</p>
                </div>`;
                tasksContainer.innerHTML += taskDiv;
            }
        }   
    }  
}
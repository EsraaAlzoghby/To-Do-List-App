let buttonAdd = document.getElementById('buttonAdd')
let buttonUpdate = document.getElementById('buttonUpdate')
let newTask = document.getElementById('newTask')
let error = document.getElementById('error')
let allTasks = document.getElementById('allTasks')
let empty = document.getElementById('empty')
let numberUpdate;
let taskBox = []
if(localStorage.getItem('saveTask') !== null){
    taskBox = JSON.parse(localStorage.getItem('saveTask'))
    displayTask()
}
buttonAdd.addEventListener('click' , ()=>{
    addTask()
})
function addTask(){
let listInformation = newTask.value 
if(listInformation){
    taskBox.push(listInformation)
    error.classList.add('d-none')
    localStorage.setItem('saveTask' , JSON.stringify(taskBox))
    displayTask()
    newTask.value  = ''
}else{
    error.classList.remove('d-none')
}
}
function displayTask(index){
    let taskDisplay = ''
    if(taskBox.length == 0){
        allTasks.innerHTML = `
        <tr>
             <td colspan="4" class="fw-bold" id="empty">Task List is Empty!</td>
        </tr>
        `
    }else{
        for (var i = 0 ; i<taskBox.length ; i++){
         taskDisplay +=`
          <tr class="fw-normal">
                                             <td>${i+1}</td>
                                             <td>
                                                 <span>${taskBox[i]}</span>
                                             </td>
                                             <td>
                                                 <a style="cursor: pointer;" class="update" onclick='getTaskToUpdate(${i})'><i
                                                         class="fas fa-pen-nib fa-lg text-warning me-3"></i></a>
                                             </td>
                                             <td>
                                                 <a style="cursor: pointer;" class="delete"  onclick='deleteTask(${i})' ><i
                                                         class="fas fa-trash-alt fa-lg text-danger"></i></a>
                                             </td>
                                         </tr> 
         `
         allTasks.innerHTML= taskDisplay
        }
    }
}

function deleteTask(index){
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          taskBox.splice(index,1)
          localStorage.setItem('saveTask' , JSON.stringify(taskBox))
          displayTask()
        }
      });
}

function getTaskToUpdate(index){
    newTask.value = taskBox[index]
    buttonUpdate.classList.remove('d-none')
    buttonAdd.classList.add('d-none')
    numberUpdate = index;
}
buttonUpdate.addEventListener('click' , ()=>{UpdateTask()})
function UpdateTask(){
    taskBox[numberUpdate]= newTask.value 
    localStorage.setItem('saveTask' , JSON.stringify(taskBox))
    displayTask()
    newTask.value = null
    buttonUpdate.classList.add('d-none')
    buttonAdd.classList.remove('d-none')
}
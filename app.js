const addBtn = document.querySelector('.addBtn');
let list = document.querySelector('ul');
const input = document.querySelector('input');
const clearBtn = document.querySelector('.clearBtn');

let tasks = [];

window.addEventListener('load', (e) => {
    let storedTasks = JSON.parse(localStorage.getItem('tasks'));
    
    if(storedTasks){
        tasks = [...storedTasks];
        storedTasks.forEach(task => {
            list.innerHTML+= `<li><i class="fas fa-check-circle check"></i><span>${task.title}</span><i class="far fa-trash-alt"></i></li> `;
            let listItems = list.querySelectorAll('li');
            if(task.checked == true){
                listItems.forEach(li => {
                    if(task.title == li.innerText) li.classList.add('done');
                })
            }
        })
    trash();
    check();
    }
});

addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if(!(input.value.trim())) return;
    list.innerHTML+= `<li><i class="fas fa-check-circle check"></i><span>${input.value}</span><i class="far fa-trash-alt"></i></li> `;
    tasks.push({title: input.value, checked : false});
    localStorage.setItem('tasks',JSON.stringify(tasks));
    input.value = "";
    trash();
    check();
});

clearBtn.addEventListener('click', (e) => {
    list.innerHTML = '';
    tasks = [];
    localStorage.setItem('tasks',JSON.stringify(tasks));
})

function trash(){
    const trashBtns = document.querySelectorAll('.fa-trash-alt');
    trashBtns.forEach((btn) => {
        btn.addEventListener('click',(e)=>{
            e.target.parentElement.remove();
            tasks = tasks.filter(task => task.title != e.target.previousElementSibling.innerText);
            localStorage.setItem('tasks',JSON.stringify(tasks));
        })
    })
}


function check(){
    const checkInputs = document.querySelectorAll('.check');
    checkInputs.forEach((i) => { 
        i.addEventListener('click',(e) => {
            e.target.parentElement.classList.toggle("done");
            tasks.forEach(task => {
                if(task.title == e.target.nextElementSibling.innerText) task.checked = !task.checked;
                localStorage.setItem('tasks',JSON.stringify(tasks));        
            })
        })
    })
}
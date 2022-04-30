const addBtn = document.querySelector('.addBtn');
let list = document.querySelector('ul');
const input = document.querySelector('input');
const clearBtn = document.querySelector('.clearBtn');

let tasks = [];
let checked = [];

window.addEventListener('load', (e) => {
    let storedTasks = JSON.parse(localStorage.getItem('tasks'));
    let checkedTasks = JSON.parse(localStorage.getItem('checked'));
    
    if(storedTasks){
        tasks = [...storedTasks];
        storedTasks.forEach(task => {
            list.innerHTML+= `<li><i class="fas fa-check-circle check"></i><span>${task}</span><i class="far fa-trash-alt"></i></li> `;
        })
    }

    let listItems =Array.from(list.children);
    if(checkedTasks){
        checked = [...checkedTasks];
        listItems.forEach(li => {
            if(checked.includes(li.innerText)) {
                li.classList.add('done');
            }
        })
    }
    trash();
    check();
});

addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if(!(input.value.trim())) return;
    list.innerHTML+= `<li><i class="fas fa-check-circle check"></i><span>${input.value}</span><i class="far fa-trash-alt"></i></li> `;
    tasks.push(input.value);
    localStorage.setItem('tasks',JSON.stringify(tasks));
    input.value = "";
    trash();
    check();
});

clearBtn.addEventListener('click', (e) => {
    list.innerHTML = '';
    tasks = [];
    checked = [];
    localStorage.setItem('tasks',JSON.stringify(tasks));
    localStorage.setItem('checked',JSON.stringify(checked));
})

function trash(){
    const trashBtns = document.querySelectorAll('.fa-trash-alt');
    trashBtns.forEach((btn) => {
        btn.addEventListener('click',(e)=>{
            e.target.parentElement.remove();
            tasks = tasks.filter(task => task != e.target.parentElement.innerText);
            checked = checked.filter(task => task != e.target.parentElement.innerText);
            localStorage.setItem('tasks',JSON.stringify(tasks));
            localStorage.setItem('checked',JSON.stringify(checked));
        })
    })
}


function check(){
    const checkInputs = document.querySelectorAll('.check');
    checkInputs.forEach((i) => { 
        i.addEventListener('click',(e) => {
            e.target.parentElement.classList.toggle("done");
            if(e.target.parentElement.classList.contains('done')){
                checked.push(e.target.parentElement.innerText);
                console.log(e.target.parentElement);
                localStorage.setItem('checked',JSON.stringify(checked));
            }else{
                checked = checked.filter(task => task != e.target.parentElement.innerText);
                localStorage.setItem('checked',JSON.stringify(checked));
            }
        })
    })
}


/*************  TO DO LIST  ***************/
// L'application utilise le localStorage pour persister les données

// déclaration des constantes
const tasksList = document.querySelector('.tasks');
const noTaskMessage = '<p class="justify-center text-center font-bold py-1.5 hover:bg-slate-300 transition duration-150"><span class="animate-pulse">Aucune tâche à faire pour le moment ...</span></p>';
const inputTask = document.getElementsByClassName('input-task')[0];
const buttonTask = document.getElementsByClassName('button-task')[0];


// Vérifie au lancement de l'app si la liste des tâches est vide
if (!localStorage.task) {
    tasksList.innerHTML = noTaskMessage;
} else {
    const array = JSON.parse(localStorage.task);
    showAllTasks(array);
}


// Affiche la liste des tâches
function showAllTasks(tasks) {
    for (let i = 0; i < tasks.length; i++) {
        const task = document.createElement('p');                       // créer <p>
        task.innerHTML = `<button type="submit" class="delete-button bg-red text-slate-200 text-sm m-auto opacity-70 rounded-md pb-0.5 px-1 hover:text-white hover:opacity-100 transition duration-300">Supprimer</button>
        <input id=${tasks[i].id} class="checkbox h-6 w-6 rounded-full shadow cursor-pointer focus:ring-0" type="checkbox" ${tasks[i].isDone ? "checked" : ""} />
        <label for=${tasks[i].id} class='break-all cursor-pointer'>${tasks[i].name}</label>`;            // met le task name dedans
        task.classList.add('m-0', 'pb-1', 'pt-1', 'px-2', 'hover:bg-slate-300', 'transition', 'duration-150', 'cursor-default', 'md:pb-2');
        task.querySelector('input').checked ? task.querySelector('label').classList.add('text-slate-400', 'line-through') : '';
        tasksList.appendChild(task);                                    // ajoute <p> dans la liste
    }
    document.querySelector('.button-delete-all').classList.remove('invisible');
}


// Affiche un exemple de tâche aléatoire dans input
const exampleTask = [
    'laver la voiture', 'faire les courses', 'faire du jogging', 'trier le courrier', 'faire le ménage',
    'lire le journal', 'aller au parc', 'préparer le repas', 'réviser le cours'
]
function showRandomTask() {
    const randomTask = "ex : " + exampleTask[Math.floor(Math.random() * exampleTask.length)];
    inputTask.setAttribute("placeholder", randomTask);
}
showRandomTask();


// Event pour ajouter une nouvelle tâche
document.getElementById('taskForm').addEventListener('submit', function (e) {
    e.preventDefault();
    !inputTask.value ? alert('Saisissez une tâche') : addNewTask(inputTask.value);
});


// Ajoute une nouvelle tâche
function addNewTask(task) {
    if (tasksList.firstChild.outerHTML === noTaskMessage) { tasksList.firstChild.remove() }
    let array = [];                                 // créer array
    if (localStorage.task) { array = JSON.parse(localStorage.task) }; // local to array
    const taskObject = {                            // créer objet avec new task
        id: Date.now(),
        name: task,
        isDone: false
    }
    array.push(taskObject);                         // met objet dans array
    const newTask = document.createElement('p');    // créer <p>
    newTask.classList.add('m-0', 'pb-2', 'pt-1', 'px-2', 'hover:bg-slate-300', 'transition', 'duration-150', 'cursor-default');
    newTask.innerHTML = `<button type="submit" class="delete-button bg-red text-slate-200 text-sm m-auto opacity-70 rounded-md pb-0.5 px-1 hover:text-white hover:opacity-100 transition duration-300">Supprimer</button>
    <input id=${taskObject.id} class="checkbox h-6 w-6 rounded-full shadow cursor-pointer focus:ring-0" type="checkbox" />
    <label for=${taskObject.id} class='break-all cursor-pointer'></label>`;       // met le checkbox et task name dedans
    newTask.lastChild.textContent = task;           // insère le texte brut dans le label
    newTask.firstChild.addEventListener('click', e => { deleteTask(e.target) });
    newTask.children[1].addEventListener('change', e => { changeStateTask(e.target) });
    // j'ai ajouté les events ici pour qu'ils soient actif immediatement après injection, sans rechargement la page
    tasksList.appendChild(newTask);                 // ajoute <p> dans la liste
    localStorage.task = JSON.stringify(array);      // met array dans local
    inputTask.value = '';                           // vide le input
    inputTask.removeAttribute("placeholder");       // supprime le placeholde
    document.querySelector('.button-delete-all').classList.remove('invisible');
    // showRandomTask();
}


// Event pour changer l'état d'une tâche
tasksList.querySelectorAll('.checkbox').forEach(item => {
    item.addEventListener('change', e => {
        changeStateTask(item);
    })
})

// Change l'état d'une tâche
function changeStateTask(item) {
    const array = JSON.parse(localStorage.task);
    for (let i = 0; i < array.length; i++) {
        if (array[i].id === parseInt(item.id)) {
            array[i].isDone = item.checked ? true : false;
            item.checked ?
                item.nextElementSibling.classList.add('text-slate-400', 'line-through') :
                item.nextElementSibling.classList.remove('text-slate-400', 'line-through');
            break;
        }
    }
    localStorage.task = JSON.stringify(array);
}

// Event pour supprimer une tâche
document.querySelectorAll('.delete-button').forEach(item => {
    item.addEventListener('click', () => {
        deleteTask(item);
    })
})

// Supprime une tâche
function deleteTask(item) {
    const array = JSON.parse(localStorage.task);
    for (let i = 0; i < array.length; i++) {
        if (array[i].id === parseInt(item.nextElementSibling.id)) {
            array.splice(i, 1);
            item.parentElement.remove();
            break;
        }
    }
    localStorage.task = JSON.stringify(array);
    if (!tasksList.firstElementChild) {
        localStorage.removeItem('task');
        tasksList.innerHTML = noTaskMessage;
        document.querySelector('.button-delete-all').classList.add('invisible');
    }
}

// Event pour supprimer toutes les tâches
document.querySelector('.button-delete-all').addEventListener('click', function () {
    if (window.confirm('Voulez-vous supprimer toutes les tâches ?')) {
        deleteAllTask();
    }
});

// Supprime toutes les tâches
function deleteAllTask() {
    localStorage.removeItem("task");
    tasksList.innerHTML = noTaskMessage;
    document.querySelector('.button-delete-all').classList.add('invisible');
}
// déclaration des constantes
const tasksList = document.querySelector('.tasks');
const noTaskMessage = '<p class="centered animated">Aucune tâche à faire pour le moment ...</p>';
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
        const task = document.createElement('p');    // créer <p>
        task.innerHTML = `<div class="delete-button"></div>
        <input id=${tasks[i].id} class="checkbox" type="checkbox" ${tasks[i].isDone ? "checked" : ""} />
        <label for=${tasks[i].id}>${tasks[i].name}</label>`;            // met le task name dedans
        tasksList.appendChild(task);                 // ajoute <p> dans la liste
    }
    document.querySelector('.button-delete-all').removeAttribute('hidden');
}


// Affiche un exemple de tâche aléatoire dans input
const exampleTask = [
    'laver la voiture', 'faire les courses', 'faire du jogging', 'trier le courrier', 'appeler maman',
    'faire le ménage', 'lire le journal', 'aller au parc', 'préparer le repas', 'réviser le cours'
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
    newTask.innerHTML = `<div class="delete-button"></div>
        <input id=${Date.now()} class="checkbox" type="checkbox" />
        <label for=${Date.now()}></label>`;       // met le checkbox et task name dedans
    newTask.lastChild.textContent = task;           // insère le texte brut dans le label
    newTask.firstChild.addEventListener('click', e => { deleteTask(e.target) });
    newTask.children[1].addEventListener('change', e => { changeStateTask(e.target) });
    // j'ai ajouté les events ici pour qu'ils soient actif immediatement après injection, sans rechargement la page
    tasksList.appendChild(newTask);                 // ajoute <p> dans la liste
    localStorage.task = JSON.stringify(array);      // met array dans local
    inputTask.value = '';                           // vide le input
    inputTask.removeAttribute("placeholder");       // supprime le placeholde
    document.querySelector('.button-delete-all').removeAttribute('hidden');
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
        document.querySelector('.button-delete-all').setAttribute('hidden', true);
    }
}

// Event pour supprimer toutes les tâches
document.querySelector('.button-delete-all').addEventListener('click', function () {
    if (window.confirm('Voulez-vous supprimer toutes des tâches ?')) {
        deleteAllTask();
    }
});

// Supprime toutes les tâches
function deleteAllTask() {
    localStorage.removeItem("task");
    tasksList.innerHTML = noTaskMessage;
    document.querySelector('.button-delete-all').setAttribute('hidden', true);
}
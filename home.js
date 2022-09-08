// déclaration des constantes
const tasksList = document.querySelector('.tasks');
const noTaskMessage = '<p>Aucune tâche à faire pour le moment ...</p>';
const inputTask = document.getElementsByClassName('input-task')[0];
const buttonTask = document.getElementsByClassName('button-task')[0];

// Vérifie au lancement de l'app si liste des tâches vide
if (!localStorage.task) {
    tasksList.innerHTML = noTaskMessage;
} else {
    const array = JSON.parse(localStorage.task);
    showAllTasks(array);
}

// Affiche la liste des tâches
// (mettre cette fonction à chaque fin de modif de la liste ? pour remettre les number task dans l'ordre)
function showAllTasks(tasks) {
    for (let i = 0; i < tasks.length; i++) {
        console.log(tasks[i].name);
        const task = document.createElement('p');    // créer <p>
        task.innerHTML = `<input type="checkbox" class="task-number-${i}"/>
        <label>${tasks[i].name}</label>`;            // met le task name dedans
        tasksList.appendChild(task);                 // ajoute <p> dans la liste
    }
}

// Event pour ajouter une nouvelle tâche
buttonTask.addEventListener('click', function () {
    !inputTask.value ? alert('Saisissez une tâche') : addNewTask(inputTask.value);
});

// Ajoute une nouvelle tâche
function addNewTask(task) {
    if (tasksList.firstChild.outerHTML === noTaskMessage) { tasksList.firstChild.remove() }
    let array = [];                                 // créer array
    if (localStorage.task) { array = JSON.parse(localStorage.task) }; // local to array
    const taskObject = {                            // créer objet avec new task
        name: task,
        isDone: false
    }
    array.push(taskObject);                         // met objet dans array
    const newTask = document.createElement('p');    // créer <p>
    newTask.innerHTML =                             // met le checkbox et task name dedans
        `<input type="checkbox" class="task-number-${array.length - 1}"/>
    <label>${task}</label>`;
    tasksList.appendChild(newTask);                 // ajoute <p> dans la liste
    localStorage.task = JSON.stringify(array);      // met array dans local
    inputTask.value = '';
}

// Event pour changer l'état d'une tâche

// Change l'état d'une tâche

// Event pour supprimer une tâche

// Supprime une tâche

// Event pour supprimer toutes les tâches

// Supprime toutes les tâches


/*
array + random :
ranger la chambre
faire la vaisselle
laver la voiture
réparer le téléphone
faire les courses
faire du jogging
trier le courrier
appeler maman
sortir les poubelles
faire le ménage
lire le journal
aller au parc
aller au restaurant
réviser le cours
*/
/********************************************************/

/*
DOM :

Compter nbre de child d'un elt :
element.children.length
element.childElementCount

innerHTML : pour injecter/ajouter/modifier une balise avec du contenu
textContent : pour injecter/ajouter/modifier du contenu
innerText : ?

JS :

Condition if/else :
if (condition) {traitment if true} else {traitment if false};

Condition ternaire :
(condition) ? (traitment if true) : (traitment if false);

Concaténation :
'<p>' + task + '<p>';

Extrapolation :
`<p>${task}<p>`
(accents graves)

! operator = empty or false

Suppression d'un elt du DOM :
elt.remove()
*/
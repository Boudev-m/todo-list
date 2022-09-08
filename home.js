// déclaration des constantes
const tasksList = document.querySelector('.tasks');
const noTaskMessage = '<p>Aucune tâche à faire pour le moment ...</p>';
const inputTask = document.getElementsByClassName('input-task')[0];
const buttonTask = document.getElementsByClassName('button-task')[0];
const task = {
    name: 'remplacer le papier peint',
    isDone: false
}

// si liste des tâches vide
if (tasksList.childElementCount <= 0) {
    tasksList.innerHTML = noTaskMessage;
}

// event : clic pour ajouter une nouvelle tâche
buttonTask.addEventListener('click', function () {
    addNewTask(inputTask.value)
});

// Ajoute une nouvelle tâche
function addNewTask(task) {
    tasksList.innerHTML = `<p>${task}<p>`
}

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

*/
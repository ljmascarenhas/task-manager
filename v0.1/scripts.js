let db = firebase.firestore()

function getCollection() {
    db.collection("task").get().then( (querySnapshot) => {
        querySnapshot.forEach(element => {
            let cardHistory = new newTaskManager(
                element.id,
                element.data().title,
                element.data().mode,
                element.data().description
            )
        });
    })
}

function newTaskManager(ID, name, privacity, urgency, description) {

    this.divParent = document.getElementById('container')
    this.cardDiv = document.createElement('div')
    this.cardDivBody = document.createElement('div')
    this.cardDivTitle = document.createElement('h5')
    this.cardDivSubTitle = document.createElement('h6')
    this.cardDivText = document.createElement('p')

    this.cardID = {
        cardDad: 'card-' + ID,
        cardBody: 'card-body-' + ID,
        cardTitle: 'card-body-title' + ID,
        cardSubTitle: 'card-body-title-sub' + ID,
        cardText: 'card-body-title-sub-text' + ID
    }
    if(urgency == 'urgency') {
        this.cardDiv.className = "card float-left mt-3 ml-3 d-inline-block bgColorUrgency"
    } else if(urgency == 'moderate') {
        this.cardDiv.className = "card float-left mt-3 ml-3 d-inline-block bgColorModerate"
    } else {
        this.cardDiv.className = "card float-left mt-3 ml-3 d-inline-block"
    }
    this.cardDivBody.className = "card-body p-3"
    this.cardDivTitle.className = "card-title p-2"
    this.cardDivSubTitle.className = "card-subtitle card-subtitle mb-2 text-muted mt-3"
    this.cardDivText.className = "card-text"

    this.cardDiv.style = "auto"

    this.cardDiv.id = this.cardID.cardDad
    this.cardDivBody.id = this.cardID.cardBody
    this.cardDivTitle.id = this.cardID.cardTitle
    this.cardDivSubTitle.id = this.cardID.cardSubTitle
    this.cardDivText.id = this.cardID.cardText

    this.cardDivTitle.innerHTML = name
    this.cardDivSubTitle.innerHTML = privacity
    this.cardDivText.innerHTML = description

    document.getElementById('container').appendChild(this.cardDiv)
    document.getElementById(this.cardID.cardDad).appendChild(this.cardDivBody)
    document.getElementById(this.cardID.cardBody).appendChild(this.cardDivTitle)
    document.getElementById(this.cardID.cardTitle).appendChild(this.cardDivSubTitle)
    document.getElementById(this.cardID.cardSubTitle).appendChild(this.cardDivText)

    document.getElementById('name-new-task').value = ''
    document.getElementById('privacity').value = ''
    document.getElementById('description-new-task').value = ''

}

function msgSucessOrError(typeMsg, msg) {
    this.divMsgSucess = document.createElement('div')
    this.divMsgSucess.className = typeMsg
    this.divMsgSucess.setAttribute('role', 'alert')
    this.divMsgSucess.innerHTML = msg

    this.divMsgSucess.id = "idModal"

    this.divMsgSucess.style.display = 'flex'

    document.getElementById('container').appendChild(this.divMsgSucess)

    setTimeout(function(){
        document.getElementById("idModal").style.display = 'none'
    }, 3000)
}

document.getElementById("btn-new-task").addEventListener('click', () => {

    let infoModal = {
        nameTask: document.getElementById('name-new-task').value,
        privacity: document.getElementById('privacity').value,
        urgency: document.getElementById('infoUrgency').value,
        description: document.getElementById('description-new-task').value
    }

    if (infoModal.privacity == "privite") {
        infoModal.privacity = "Privada"
    } else if (infoModal.privacity == "public") {
        infoModal.privacity = "Pública"
    }

    db.collection('task').add({
        title: infoModal.nameTask,
        mode: infoModal.privacity,
        urgency: infoModal.urgency,
        description: infoModal.description
    }).then( elem => {
        new msgSucessOrError("alert alert-success fixed-bottom", "Nota salva com sucesso!")
        new newTaskManager(elem.id, infoModal.nameTask, infoModal.privacity, infoModal.urgency, infoModal.description)
    }).catch( err => {
        new msgSucessOrError("alert alert-danger", "Ocorreu um problema ao salvar sua nota!")
    })
})


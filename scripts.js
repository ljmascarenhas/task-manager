let db = firebase.firestore()

function getCollection() {
    db.collection("task").get().then( (querySnapshot) => {
        querySnapshot.forEach(element => {
            console.log(element.id)
            console.log(element.data().title)
            console.log(element.data().mode)
            console.log(element.data().description)
            let cardHistory = new newTaskManager(
                element.id,
                element.data().title,
                element.data().mode,
                element.data().description
            )
        });
    })
}

function newTaskManager(ID, name, privacity, description) {

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

    this.cardDiv.className = "card float-left mt-3 ml-3 d-inline-block"
    this.cardDivBody.className = "card-body p-3"
    this.cardDivTitle.className = "card-title"
    this.cardDivSubTitle.className = "card-subtitle card-subtitle mb-2 text-muted"
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

document.getElementById("btn-new-task").addEventListener('click', () => {

    let infoModal = {
        nameTask: document.getElementById('name-new-task').value,
        privacity: document.getElementById('privacity').value,
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
        description: infoModal.description
    }).then( elem => {
        let card1 = new newTaskManager(elem.id, infoModal.nameTask, infoModal.privacity, infoModal.description)
    }).catch( err => {
        console.error("Erro ao add o documento.")
    })


})
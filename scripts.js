function newTaskManager(ID, name, privacity, description) {

    this.divParent = document.getElementById('container')
    this.cardDiv = document.createElement('div')
    this.cardDivBody = document.createElement('div')
    this.cardDivTitle = document.createElement('h5')
    this.cardDivSubTitle = document.createElement('h6')
    this.cardDivText = document.createElement('p')

    this.IDCard = ID // database
    this.cardID = {
        cardDad: 'card-' + this.IDCard,
        cardBody: 'card-body-' + this.IDCard,
        cardTitle: 'card-body-title' + this.IDCard,
        cardSubTitle: 'card-body-title-sub' + this.IDCard,
        cardText: 'card-body-title-sub-text' + this.IDCard
    }

    this.cardDiv.className = "card"
    this.cardDivBody.className = "card-body"
    this.cardDivTitle.className = "card-title"
    this.cardDivSubTitle.className = "card-subtitle card-subtitle mb-2 text-muted"
    this.cardDivText.className = "card-text"

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
        ID: document.getElementById('id-new-task').value,
        nameTask: document.getElementById('name-new-task').value,
        privacity: document.getElementById('privacity').value,
        description: document.getElementById('description-new-task').value
    }

    let card1 = new newTaskManager(infoModal.ID, infoModal.nameTask, infoModal.privacity, infoModal.description)

})
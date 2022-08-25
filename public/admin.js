const { response } = require("express")

async function mainAdmin() {

    let response = await fetch('http://localhost:3001/listBooks')
    let books = await response.json()

    let bookContainer = document.querySelector('.container')

    books.forEach(book => {
    bookContainer.innerHTML += `
        <div class="card">
            ${book.imageURL ? `
                <img class="card-img-top" src="./${book.imageURL}" />
            `
            : ``}
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                    <div class="input-group">
                        <span class="input-group-text">Edit Title:</span>
                        <textarea id="inputTitle${book.id}" class="form-control" aria-label="With textarea">${book.title}</textarea>
                    </div>
                <h6 class="card-subtitle mb-2 text-muted">Available: ${book.quantity}</h6>
                    <div class="input-group">
                        <span class="input-group-text">Edit Qty:</span>
                        <textarea id="inputQty${book.id}" class="form-control" aria-label="With textarea">${book.quantity}</textarea>
                    </div>
                <p class="card-text">${book.description}</p>
                <button id="${book.id}" onClick="reply_click(this.id)" type="submit" class="btn btn-primary">Update</button>
            </div>
        </div>
     `
        //document.getElementById(book.id).onclick = reply_click;
         /*
        let button = document.getElementById(book.id);
        button.addEventListener('click', () => {
            console.log(this.id);
            book.title = document.querySelector('#inputQty'+book.id).textContent;
            book.quantity = document.querySelector('#inputTitle'+book.id).textContent;
            
            
            fetch('http://localhost:3001/updateBook',  {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: book.id,
                    title: book.value,
                    quantity: book.value
                })

            })

        }) */
    })
}

mainAdmin()

async function reply_click(eID) {
    console.log(parseInt(eID));
    let response = await fetch('http://192.168.1.11:3001/updateBook',  {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: parseInt(eID),
            title: document.querySelector('#inputTitle'+ eID).textContent,
            quantity: document.querySelector('#inputQty'+ eID).textContent
        })
    })
    /*for (let i = 0; i < 10; i++){
        console.log(response.statusText)
    }*/
}

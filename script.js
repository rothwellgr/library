const myLibrary = [];

class Book {
    constructor(title, author, pages) {
        if (!new.target) {
            throw Error("you must use the new operator");
        }
        this.id = crypto.randomUUID(),
            this.title = title,
            this.author = author,
            this.pages = pages,
            this.read = "Not read"
    }
}

Book.prototype.toggleRead = function(cardRead) {
    if (cardRead.innerHTML == "Read") {
        cardRead.innerHTML = "Not read";
    } else {
        cardRead.innerHTML = "Read";
    }
};

function addBookToLibrary(title, author, pages) {
    let theBook = new Book(title, author, pages);
    myLibrary.push(theBook);
    return theBook;
}

function displayCards(element) {
    const cardContainer = document.getElementById("cardsContainer");
    const card = document.createElement("article");
    card.classList.add("card");

    const cardTitle = document.createElement("div");
    cardTitle.innerHTML = element.title;

    const cardAuthor = document.createElement("div");
    cardAuthor.innerHTML = element.author;

    const cardRead = document.createElement("div");
    cardRead.innerHTML = "Not read";

    const linebreak = document.createElement("br");

    const cardReadButton = document.createElement("button");
    cardReadButton.textContent = "Read";
    cardReadButton.addEventListener('click', function(){
        element.toggleRead(cardRead);
    });

    const cardRemove = document.createElement("button");
    cardRemove.textContent = "Remove";
    cardRemove.setAttribute('data-remove', element.id);
    cardRemove.addEventListener('click', function() {
        card.remove();
        let index = myLibrary.map(x => {return x.id}).indexOf(cardRemove.dataset.remove);
        myLibrary.splice(index, 1);
        console.log(myLibrary);  
    });

    card.appendChild(cardTitle);
    card.appendChild(cardAuthor);
    card.appendChild(cardRead);
    card.appendChild(linebreak);
    card.appendChild(cardReadButton);
    card.appendChild(cardRemove);

    cardContainer.appendChild(card);
}

const showButton = document.getElementById("showDialog");
const dialog = document.getElementById("dialog");
const cancelButton = document.getElementById("cancel");
const confirmButton = document.getElementById("confirmBtn");

showButton.addEventListener("click", () => {
    dialog.showModal();
});

cancelButton.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();
});

confirmButton.addEventListener("click", (e) => {
    e.preventDefault();

    let inputTitle = document.getElementById("inputTitle").value;
    let inputAuthor = document.getElementById("inputAuthor").value;

    let theBook = addBookToLibrary(inputTitle, inputAuthor);
    displayCards(theBook);
    dialog.close();
});
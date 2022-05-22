const orderedBooks = [];
let draggingBook = null;

function addBook(book) {
  if (orderedBooks.some((b) => b.title === book.title)) {
    return;
  }

  orderedBooks.push(book);
  refreshOrderedBooks();
}

function removeBook(book) {
  const index = orderedBooks.findIndex((b) => b.title === book.title);
  orderedBooks.splice(index, 1);
  refreshOrderedBooks();
}

function refreshOrderedBooks() {
  const ordersBooks = document.querySelector(".orders__books");
  const cartQuantity = document.querySelector(".header__orders-btn .quantity");
  const totalPrice = document.querySelector(".orders__price .price");
  const orderBtn = document.querySelector(".orders__price button");

  cartQuantity.innerText = orderedBooks.length;
  ordersBooks.innerHTML = "";
  const sum = orderedBooks.reduce((total, el) => total + el.price, 0);
  totalPrice.innerText = "Total price: $" + sum;
  orderBtn.removeAttribute("disabled");

  if (orderedBooks.length === 0) {
    const noItem = document.createElement("h1");

    noItem.classList.add("no-item");
    noItem.innerHTML = "<i>You haven't ordered yet!</i>";
    ordersBooks.append(noItem);
    orderBtn.setAttribute("disabled", "disabled");
    return;
  }

  orderedBooks.forEach((book) => {
    const ordersBook = document.createElement("div");
    const closeBtn = document.createElement("div");
    const ordersBookImg = document.createElement("img");
    const bookShortInfo = document.createElement("div");
    const shortTitle = document.createElement("h2");
    const shortSubtitle = document.createElement("h3");
    const shortPrice = document.createElement("h4");

    ordersBook.classList.add("orders__books-book");
    closeBtn.classList.add("close");
    closeBtn.innerText = "✖";
    ordersBookImg.setAttribute("src", book.imageLink);
    ordersBookImg.setAttribute("alt", book.title);
    bookShortInfo.classList.add("book__short-info");
    shortTitle.classList.add("short-title");
    shortTitle.innerText =
      book.title.length > 25 ? book.title.slice(0, 25) + "..." : book.title;
    shortSubtitle.classList.add("book__short-subtitle");
    shortSubtitle.innerHTML = `by <i>${book.author}</i>`;
    shortPrice.classList.add("short-price");
    shortPrice.innerText = "Price: $" + book.price;

    bookShortInfo.append(shortTitle, shortSubtitle, shortPrice);
    ordersBook.append(closeBtn, ordersBookImg, bookShortInfo);
    ordersBooks.append(ordersBook);

    closeBtn.addEventListener("click", () => {
      removeBook(book);
    });
  });
}

(async function () {
  const booksData = await fetch("./JSON/books.json").then((res) => res.json());

  // adding header
  const header = document.createElement("header");
  const logo = document.createElement("a");
  const logoImg = document.createElement("img");
  const headerBtn = document.createElement("a");
  const cartIcon = document.createElement("i");
  const orderQuantity = document.createElement("span");

  header.classList.add("header");
  logo.setAttribute("href", "./");
  logo.classList.add("header__logo");
  logoImg.setAttribute("src", "./img/logo.png");
  logoImg.setAttribute("alt", "book logo");
  headerBtn.setAttribute("href", "#orders");
  headerBtn.classList.add("header__orders-btn");
  cartIcon.classList.add("fa-solid", "fa-cart-shopping");
  orderQuantity.classList.add("quantity");
  orderQuantity.innerText = "0";

  headerBtn.append(cartIcon, orderQuantity);
  logo.append(logoImg);
  header.append(logo, headerBtn);
  document.body.prepend(header);

  headerBtn.addEventListener("dragenter", (e) => {
    e.preventDefault();
  });
  headerBtn.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  headerBtn.addEventListener("drop", () => {
    addBook(draggingBook);
  });

  // adding main content
  const main = document.createElement("main");
  main.classList.add("main-content");
  document.querySelector(".header").after(main);

  // start screen section
  const startScreen = document.createElement("section");
  const startTitle = document.createElement("h1");
  const startCursiveLetter = document.createElement("span");
  const startImage = document.createElement("img");
  const startBtn = document.createElement("a");

  startScreen.classList.add("start-screen");
  startTitle.classList.add("start-screen__title");
  startCursiveLetter.classList.add("font-cursive");
  startCursiveLetter.innerText = "W";
  startImage.setAttribute("src", "./img/heart.png");
  startImage.setAttribute("alt", "heart image");
  startBtn.setAttribute("href", "#catalogue");
  startBtn.classList.add("btn", "start-screen__btn");
  startBtn.innerText = "CHECK OUT";

  startTitle.append(startCursiveLetter, "e", startImage, "Reading");
  startScreen.append(startTitle, startBtn);
  document.querySelector(".main-content").append(startScreen);

  // catalogue section
  const catalogue = document.createElement("section");
  const catalogueContainer = document.createElement("div");
  const catalogueTitle = document.createElement("h2");
  const catalogueCursiveLetter = document.createElement("span");
  const catalogueList = document.createElement("div");

  catalogue.setAttribute("id", "catalogue");
  catalogue.classList.add("catalogue");
  catalogueContainer.classList.add("container");
  catalogueTitle.classList.add("catalogue__title");
  catalogueCursiveLetter.classList.add("font-cursive");
  catalogueCursiveLetter.innerText = "T";
  catalogueList.classList.add("catalogue__list");

  booksData.forEach((book) => {
    const card = document.createElement("div");
    const cardImg = document.createElement("img");
    const cardTitle = document.createElement("h2");
    const cardAuthor = document.createElement("h3");
    const cardAuthorName = document.createElement("i");
    const cardPrice = document.createElement("h4");
    const cardMoreBtn = document.createElement("button");
    const cardAddBtn = document.createElement("button");

    card.classList.add("card");
    cardImg.setAttribute("src", book.imageLink);
    cardImg.setAttribute("alt", book.title);
    cardImg.classList.add("card-img");
    cardImg.setAttribute("draggable", "true");
    cardTitle.classList.add("card-title");
    cardTitle.innerText = book.title;
    cardAuthor.classList.add("card-author");
    cardAuthorName.innerText = book.author;
    cardPrice.classList.add("card-price");
    cardPrice.innerText = "Price: $" + book.price;
    cardMoreBtn.classList.add("btn", "btn-more");
    cardMoreBtn.innerText = "Show more";
    cardAddBtn.classList.add("btn", "btn-add");
    cardAddBtn.innerText = "Add to bag";

    cardAuthor.append("by ", cardAuthorName);
    card.append(
      cardImg,
      cardTitle,
      cardAuthor,
      cardPrice,
      cardMoreBtn,
      cardAddBtn
    );
    catalogueList.append(card);

    cardImg.addEventListener("dragstart", () => {
      draggingBook = book;
      setTimeout(() => {
        const backdrop = document.querySelector(".modal__backdrop");
        backdrop.style.position = "fixed";
        document.querySelector("main").after(backdrop);
      }, 0);
    });
    cardImg.addEventListener("dragend", () => {
      draggingBook = null;
      setTimeout(() => {
        const backdrop = document.querySelector(".modal__backdrop");
        backdrop.style.position = "absolute";
        document.querySelector(".modal").prepend(backdrop);
      }, 0);
    });

    cardMoreBtn.addEventListener("click", () => {
      const modal = document.querySelector(".modal");
      modal
        .querySelector(".modal__image img")
        .setAttribute("src", book.imageLink);
      modal.querySelector(".modal__image img").setAttribute("alt", book.title);
      modal.querySelector(".modal__heading").innerText = book.title;
      modal.querySelector(".modal__subheading i").innerText = book.author;
      modal.querySelector(".modal__info i").innerText = book.description;
      modal.querySelector(".price").innerText = "Price: $" + book.price;
      modal.classList.remove("hide");
    });
    cardAddBtn.addEventListener("click", () => addBook(book));
  });

  catalogueTitle.append(catalogueCursiveLetter, "HE BEST BOOKS IN THE WORLD");
  catalogueContainer.append(catalogueTitle, catalogueList);
  catalogue.append(catalogueContainer);
  document.querySelector(".main-content").append(catalogue);

  // orders section
  const orders = document.createElement("section");
  const ordersContainer = document.createElement("div");
  const ordersTitle = document.createElement("h2");
  const ordersCursiveLetter = document.createElement("span");
  const ordersBooks = document.createElement("div");
  const ordersNoItem = document.createElement("h1");
  const ordersPrice = document.createElement("div");
  const ordersPriceQnty = document.createElement("h2");
  const ordersBtn = document.createElement("button");

  orders.setAttribute("id", "orders");
  orders.classList.add("orders");
  ordersContainer.classList.add("container");
  ordersTitle.classList.add("orders__title");
  ordersCursiveLetter.classList.add("font-cursive");
  ordersCursiveLetter.innerText = "Y";
  ordersBooks.classList.add("orders__books");
  ordersNoItem.classList.add("no-item");
  ordersNoItem.innerHTML = "<i>You haven't ordered yet!</i>";
  ordersPrice.classList.add("orders__price");
  ordersPriceQnty.classList.add("price");
  ordersPriceQnty.innerText = "Total price: $0";
  ordersBtn.classList.add("btn");
  ordersBtn.setAttribute("disabled", "disabled");
  ordersBtn.innerText = "Confirm order";

  ordersBooks.prepend(ordersNoItem);
  ordersTitle.append(ordersCursiveLetter, "OUR BOOKS");
  ordersPrice.append(ordersPriceQnty, ordersBtn);
  ordersContainer.append(ordersTitle, ordersBooks, ordersPrice);
  orders.append(ordersContainer);
  document.querySelector(".main-content").append(orders);

  ordersBtn.addEventListener("click", () => {
    window.open("./order.html", "_blank");
  });

  // modal
  const modal = document.createElement("div");
  const backdrop = document.createElement("div");
  const modalWindow = document.createElement("div");
  const modalClose = document.createElement("i");
  const modalImage = document.createElement("div");
  const modalImageImg = document.createElement("img");
  const modalContent = document.createElement("div");
  const modalHeading = document.createElement("h3");
  const modalSubHeading = document.createElement("h4");
  const modalInfo = document.createElement("p");
  const modalPrice = document.createElement("h4");
  const modalBtn = document.createElement("button");

  modal.classList.add("modal", "hide");
  backdrop.classList.add("modal__backdrop");
  modalWindow.classList.add("modal__window");
  modalClose.classList.add("modal__close");
  modalClose.innerText = "✖";
  modalImage.classList.add("modal__image");
  modalImageImg.setAttribute("src", "./img/learning-react.jpg");
  modalImageImg.setAttribute("alt", "./img/learning-react.jpg");
  modalContent.classList.add("modal__content");
  modalHeading.classList.add("modal__heading");
  modalHeading.innerText = "Learning React, 2nd Edition";
  modalSubHeading.classList.add("modal__subheading");
  modalSubHeading.innerHTML = "by <i>Alex Banks, Eve Porcello</i>";
  modalInfo.classList.add("modal__info");
  modalInfo.innerHTML =
    "<i>If you want to learn how to build efficient React applications, this is your book. Ideal for web developers and software engineers who understand how JavaScript, CSS, and HTML work in the browser, this updated edition provides best practices and patterns for writing modern React code. No prior knowledge of React or functional JavaScript is necessary.</i>";
  modalPrice.classList.add("modal__subheading", "price");
  modalPrice.innerText = "Price: $25";
  modalBtn.classList.add("modal__btn", "btn");
  modalBtn.innerText = "Add to bag";

  modalImage.append(modalImageImg);
  modalContent.append(
    modalHeading,
    modalSubHeading,
    modalInfo,
    modalPrice,
    modalBtn
  );
  modalWindow.append(modalClose, modalImage, modalContent);
  modal.append(backdrop, modalWindow);
  document.querySelector(".main-content").after(modal);

  modalClose.addEventListener("click", () => {
    modal.classList.add("hide");
  });
  backdrop.addEventListener("click", () => {
    modal.classList.add("hide");
  });
  modalBtn.addEventListener("click", () => {
    const title = modalHeading.innerText;
    const book = booksData.find((b) => b.title === title);
    addBook(book);
  });
})();

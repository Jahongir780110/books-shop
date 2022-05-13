(async function () {
  const booksData = await fetch("../JSON/books.json").then((res) => res.json());

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

  // adding main content
  const main = document.createElement("main");
  main.classList.add("main-content");
  document.querySelector(".header").after(main);

  // start screen section
  const startScreen = document.createElement("start-screen");
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
    cardTitle.classList.add("card-title");
    cardTitle.innerText = book.title;
    cardAuthor.classList.add("card-authod");
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
  });

  catalogueTitle.append(catalogueCursiveLetter, "HE BEST BOOKS IN THE WORLD");
  catalogueContainer.append(catalogueTitle, catalogueList);
  catalogue.append(catalogueContainer);
  document.querySelector(".main-content").append(catalogue);

  // orders section
})();

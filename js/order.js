const isAllLetters = (s) => {
  const pattern = /^[A-Za-z]+$/;
  return s.match(pattern);
};

const checkValidation = () => {
  let isValid = true;
  for (const prop in isValidForm) {
    if (isValidForm[prop] === false) {
      isValid = false;
    }
  }
  if (isValid) {
    submitBtn.querySelector("button").removeAttribute("disabled");
  } else {
    submitBtn.querySelector("button").setAttribute("disabled", "disabled");
  }
};

const checkGiftCount = () => {
  const gifts = gift.querySelectorAll("input");
  let giftCount = 0;
  gifts.forEach((gift) => {
    if (gift.checked) {
      giftCount++;
    }
  });
  return giftCount <= 2;
};

const customerName = document.querySelector(".name");
const surname = document.querySelector(".surname");
const date = document.querySelector(".date");
const street = document.querySelector(".street");
const houseNumber = document.querySelector(".house");
const flatNumber = document.querySelector(".flat");
const payment = document.querySelector(".payment");
const gift = document.querySelector(".gift");
const submitBtn = document.querySelector(".submit");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal__close");
const backdrop = document.querySelector(".modal__backdrop");

const isValidForm = {
  customerName: false,
  surname: false,
  date: false,
  street: false,
  houseNumber: false,
  flatNumber: false,
  payment: false,
  gift: true,
};

customerName.querySelector("input").addEventListener("blur", (e) => {
  const value = e.target.value;

  if (value.length !== 0) {
    customerName.classList.add("containsValue");
  } else {
    customerName.classList.remove("containsValue");
  }

  if (value.length < 4) {
    isValidForm.customerName = false;
    customerName.querySelector(".error-message").innerText =
      "Please add minimum 4 letters";
    customerName.classList.add("error");
    checkValidation();
    return;
  } else if (!isAllLetters(value)) {
    isValidForm.customerName = false;
    customerName.querySelector(".error-message").innerText =
      "Please add only letters";
    customerName.classList.add("error");
    checkValidation();
    return;
  }

  isValidForm.customerName = true;
  customerName.classList.remove("error");
  checkValidation();
});

surname.querySelector("input").addEventListener("blur", (e) => {
  const value = e.target.value;

  if (value.length !== 0) {
    surname.classList.add("containsValue");
  } else {
    surname.classList.remove("containsValue");
  }

  if (value.length < 5) {
    isValidForm.surname = false;
    surname.querySelector(".error-message").innerText =
      "Please add minimum 5 letters";
    surname.classList.add("error");
    checkValidation();
    return;
  } else if (!isAllLetters(value)) {
    isValidForm.surname = false;
    surname.querySelector(".error-message").innerText =
      "Please add only letters";
    surname.classList.add("error");
    checkValidation();
    return;
  }

  isValidForm.surname = true;
  surname.classList.remove("error");
  checkValidation();
});

date.querySelector("input").addEventListener("change", (e) => {
  const value = e.target.value;

  if (new Date(value) - new Date() <= 0) {
    isValidForm.date = false;
    date.querySelector(".error-message").innerText =
      "Please enter date not earlier than next day";
    date.classList.add("error");
    checkValidation();
    return;
  }

  isValidForm.date = true;
  date.classList.remove("error");
  checkValidation();
});

street.querySelector("input").addEventListener("blur", (e) => {
  const value = e.target.value;

  if (value.length !== 0) {
    street.classList.add("containsValue");
  } else {
    street.classList.remove("containsValue");
  }

  if (value.length < 5) {
    isValidForm.street = false;
    street.querySelector(".error-message").innerText =
      "Please add minimum 5 characters";
    street.classList.add("error");
    checkValidation();
    return;
  }

  isValidForm.street = true;
  street.classList.remove("error");
  checkValidation();
});

houseNumber.querySelector("input").addEventListener("blur", (e) => {
  const value = e.target.value;

  if (value.length !== 0) {
    houseNumber.classList.add("containsValue");
  } else {
    houseNumber.classList.remove("containsValue");
  }

  if (isNaN(Number(value)) || Number(value) <= 0) {
    isValidForm.houseNumber = false;
    houseNumber.querySelector(".error-message").innerText =
      "Please add positive numbers";
    houseNumber.classList.add("error");
    checkValidation();
    return;
  }

  isValidForm.houseNumber = true;
  houseNumber.classList.remove("error");
  checkValidation();
});

flatNumber.querySelector("input").addEventListener("blur", (e) => {
  const value = e.target.value;

  if (value.length !== 0) {
    flatNumber.classList.add("containsValue");
  } else {
    flatNumber.classList.remove("containsValue");
  }

  if (
    value[0] === "-" ||
    !value
      .split("-")
      .join("")
      .match(/^[1-9]+[0-9]*$/)
  ) {
    isValidForm.flatNumber = false;
    flatNumber.querySelector(".error-message").innerText =
      "Please add positive numbers (dash symbol is allowed)";
    flatNumber.classList.add("error");
    checkValidation();
    return;
  }

  isValidForm.flatNumber = true;
  flatNumber.classList.remove("error");
  checkValidation();
});

payment.querySelectorAll("input").forEach((radio) => {
  radio.addEventListener("change", () => {
    isValidForm.payment = true;
    checkValidation();
  });
});

gift.querySelectorAll("input").forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    if (checkGiftCount()) {
      isValidForm.gift = true;
      gift.classList.remove("error");
    } else {
      isValidForm.gift = false;
      gift.querySelector(".error-message").innerText =
        "Please choose at most 2 gifts";
      gift.classList.add("error");
    }
    checkValidation();
  });
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  modal.querySelector(".name .value").innerText =
    customerName.querySelector("input").value;
  modal.querySelector(".surname").querySelector(".value").innerText =
    surname.querySelector("input").value;
  modal.querySelector(".date").querySelector(".value").innerText =
    date.querySelector("input").value;
  modal.querySelector(".street").querySelector(".value").innerText =
    street.querySelector("input").value;
  modal.querySelector(".houseNumber").querySelector(".value").innerText =
    houseNumber.querySelector("input").value;
  modal.querySelector(".flatNumber").querySelector(".value").innerText =
    flatNumber.querySelector("input").value;
  modal.querySelector(".payment").querySelector(".value").innerText =
    payment.querySelector("input:checked").value;

  const gifts = [];
  gift.querySelectorAll("input:checked").forEach((checkbox) => {
    gifts.push(checkbox.value);
  });

  modal.querySelector(".gifts").querySelector(".value").innerText =
    gifts.join(", ");

  modal.classList.remove("hide");
});

modalClose.addEventListener("click", () => {
  modal.classList.add("hide");
});

backdrop.addEventListener("click", () => {
  modal.classList.add("hide");
});

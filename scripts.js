// Базова перевірка форми зворотного зв'язку
document.addEventListener("DOMContentLoaded", function () {
  const heroBtn = document.querySelector(".hero-btn");
  heroBtn.addEventListener("click", () => {
    document.querySelector("#concerts").scrollIntoView();
  });

  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = form.elements["name"].value.trim();
    const email = form.elements["email"].value.trim();
    const message = form.elements["message"].value.trim();
    let valid = true;
    let errorMsg = "";

    // Перевірка імені
    if (name.length < 2) {
      valid = false;
      errorMsg += "Введіть коректне ім'я (мінімум 2 символи).\n";
    }
    // Перевірка email
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      valid = false;
      errorMsg += "Введіть коректний email.\n";
    }
    // Перевірка повідомлення
    if (message.length < 5) {
      valid = false;
      errorMsg += "Введіть повідомлення (мінімум 5 символів).";
    }

    if (valid) {
      const params = new URLSearchParams({ name, email, message });
      fetch("/contact-form?" + params.toString(), { method: "GET" }).then(
        () => {
          document.querySelector(".form-success").style.display = "block";
          setTimeout(() => {
            document.querySelector(".form-success").style.display = "none";
            form.reset();
          }, 3000);
        },
      );
    } else {
      alert(errorMsg);
    }
  });
});

const modal = document.getElementById("modal");
const openBtns = document.querySelectorAll(".btn-table");
const closeBtn = document.querySelector(".modal-close");
const overlay = document.querySelector(".modal-overlay");
const popupCity = document.querySelector("#popupCity");
const orderForm = document.querySelector(".order-form");

orderForm.addEventListener("submit", (e) => {
  e.preventDefault();
  document.querySelector(".form-success2").style.display = "block";
  setTimeout(() => {
    document.querySelector(".form-success2").style.display = "none";
    orderForm.reset();
    closeModal();
  }, 3000);
});

openBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const city = btn.dataset.city;
    popupCity.textContent = city;

    modal.classList.add("active");
    document.body.classList.add("modal-open");
  });
});

function openModal() {
  modal.classList.add("active");
  document.body.classList.add("modal-open");

  //   modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.remove("active");
  document.body.classList.remove("modal-open");

  //   modal.setAttribute("aria-hidden", "true");
}

closeBtn.addEventListener("click", closeModal);

/* закрытие по overlay */
overlay.addEventListener("click", closeModal);

/* закрытие по ESC */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeModal();
  }
});

const btnSubmit = document.getElementById("btnSubmit");
btnSubmit.addEventListener("click", event => {
  event.preventDefault();
  const form = document.getElementById("comments-form");
  const commentsContainer = document.getElementById("comments");
  const formUserName = document.getElementById("userName");
  const formUserComment = document.getElementById("userComment");
  if (form.checkValidity() === false) {
    event.stopPropagation();
    form.classList.add("was-validated");
  } else {
    commentsContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="mb-4"><p>
      ${formUserComment.value}
      </p><div class="d-flex justify-content-between"><span>${new Date().toLocaleString(
        "uk-UK",
        { hour12: false }
      )}</span><strong>
      ${formUserName.value}
      </strong></div></div>`
    );
    form.classList.remove("was-validated");
    formUserComment.value = "";
    formUserName.value = "";
  }
});

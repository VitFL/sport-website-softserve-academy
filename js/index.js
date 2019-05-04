const btnSubmit = document.getElementById("btnSubmit");
btnSubmit.addEventListener("click", event => {
  event.preventDefault();
  // Fetch form to apply custom Bootstrap validation
  const form = document.getElementById("comments-form");
  const commentsContainer = document.querySelector(".comments");
  const formUserName = document.getElementById("userName");
  const formUserComment = document.getElementById("userComment");
  if (form[0].checkValidity() === false) {
    event.stopPropagation();
    form.classList.add("was-validated");
  } else {
    // Perform ajax submit here...
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

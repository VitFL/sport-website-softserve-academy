const btnSubmit = document.getElementById("btnSubmit");
const form = document.getElementById("comments-form");
const commentsContainer = document.getElementById("comments");
const formUserName = document.getElementById("userName");
const formUserComment = document.getElementById("userComment");

window.onload = () => {
  fetchLocalStorage().forEach(comment => { commentsContainer.insertAdjacentHTML('beforeend', comment)});  
}

const getCurrentDate = () => new Date().toLocaleString(
  "uk-UK",
  { hour12: false }
);

const fetchLocalStorage = () => {
  let comments = Object.keys(localStorage)
  .filter(key => key.startsWith('message~'))
  .map(key => localStorage[key]);
  return comments;
}


const getCommentHTML = (userName, userComment, date) => {
  const newComment = `<div class="mb-4"><p>
    ${userComment}
    </p><div class="d-flex justify-content-between"><span>${date}</span><strong>
    ${userName}
    </strong></div></div>`;
  return newComment;
}


btnSubmit.addEventListener("click", event => {
  event.preventDefault();
  if (form.checkValidity() === false) {
    event.stopPropagation();
    form.classList.add("was-validated");
  } else {
    const commentHTML = getCommentHTML(formUserName.value, formUserComment.value, getCurrentDate());
    commentsContainer.insertAdjacentHTML(
      "beforeend",
     commentHTML
    );

    const key = `message~${Date.now()}`;     
    saveToLocalStorage(key, commentHTML);
    
    form.classList.remove("was-validated");
    formUserComment.value = "";
    formUserName.value = "";
  }
});

formUserComment.addEventListener("input", event => {
  if (event.target.value === " ") event.target.value = "";
});

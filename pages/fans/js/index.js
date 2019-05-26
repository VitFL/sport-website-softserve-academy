const btnSubmit = document.getElementById("btnSubmit");
const form = document.getElementById("comments-form");
const commentsContainer = document.getElementById("comments");
const formUserName = document.getElementById("userName");
const formUserComment = document.getElementById("userComment");

window.onload = () => {
  fetchLocalStorage().forEach(comment => { 
    const {timestamp, userName, userComment} = JSON.parse(comment);
    saveToDB(timestamp, userName, userComment) ? deleteFromLocalStorage(`comment-${timestamp}`) : null;
  });  
  fetchDB();
}

const fetchDB = () => {
  const commentsStub = [
    {timestamp: 1558477306623, userName: 'Ivan Kokos', userComment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae, voluptate pariatur? Consectetur veniam ex vitae asperiores odit libero hic dicta consequuntur quam possimus. Animi aliquam, error perspiciatis expedita numquam voluptate?'},
    {timestamp: 1558349896234, userName: 'Ihor Dodon', userComment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident ea architecto dolorem maxime eveniet aut voluptatibus, minus corporis aliquam unde ut! Nemo cumque laboriosam earum non culpa ullam sint sapiente.'},
    {timestamp: 1557745096234, userName: 'Vasia Dubilet', userComment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore et fugit itaque dicta natus doloremque rerum reprehenderit ipsam corporis ipsum eos illo asperiores atque, maiores mollitia blanditiis nostrum soluta minus!'}
  ]
  commentsStub.forEach(comment => {
    const commentHTML = getCommentHTML(comment.timestamp, comment.userName, comment.userComment);
    newCommentToDOM(commentHTML);
    }
  )
}

const saveToDB = (timestamp, userName, userComment) => {
  const value = JSON.stringify({timestamp, userName, userComment});
  const key = `comment-${timestamp}`;  
  console.log('Saved to DB:')
  console.log(value);
  return true;
}

const fetchLocalStorage = () => {
  let comments = Object.keys(localStorage)
  .filter(key => key.startsWith('comment-'))
  .map(key => localStorage[key]);
  return comments;
}

const saveToLocalStorage = (timestamp, userName, userComment) => {
  const value = JSON.stringify({timestamp, userName, userComment});
  const key = `comment-${timestamp}`;  
  localStorage.setItem(key, value);
}

const deleteFromLocalStorage = (key) => {
  console.log('deleted');
  localStorage.removeItem(key);
  removeFromDOM(key);
};

const newCommentToDOM = (commentHTML) => {
  commentsContainer.insertAdjacentHTML('beforeend', commentHTML); 
}

const removeFromDOM = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) element.parentNode.removeChild(element);
}


const getCommentHTML = (timestamp, userName, userComment, isPending = false) => {
  const date = getDateFromTimestamp(timestamp);
  const newComment = `<div class="mb-4 p-3 d-flex justify-content-between ${isPending ? "bg-warning text-white" : ""}"${isPending ? `id="comment-${timestamp}"` : ""}>
  <div class="d-flex flex-column w-100"><p>
  ${userComment}
  </p>
  <div class="d-flex justify-content-between"><span>${date}</span><strong>
  ${userName}
  </strong></div></div>
  ${isPending ? `<div class="ml-4 d-flex align-items-center"><button type="button" class="close" aria-label="Close" onclick="deleteFromLocalStorage('comment-${timestamp}')">
  <span aria-hidden="true">&times;</span>
</button></div>` : ""}
  </div>`;
    
  return newComment;
}


btnSubmit.addEventListener("click", event => {
  event.preventDefault();
  if (form.checkValidity() === false) {
    event.stopPropagation();
    form.classList.add("was-validated");
  } else {
    const currentTimestamp = new Date().getTime();
    const commentHTML = getCommentHTML(currentTimestamp, formUserName.value, formUserComment.value, isOffline());
    newCommentToDOM(commentHTML);

    isOffline() 
      ? saveToLocalStorage(currentTimestamp, formUserName.value, formUserComment.value)
      : saveToDB(timestamp, formUserName.value, formUserComment.value);
    form.classList.remove("was-validated");
    formUserComment.value = "";
    formUserName.value = "";
  }
});

formUserComment.addEventListener("input", event => {
  if (event.target.value.trim().length < 1) event.target.value = "";
});

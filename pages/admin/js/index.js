const btnSubmit = document.getElementById("btnSubmit");
const form = document.getElementById("newsForm");
const newsArticleImageUpload = document.getElementById("newsImageUpload");
const newsArticleImagePreview = document.getElementById("newsImagePreview");
const newsArticleTitle = document.getElementById("newsName");
const newsArticleText = document.getElementById("newsText");
const defaultImage = "http://via.placeholder.com/600x200";

window.onload = () => {
  fetchLocalStorage().forEach(newsArticle => { 
    const {timestamp, photo, title, text} = JSON.parse(newsArticle);
    saveToDB(timestamp, photo, title, text) ? deleteFromLocalStorage(`news-${timestamp}`) : null;
  });
}

const saveToDB = (timestamp, photo, title, text) => {
  const value = JSON.stringify({timestamp, photo, title, text});
  const key = `news-${timestamp}`;  
  createAlert('','Success!','News article successfully saved to DB.','success',true,true,'pageMessages');
  return true;
}


const fetchLocalStorage = () => {
  let news = Object.keys(localStorage)
  .filter(key => key.startsWith('news-'))
  .map(key => localStorage[key]);
  return news;
}

const saveToLocalStorage = (timestamp, photo, title, text) => {
  const value = JSON.stringify({timestamp, photo, title, text});
  const key = `news-${timestamp}`;  
  localStorage.setItem(key, value);
  createAlert('','Ohh, snap!','Since we lost internet connection, news article was saved to local state.','warning',true,true,'pageMessages');
  return localStorage.hasOwnProperty(key);
  
}

const deleteFromLocalStorage = (key) => {
  console.log(key);
  localStorage.removeItem(key);
  createAlert('','Info','News article was removed from localStorage.','info',true,true,'pageMessages');
  return !localStorage.hasOwnProperty(key);
};


// Form Validation and submit
btnSubmit.addEventListener("click", event => {
  event.preventDefault();
  if (form.checkValidity() === false) {
    event.stopPropagation();
    form.classList.add("was-validated");
  } else {
    form.classList.remove("was-validated");
    const currentTimestamp = new Date().getTime();
    isOffline() 
      ? saveToLocalStorage(currentTimestamp, newsArticleImagePreview.src, newsArticleTitle.value, newsArticleText.value)
      : saveToDB(currentTimestamp, newsArticleImagePreview.src, newsArticleTitle.value, newsArticleText.value);
    newsArticleImageUpload.value = "";
    newsArticleImagePreview.src = defaultImage;
    newsArticleTitle.value = "";
    newsArticleText.value = "";
  }
});


const loadPreview = () => {
      const reader  = new FileReader();
      reader.addEventListener("load", function () {
          newsArticleImagePreview.src = reader.result ? reader.result : defaultImage;
      }, false);
    
      if (newsArticleImageUpload) {
          reader.readAsDataURL(newsArticleImageUpload.files[0]);
      } 
};
newsArticleImageUpload.addEventListener("change", loadPreview);

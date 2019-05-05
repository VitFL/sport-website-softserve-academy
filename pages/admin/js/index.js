const btnSubmit = document.getElementById("btnSubmit");
const form = document.getElementById("newsForm");
const newsImageUpload = document.getElementById("newsImageUpload");
const newsImagePreview = document.getElementById("newsImagePreview");
const newsName = document.getElementById("newsName");
const newsText = document.getElementById("newsText");

// Form Validation and submit
btnSubmit.addEventListener("click", event => {
  event.preventDefault();
  if (form.checkValidity() === false) {
    event.stopPropagation();
    form.classList.add("was-validated");
  } else {
    form.classList.remove("was-validated");
    alert(`Новину "${newsName.value}" створено!`);
    newsImageUpload.value = "";
    newsImagePreview.src = "http://via.placeholder.com/600x200";
    newsName.value = "";
    newsText.value = "";
  }
});

// Image preview
const loadPreview = event => {
  newsImagePreview.src = event.target.files[0]
    ? URL.createObjectURL(event.target.files[0])
    : "http://via.placeholder.com/600x200";
};
newsImageUpload.addEventListener("change", loadPreview, true);

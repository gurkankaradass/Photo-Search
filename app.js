const formWrapper = document.querySelector(".form-wrapper");
const form = document.querySelector("#form");
const searchInput = document.querySelector("#searchInput");
const buttonWrapper = document.querySelector(".button-wrapper");
const searchButton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearButton");
const imageList = document.querySelector(".imageList-wrapper");

runEventListeners();

function runEventListeners(){
    form.addEventListener("submit", search);
    clearButton.addEventListener("click", clear)
}

function clear(){
    searchInput.value = "";

    //Array.from(imageList.children).forEach((children)=>children.remove());
    imageList.innerHTML="";
}

function search(e){
    imageList.innerHTML="";
    let value = searchInput.value.trim();

    fetch(`https://api.unsplash.com/search/photos?query=${value}`,{
        method : "GET",
        headers : {
            Authorization: "Client-ID Key2KOMI4BzbJdYYiwq2KL9oIsk-5wqZnGEOxnA2_Ts"
        }
    })
    .then((res)=> res.json())
    .then((data)=> {
        Array.from(data.results).forEach((image)=>{
            //console.log(image.urls.small);
            addImageToUI(image.urls.small);
        })
    })
    .catch((err)=> console.log(err));


    e.preventDefault();//Başka sayfaya yönlendirmesin
}

function addImageToUI(url){
    const div = document.createElement("div");
    div.className = "card";

    const img = document.createElement("img");
    img.setAttribute("src", url);
    img.width="400";
    img.height = "400";

    div.appendChild(img);
    imageList.appendChild(div);
}
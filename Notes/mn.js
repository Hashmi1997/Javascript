console.log("Welcome to the Magical World of Notes");
let txt = document.getElementById("floatingTextarea2");
let submit = document.getElementById("add");
let title = document.getElementById("floatingInput");
showNotes();
submit.addEventListener("click", toLocal);

function toLocal() {
    let notes = [];
    let titleStack=[];
    let getNote = localStorage.getItem("notes");
    let getTitle = localStorage.getItem("title");
  if (getNote == null || getTitle == null) {
      notes = [];
      titleStack=[];
    } else {
        notes = JSON.parse(getNote);
        titleStack = JSON.parse(getTitle);
    }
    if (txt.value != ""){
    notes.push(txt.value);
    titleStack.push(title.value);
  }
    let noteUp = JSON.stringify(notes);
    let titleIn = JSON.stringify(titleStack);
    localStorage.setItem("notes", noteUp);
    localStorage.setItem("title", titleIn);
    txt.value = "";
    title.value="";
    showNotes();
}

function showNotes() {
    let getNote = localStorage.getItem("notes");
    let getTitle= localStorage.getItem("title");
    if (getNote == null) {
      notes = [];
    } 
    else {
        notes = JSON.parse(getNote);
        titleStack= JSON.parse(getTitle);
    }
    let html = " ";
     notes.forEach(function (element, index) {
        let top = `${titleStack[index]}`;
        html += ` 
        <div class="card mx-3 my-3 border-dark top" id= "$title[{index+1}]" style="width: 18rem">
        <h5 class="card-title my-3" >${top}</h5>
        <hr>
        <p class="card-text">${element}</p>
        <hr>
        <button class="my-1 btn btn-outline-dark"><b>Copy</b></button>
        <button class="my-3 btn btn-outline-dark" id="${index}" onclick="eraseNotes(this.id)"><b>Delete</b></button>
        </div>  `;});
    let cards = document.getElementById("cards");
    if (notes.length != 0) {
      cards.innerHTML = html;
    } else {
      cards.innerHTML = "<b> No notes yet! </b>";
    } ;
};

function eraseNotes(index) {
  let getNote = localStorage.getItem("notes");
  let getTitle = localStorage.getItem("title");
  if (getNote == null) {
    notes = [];
    titleStack=[];
  } 
  else {
      notes = JSON.parse(getNote);
      titleStack = JSON.parse(getTitle);
       
  }
  notes.splice(index, 1);
  titleStack.splice(index,1)
  // console.log(notes, index, notes[index]);
  notesUp=JSON.stringify(notes);
  titleIn= JSON.stringify(titleStack);
  localStorage.setItem("notes", notesUp);
  localStorage.setItem("title", titleIn);
  showNotes();
}
let searchBtn=document.getElementById("searchBtn");
let searchTxt=document.getElementById("searchTxt");
searchTxt.addEventListener("input", find);
 function find(){
  let getNote = localStorage.getItem("notes");
  let getTitle = localStorage.getItem("title");
  if (getNote == null) {
    notes = [];
    titleStack =[];
  } 
  else {
    notes = JSON.parse(getNote);
    titleStack = JSON.parse(getTitle);
       
  }
  let keyWord=searchTxt.value.toLowerCase();
  notes.forEach(function(element,index)  {
    titleSrch= titleStack[index];
    if (element.includes(keyWord)==true || titleSrch.includes(keyWord)==true) {
      // console.log("found", element);
      let show= document.getElementById(`${index + 1}`)
      // console.log(show.innerHTML);
      show.style.display="block";

  }
  else{
    // console.log("not found", );
    let show= document.getElementById(`${index + 1}`)
      show.style.display="none";
  }})
  // notes.forEach(function(element, index){
  //   if (element.includes(keyWord)){
  //       console.log(document.getElementById(index+1).innerHTML)}
  // })

}



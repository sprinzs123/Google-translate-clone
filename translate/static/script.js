// should be trigered at the even because it doesn't return anything bc it is asyc

// use django api to send data for analysis
// {data: 'your data what is being sent to back end' }
// url hast to end at '/'
// https://stackoverflow.com/questions/45308153/posting-data-to-django-rest-framework-using-javascript-fetch how to do it
function fetchApi(input){
  let translatedOutput = document.querySelector('#translated-text')
  let submitBtn = document.querySelector("#submit-btn");
  submitBtn.addEventListener("click", function (event) {
    let url = 'http://127.0.0.1:8000/api/'
    fetch(url, {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization':'Token ed73db9bf18f3c3067be926d5ab64cec9bcb9c5e'
      },
      body: JSON.stringify({data: input})
    })
    .then(res=>res.json())
    // .then(data => console.log(data))   
    .then(data => {
      let translatedOutput = document.querySelector('#translated-text')
      console.log(data)
      console.log(JSON.stringify(data))
      translatedOutput.innerHTML = JSON.stringify(data).value
    })     
 });
}


// ################### ALL FUNCTION FOR CHARACTER LIMIT
// global variable for max characters
let charLimit = 10;
console.log(fetchApi(' this is fine'))

// event listener for when was pressed in area field
// call function to record how many characters in field and if style needs to be changed
function charCount() {
  input = document.querySelector("#input-area");
  let charCount = document.querySelector(".current-char");
  let countBox = document.querySelector(".count");
  input.addEventListener("keydown", (event) => {
    let currentLength = input.value.length;
    styleCount();
  });
}
charCount();

// add styles if went over character limit
function styleCount() {
  let charCount = document.querySelector(".current-char");
  let countBox = document.querySelector(".count");
  let currentLength = input.value.length;
  charCount.innerHTML = currentLength;

  if (currentLength > charLimit) {
    countBox.classList.add("letter-2");
  } else {
    countBox.classList.remove("letter-2");
  }
}
styleCount();

// get true of false if over or under char limit
function isFilled() {
  let charCount = document.querySelector(".current-char").innerHTML;
  console.log(charCount.innerHTML);
  return charCount < charLimit;
}

// ############## LANGUAGE SELECTION

// both function used for language toggling
// all info is sent to common function for processing
function selectInput() {
  let allBtns = document.querySelectorAll(".in-lan");
  let selectedDiv = document.querySelector('.languages')
  selectLanguage(allBtns, selectedDiv)
}
function selectOutput() {
    let allBtns = document.querySelectorAll(".out-lan");
    let selectedDiv = document.querySelector('.translated')
    selectLanguage(allBtns, selectedDiv)
  };


// toggling buttons language
// common function for both language switching for output and input
function selectLanguage(allBtns, parentDiv){
    allBtns.forEach((btn) => {
        btn.addEventListener("click", (event) => {
        if (btn.classList.contains("selected-lan") == false){
            let originalSelected = parentDiv.querySelector('.selected-lan')
            originalSelected.classList.remove('selected-lan')
            btn.classList.add('selected-lan')
          };
        });
      });
}






selectOutput()
selectInput();

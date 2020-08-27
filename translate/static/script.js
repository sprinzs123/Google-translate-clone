// ######################################################################
// ################ ALL FUNCTIONS RELATED TO API CALLS ##################
// ######################################################################

// global variable/dictionary for language selection
// used to select language code from what language output button is pressed
let languages = {'DETECTED LANGUAGE': 'default lan', 'SPANISH': 'es', 'ENGLISH':'en', 'RUSSIAN': 'ru'}

// should be triggered at the even because it doesn't return anything bc it is asyc
// writes directly onto output div; get detected language
// use django api to send data for analysis
// {data: 'your data what is being sent to back end' }
// url hast to end at '/'
// https://stackoverflow.com/questions/45308153/posting-data-to-django-rest-framework-using-javascript-fetch how to do it
function fetchApi(input, targetLan, inputLan){
  let translatedOutput = document.querySelector('#translated-text')
    let url = 'http://127.0.0.1:8000/api/'
    fetch(url, {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization':'Token ed73db9bf18f3c3067be926d5ab64cec9bcb9c5e'
      },
      body: JSON.stringify({data: input, target: targetLan, input: inputLan})
    })
    .then(res=>res.json())
    .then(res => {  
      let translatedOutput = document.querySelector('.output-text')
      translatedOutput.innerHTML = JSON.stringify(res[1])
      let detectedLanguage = JSON.stringify(res[0])
      console.log(detectedLanguage)
      let detectedLan = document.querySelector('.in-lan')
      detectedLan.innerHTML = detectedLanguage.toLocaleUpperCase() + ' -DETECTED '      
    })   
}


// start API call
// language code is get from JSON list; need for Google API
let submitBtn = document.querySelector("#submit-btn");
submitBtn.addEventListener("click", function (event) {
  if(underCharLimit()){
    let outputLan = languages[getTargetLanguage()]
    let inputLan = languages[getSelectedLanguage()]
    let needTranslation = document.querySelector('#input-area').value
    fetchApi(needTranslation, outputLan, inputLan)
  }
})

// returns what is current languages selected
// used in api call
function getSelectedLanguage(){
  let parentDiv = document.querySelector('#all-input');
  let selected = parentDiv.querySelector('.selected-lan')
  return selected.innerHTML
}

function getTargetLanguage(){
  let parentDiv = document.querySelector('#all-output');
  let selected = parentDiv.querySelector('.selected-lan')
  return selected.innerHTML
}


// ################### ALL FUNCTION FOR CHARACTER LIMIT
// global variable for max characters
let charLimit = 100;

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
function underCharLimit() {
  let charCount = document.querySelector(".current-char").innerHTML;
  return charCount < charLimit;
}

// ############## LANGUAGE SELECTION

// both function used for language toggling
// toggles language selection btn
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

// clear text fields on 'X' btn click
// resets char in the field back to 0
function clearFields(){
  let charLimit = document.querySelector('.current-char')
  let clearBtn = document.querySelector('.clear-text')
  let textBoxes = document.querySelectorAll('.area-text')
  clearBtn.addEventListener('click', event=>{
    textBoxes.forEach(insideText => {
      insideText.innerHTML = ''
      insideText.value = ''
      charLimit.innerHTML = 0

    });
  })
}
clearFields()
let submitBtn = document.querySelector("#submit-btn");
submitBtn.addEventListener("click", function (event) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://127.0.0.1:8000/", true);
  console.log(xhr);
  xhr.onload = function () {
    console.log("here");
    if (status == 0) {
      let result = JSON.parse(this.responseText);
      console.log(result);
    }
  };
  xhr.send();
});

// ################### ALL FUNCTION FOR CHARACTER LIMIT
// global variable for max characters
let charLimit = 10;

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

"use strict";
const submit = document.querySelector("#submit");
const addTask = document.querySelector("#addtask");
const taskDueDate = document.querySelector("#taskDueDate");
const addComments = document.querySelector("#addComments");
const msg = document.querySelector("#msg");
const posts = document.querySelector("#posts");
const cardTask = document.querySelector("#cardTask");
const cardDate = document.querySelector("#cardDate");
//SELECTING WEHRE TASKS SHOULD GO ON THE RIGHT
const myTaskCard = document.querySelector("#myTaskCard");
const sharedTaskCard = document.querySelector("#sharedTaskCard");

//LOOK ------------>FETCHING AND ADDING USER NAME TO DOM
// function getName() {
//   let name = prompt("To begin adding tasks, what is your first name?");

//if cancel is clicked, the prompt is dismissed.
// if (name == null) {
//   return false;
// }

//if no name is entered, prompted to enter one.
// if (name == "") {
//   alert("You must enter your name into the box!");
//   tryAgain();
//   return false;
// }

//Remove leading and trailing whitespace from the name
// name = name.trim();

//Check if the name contains only letters and spaces
//   if (!/^[a-zA-Z\s]+$/.test(name)) {
//     alert("Please only enter letters and spaces!");
//     tryAgain();
//     return false;
//   } else {
//     if (name) {
//       document.getElementById("greeting").innerHTML = `Hi, ${name}!`;
//     }
//     return name;
//   }
// }

// function tryAgain() {
//   getName();
// }

// const userName = getName();
// if (userName) {
//   document.getElementById("greeting").innerHTML = `Hi, ${userName}!`;
// }

//onclick event for the "add task button"
// const addAUserButton = document.querySelector("#getUserName");
// addAUserButton.addEventListener("click", getName);

//LOOK --->CREATING CARDS
submit.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("button clicked");

  formValidation();
});

const formValidation = () => {
  if (addTask.value === "") {
    msg.textContent = "Task cannot be blank";
    console.log("failure");
  } else {
    console.log("successs");
    msg.innerHTML = "";
    acceptData();
  }
};

let data = {};

let acceptData = () => {
  data["task"] = addTask.value;
  data["comment"] = addComments.value;
  data["date"] = taskDueDate.value;
  // store the checked status of the radio buttons
  data["panda"] = radioPanda.checked;
  data["dog"] = radioDog.checked;
  data["mongoose"] = radioMongoose.checked;
  createPost();
};
//function to check if a radio button's value is true
//if true, add corrasponding avatar to div id#
function renderAvatar() {
  let avatarImg = "";
  if (data.panda) {
    avatarImg =
      '<img src="./assets/panda.svg" class="d-inline img-fluid" id="userAvatarHere" style="max-width: 80%" alt="user image" />';
  } else if (data.dog) {
    avatarImg =
      '<img src="./assets/dog.svg" class="d-inline img-fluid" id="userAvatarHere" style="max-width: 80%" alt="user image" />';
  } else if (data.mongoose) {
    avatarImg =
      '<img src="./assets/mongoose.svg" class="d-inline img-fluid" id="userAvatarHere" style="max-width: 80%" alt="user image" />';
  }
  return avatarImg;
}

const createPost = () => {
  const postTemplate = `
    <div id="posts" class="card mb-3 rounded-5" style="max-width: 610px; border: 0">
      <div class="row g-0 pt-3">
        <div id="userAvatarHere" class="col-md-2 pt-2">
          ${renderAvatar()}
        </div>
  
        <div class="col-md-10">
          <div class="card-body text-start">
            <div class="card-text" id="cardTask">
              ${data.task}
            </div>
            <div class="card-text" id="cardComment">
              ${data.comment}
            </div>
          </div>
          <div class="card-body text-end pb-3">
            <div class="d-inline pe-5" id="cardDate">${data.date}</div>
            <div class="d-inline pe-2">
              <img onClick='editPost(this)'
                  class="actions-icon-bootstrap"
                  src="assets/edit.svg"
                  alt="edit"
                  style="max-width: 5.5%"
              />
            </div>
  
            <div class="d-inline pe-2">
              <img onClick='taskDone(this)'
                  class="actions-icon-bootstrap"
                  src="assets/checkmark.svg"
                  alt="checkbox"
                  style="max-width: 6%"
              />
            </div>
  
            <div class="d-inline pe-4">
              <img onClick='deletePost(this)'
                  class="actions-icon-bootstrap"
                  src="assets/x.svg"
                  alt="x"
                  style="max-width: 5.5%"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  cardTask.innerHTML += postTemplate;

  addTask.value = "";
  taskDueDate.value = "";
  addComments.value = "";
};

//DELETE POST BY CLICKING ICON
const deletePost = (e) => {
  e.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
};

//EDIT POST BY CLICKING ON ICON - //return value in card back to the forms to be edited
let editPost = (e) => {
  let taskText =
    e.parentElement.parentElement.previousElementSibling.firstElementChild;
  let taskDate = e.parentElement.previousElementSibling;
  let taskComments =
    e.parentElement.parentElement.previousElementSibling.lastElementChild;

  // //push the values in the cards back to the input fields. There was weird space so I trimmed it.
  addTask.value = taskText.innerHTML.trim();
  taskDueDate.value = taskDate.innerHTML;
  addComments.value = taskComments.innerHTML.trim();

  //deletes old card
  e.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
};

//MARK TASK AS DONE
//task and comment are children of a common parent, so use querySElectorAll to select all the children and loop through them.
let taskDone = (e) => {
  let parent = e.parentElement.parentElement.previousElementSibling;
  let children = parent.querySelectorAll("*");
  for (let child of children) {
    child.classList.toggle("crossed-out");
  }
};

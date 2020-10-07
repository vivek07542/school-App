
var btnSubmit = document.getElementById("btnSubmit");
var userFirstName = document.getElementById("userFirstName");
var userLastName = document.getElementById("userLastName");
var rdbMaleGender = document.getElementById("rdbMaleGender");
var rdbFemaleGender = document.getElementById("rdbFemaleGender");
var txtUserAddress = document.getElementById("txtUserAddress");
var divGender = document.getElementById("divGender");
var txtUserMobileNo = document.getElementById("txtUserMobileNo");
var txtUserEmail = document.getElementById("txtUserEmail");
var userGender = document.getElementsByName("inlineRadioOptions");
var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
var chkFormData = document.getElementById("chkFormData");
var tblData = document.getElementById("tblData");
var markContainer = document.getElementById("markContainer");
var displayDynamic = document.getElementById("displayDynamic");
var displayMainDiv = document.getElementById("displayMainDiv");
var submitButton = document.getElementById("submitButton");
var displaySubject = document.getElementById("displaySubject");
var displaySubjectMarks = document.getElementById("displaySubjectMarks");
var displayUserSemester = document.getElementById("displayUserSemester");
var studentMarkDetail = document.getElementById("studentMarkDetail");
// Select Function
var countryStateInfo = {
  "USA": {
    "California": {
      "Los Angeles": ["90001", "90002", "90003", "90004"],
      "San Diego": ["92093", "92101"]
    },
    "Texas": {
      "Dallas": ["75201", "75202"],
      "Austin": ["73301", "73344"]
    }
  },
  "India": {
    "Assam": {
      "Dispur": ["781005"],
      "Guwahati": ["781030", "781030"]
    },
    "Gujarat": {
      "Vadodara": ["390011", "390020"],
      "Surat": ["395006", "395002"]
    },
    "Madhya Pradesh": {
      "Indore": ["390011", "390020"],
      "Gwalior": ["395006", "395002"],
      "Bhopal": ["390011", "390020"],
      "Guna": ["395006", "395002"],
    },
    "Maharashtra": {
      "Mumbai": ["392001"],
      "Thane": ["401107"],
      "Pune": ["358110"]
    }
  }
}
window.onload = function () {

  //Get html elements
  var countySel = document.getElementById("countySel");
  var stateSel = document.getElementById("stateSel");
  var citySel = document.getElementById("citySel");

  //Load countries
  for (var country in countryStateInfo) {
    countySel.options[countySel.options.length] = new Option(country, country);
  }

  //County Changed
  countySel.onchange = function () {

    stateSel.length = 1; // remove all options bar first
    citySel.length = 1; // remove all options bar first		 

    if (this.selectedIndex < 1)
      return; // done

    for (var state in countryStateInfo[this.value]) {
      stateSel.options[stateSel.options.length] = new Option(state, state);
    }
  }

  //State Changed
  stateSel.onchange = function () {

    citySel.length = 1; // remove all options bar firs

    if (this.selectedIndex < 1)
      return; // done

    for (var city in countryStateInfo[countySel.value][this.value]) {
      citySel.options[citySel.options.length] = new Option(city, city);
    }
  }
}
// Button Submit Function
btnSubmit.addEventListener("click", function () {
  let isCreatedTr = true;
  let selTr = tblData.getElementsByTagName("tr");
  let selectedTr;
  for (i = 0; i < selTr.length; i++) {
    if (selTr[i].style.backgroundColor === "pink") {
      selectedTr = selTr[i];
      isCreatedTr = false;
      break;
    }
  }
  if (validateItem()) {
    if (isCreatedTr) {
      dynamicElementFormation();
    }
    else {
      oldPositionPlacing(selectedTr);
    }
    resetValue();
  };
});
// validation Function
function validateItem() {
  let isAllValidationPassed = true;
  if (userFirstName.value.trim() === "") {
    userFirstName.classList.add("displayBoxWrong");
    let errorDiv = userFirstName.nextElementSibling;
    errorDiv.classList.remove("invalidDisplay");
    errorDiv.classList.add("displayIfWrong");
    isAllValidationPassed = false;
  } else {
    userFirstName.classList.remove("displayBoxWrong");
    userFirstName.classList.add("displayBoxCorrect");
    let error = userFirstName.nextElementSibling;
    error.classList.remove("displayIfWrong");
    error.classList.add("invaliDisplay");
  }
  // Validation Of Last Name
  if (userLastName.value.trim() === "") {
    userLastName.classList.add("displayBoxWrong");
    let errorDiv = userLastName.nextElementSibling;
    errorDiv.classList.remove("invalidDisplay");
    errorDiv.classList.add("displayIfWrong");
    isAllValidationPassed = false;
  }
  else {
    userLastName.classList.remove("displayBoxWrong");
    userLastName.classList.add("displayBoxCorrect");
    let error = userLastName.nextElementSibling;
    error.classList.remove("displayIfWrong");
    error.classList.add("invalidDisplay");
  }
  // Validation Of State
  if (txtUserAddress.value.trim() === "") {
    txtUserAddress.classList.remove("displayBoxCorrect");
    txtUserAddress.classList.add("displayBoxWrong");
    let errorDiv = txtUserAddress.nextElementSibling;
    errorDiv.classList.remove("invalidDisplay");
    errorDiv.classList.add("displayIfWrong");
    isAllValidationPassed = false;
  }
  else {
    txtUserAddress.classList.remove("displayBoxWrong");
    txtUserAddress.classList.add("displayBoxCorrect");
    let error = txtUserAddress.nextElementSibling;
    error.classList.remove("displayIfWrong");
    error.classList.add("invalidDisplay");
  }
  //Validation For Radio Button
  if (rdbMaleGender.checked === false && rdbFemaleGender.checked === false) {
    // divGender.classList.add("displayBoxWrong");
    let errorDiv = divGender.childNodes[5];
    errorDiv.classList.remove("invalidDisplay");
    errorDiv.classList.add("displayIfWrong");
    isAllValidationPassed = false;
  } else {
    // divGender.classList.remove("displayBoxWrong");
    // divGender.classList.add("displayBoxCorrect");
    let error = divGender.childNodes[5];
    error.classList.remove("displayIfWrong");
    error.classList.add("invalidDisplay");
  }
  //Validation For Mobile Number
  if (txtUserMobileNo.value.length !== 10) {
    txtUserMobileNo.classList.remove("displayBoxCorrect");
    txtUserMobileNo.classList.add("displayBoxWrong");
    let errorDiv = txtUserMobileNo.nextElementSibling;
    errorDiv.classList.remove("invalidDisplay");
    errorDiv.classList.add("displayIfWrong");
    isAllValidationPassed = false;
  }
  else {
    txtUserMobileNo.classList.remove("displayBoxWrong");
    txtUserMobileNo.classList.add("displayBoxCorrect");
    let error = txtUserMobileNo.nextElementSibling;
    error.classList.remove("displayIfWrong");
    error.classList.add("invalidDisplay");
  }

  //Validation For Email Id
  if (txtUserEmail.value.match(pattern)) {
    txtUserEmail.classList.remove("displayBoxWrong");
    txtUserEmail.classList.add("displayBoxCorrect");
    let error = txtUserEmail.nextElementSibling;
    error.classList.remove("displayIfWrong");
    error.classList.add("invalidDisplay");
  }
  else {
    txtUserEmail.classList.remove("displayBoxCorrect");
    txtUserEmail.classList.add("displayBoxWrong");
    let errorDiv = txtUserEmail.nextElementSibling;
    errorDiv.classList.remove("invalidDisplay");
    errorDiv.classList.add("displayIfWrong");
    isAllValidationPassed = false;
  }
  //Validation For Select Item
  if (countySel.value === "") {
    countySel.classList.remove("displayBoxCorrect");
    countySel.classList.add("displayBoxWrong");
    let errorDiv = countySel.nextElementSibling;
    errorDiv.classList.remove("invalidDisplay");
    errorDiv.classList.add("displayIfWrong");
    isAllValidationPassed = false;
  }
  else {
    countySel.classList.remove("displayBoxWrong");
    countySel.classList.add("displayBoxCorrect");
    let error = countySel.nextElementSibling;
    error.classList.remove("displayIfWrong");
    error.classList.add("invalidDisplay");
  }
  // Validation For State
  if (stateSel.value === "") {
    stateSel.classList.remove("displayBoxCorrect");
    stateSel.classList.add("displayBoxWrong");
    let errorDiv = stateSel.nextElementSibling;
    errorDiv.classList.remove("invalidDisplay");
    errorDiv.classList.add("displayIfWrong");
    isAllValidationPassed = false;
  }
  else {
    stateSel.classList.remove("displayBoxWrong");
    stateSel.classList.add("displayBoxCorrect");
    let error = stateSel.nextElementSibling;
    error.classList.remove("displayIfWrong");
    error.classList.add("invalidDisplay");
  }
  // Validation For City
  if (citySel.value === "") {
    citySel.classList.remove("displayBoxCorrect");
    citySel.classList.add("displayBoxWrong");
    let errorDiv = citySel.nextElementSibling;
    errorDiv.classList.remove("invalidDisplay");
    errorDiv.classList.add("displayIfWrong");
    isAllValidationPassed = false;
  }
  else {
    citySel.classList.remove("displayBoxWrong");
    citySel.classList.add("displayBoxCorrect");
    let error = citySel.nextElementSibling;
    error.classList.remove("displayIfWrong");
    error.classList.add("invalidDisplay");
  }
  // Validation For Check Box

  if (chkFormData.checked === false) {
    chkFormData.classList.remove("displayBoxCorrect");
    chkFormData.classList.add("displayBoxWrong");
    let errorDiv = chkFormData.nextElementSibling;
    errorDiv.classList.remove("invalidDisplay");
    errorDiv.classList.add("displayIfWrong");
    isAllValidationPassed = false;
  }
  else {
    chkFormData.classList.remove("displayBoxWrong");
    chkFormData.classList.add("displayBoxCorrect");
    let error = chkFormData.nextElementSibling.nextElementSibling;
    error.classList.remove("displayIfWrong");
    error.classList.add("invalidDisplay");
  }
  return isAllValidationPassed;
}
// Dyanamically Created Table on parent Screen
function dynamicElementFormation() {
  let tblTr = document.createElement("tr");
  tblTr.className = "tblTr";
  let tblTdUniqueId = document.createElement("td");
  tblTdUniqueId.innerHTML = "<p></p>";
  tblTdUniqueId.classList.add("counter");
  let tblTdUserName = document.createElement("td");
  tblTdUserName.innerHTML = userFirstName.value + " " + userLastName.value;  
  let tblTdRdbGender = document.createElement("td");
  // Gender Function
  for (i = 0; i < userGender.length; i++) {
    if (userGender[i].checked) {
      tblTdRdbGender.innerHTML = userGender[i].value;
    }
  }
  let tblTdAddress = document.createElement("td");
  tblTdAddress.innerHTML = txtUserAddress.value;
  let tblTdCountry = document.createElement("td");
  tblTdCountry.innerHTML = countySel.value;
  let tblTdState = document.createElement("td");
  tblTdState.innerHTML = stateSel.value;
  let tblTdCity = document.createElement("td");
  tblTdCity.innerHTML = citySel.value;
  let tblTdMobile = document.createElement("td");
  tblTdMobile.innerHTML = txtUserMobileNo.value;
  let tblTdEmail = document.createElement("td");
  tblTdEmail.innerHTML = txtUserEmail.value;
  let tblTdEdit = document.createElement("td");
  tblTdEdit.innerHTML = " Edit ";
  tblTdEdit.addEventListener("click", function () {
    let parentTr = tblTdEdit.parentNode;
    parentTr.style.backgroundColor = "pink";
    // Name Edit
    userFirstName.value = parentTr.children[1].innerText.split(" ")[0];
    userLastName.value = parentTr.children[1].innerText.split(" ")[1];
    // Gender Edit
    if (rdbFemaleGender.value === parentTr.children[2].innerText) {
      rdbFemaleGender.checked = true;
    } else {
      rdbMaleGender.checked = true;
    };
    // Address Edit        
    txtUserAddress.value = parentTr.children[3].innerText;
    // Country Edit
    countySel.value = parentTr.children[4].innerText;
    // State Edit 
    stateSel.value = parentTr.children[5].innerText;
    // City Sel 
    citySel.value = parentTr.children[6].innerText;
    // Mobile Edit
    txtUserMobileNo.value = parentTr.children[7].innerText;
    // Email Edit
    txtUserEmail.value = parentTr.children[8].innerText;

    // parentTr.parentNode.removeChild(parentTr);
  });
  let tblTdDelete = document.createElement("td");
  tblTdDelete.innerHTML = " Delete ";
  tblTdDelete.addEventListener("click", function () {
    if (confirm("Do you want to delete the details?")) {
      let parentTr = tblTdDelete.parentNode;
      parentTr.parentNode.removeChild(parentTr);
    }
  });
  let tblTdMarkup = document.createElement("td");
  tblTdMarkup.innerHTML = " Add Mark ";
  tblTdMarkup.addEventListener("click", function () {
    markContainer.style.display = "flex";
    popUp(tblTdMarkup);
    dynamicDivFormation();
    let parentElement = displayMainDiv.children[0].children[3];
    parentElement.disabled = true;
  });
  tblTr.appendChild(tblTdUniqueId);
  tblTr.appendChild(tblTdUserName);
  tblTr.appendChild(tblTdRdbGender);
  tblTr.appendChild(tblTdAddress);
  tblTr.appendChild(tblTdCountry);
  tblTr.appendChild(tblTdState);
  tblTr.appendChild(tblTdCity);
  tblTr.appendChild(tblTdMobile);
  tblTr.appendChild(tblTdEmail);
  tblTr.appendChild(tblTdEdit);
  tblTr.appendChild(tblTdDelete);
  tblTr.appendChild(tblTdMarkup);
  tblData.appendChild(tblTr);
}
// Extracting & Placing Value to Old Place
function oldPositionPlacing(selectedTr) {
  let selectedTds = selectedTr.getElementsByTagName("td");
  selectedTds[1].innerHTML = userFirstName.value + " " + userLastName.value;
  for (i = 0; i < userGender.length; i++) {
    if (userGender[i].checked) {
      selectedTds[2].textContent = userGender[i].value;
    }
  }
  selectedTds[3].innerHTML = txtUserAddress.value;
  selectedTds[4].innerHTML = countySel.value;
  selectedTds[5].innerHTML = stateSel.value;
  selectedTds[6].innerHTML = citySel.value;
  selectedTds[7].innerHTML = txtUserMobileNo.value;
  selectedTds[8].innerHTML = txtUserEmail.value;
  selectedTr.removeAttribute("style");
}
// Reseting the Value After Submit
function resetValue() {
  userFirstName.value = "";
  userLastName.value = "";
  rdbMaleGender.checked = false;
  rdbFemaleGender.checked = false;
  txtUserAddress.value = "";
  txtUserMobileNo.value = "";
  txtUserEmail.value = "";
  countySel.value = "";
  stateSel.value = "";
  citySel.value = "";
  chkFormData.checked = false;
}
// Function PopUp Children Screen on Add Mark Click
function popUp(tblTdMarkup) {
  let parentTr = tblTdMarkup.parentNode;
  let displayUserName = document.getElementById("displayUserName");
  displayUserName.innerHTML = parentTr.children[1].innerText;
};
// close Function of Child Element
let closeDynamic = document.getElementById("closeDynamic");
closeDynamic.addEventListener("click", function () {
  markContainer.style.display = "none";
});
// Add mark Pop up Div formation on click with Add Mark 
function dynamicDivFormation() {
  let dynamicallyCreatedDiv = document.createElement("div");
  dynamicallyCreatedDiv.classList.add("displayDynamic");
  let dynamicallyCreatedSelect = document.createElement("select");
  dynamicallyCreatedSelect.classList.add("displaySubject");
  fillSubjects(dynamicallyCreatedSelect);
  let dynamicallyCreatedInput = document.createElement("input");
  dynamicallyCreatedInput.classList.add("displaySubjectMarks");
  dynamicallyCreatedInput.setAttribute("placeholder", "Marks");
  let dynamicallyCreatedAddOn = document.createElement("button");
  dynamicallyCreatedAddOn.classList.add("btn", "btn-sm", "btn-primary");
  dynamicallyCreatedAddOn.innerHTML = "+";
  dynamicallyCreatedAddOn.addEventListener("click", function () {
    let parentDiv = dynamicallyCreatedAddOn.parentNode;
    let parentMainDiv = parentDiv.parentNode;
    if (parentMainDiv.children.length === 10) {
      dynamicallyCreatedAddOn.disabled = true;
    }
    else {
      dynamicDivFormation();
      dynamicallyCreatedAddOn.disabled = false;
    }
  });
  let dynamicallyCreatedRowDelete = document.createElement("button");
  dynamicallyCreatedRowDelete.classList.add("btn", "btn-sm", "btn-primary");
  dynamicallyCreatedRowDelete.innerHTML = "-";
  dynamicallyCreatedRowDelete.addEventListener("click", function () {
    let parentDiv = dynamicallyCreatedRowDelete.parentNode;
    parentDiv.parentNode.removeChild(parentDiv);
  });
  dynamicallyCreatedDiv.appendChild(dynamicallyCreatedSelect);
  dynamicallyCreatedDiv.appendChild(dynamicallyCreatedInput);
  dynamicallyCreatedDiv.appendChild(dynamicallyCreatedAddOn);
  dynamicallyCreatedDiv.appendChild(dynamicallyCreatedRowDelete);
  displayMainDiv.appendChild(dynamicallyCreatedDiv);
}
// Submit Button Click Event function and conditions 
submitButton.addEventListener("click", function () {
   let isCreatedDiv = true;
  let studentMarkDetail = document.getElementById("studentMarkDetail");
  let selectedTrDiv;
  for (let i = 0;i<studentMarkDetail.children.length;i++) {
    if (studentMarkDetail.children[i].style.backgroundColor==="pink"){
      selectedTrDiv = studentMarkDetail.children[i];
      isCreatedDiv = false;
      break;
    }
  }
  if (isCreatedDiv) {
    dynamicMark(submitButton, studentMarkDetail);   
  }
  else {
    let selDiv = selectedTrDiv.children;
    let parentDiv = document.getElementById("markContent");
    selDiv[0].textContent = "Student Name : " + parentDiv.children[1].innerHTML;
    selDiv[1].innerHTML = "Semester : " + parentDiv.children[2].value;
    selectedTrDiv.removeChild(selDiv[2]);
    let selectedDiv = parentDiv.children[3].children;
    for (i = 0; i < selectedDiv.length; i++) {
      let subjectMarkDiv = document.createElement("div");
      let subjectMarkDetail = document.createElement("input");
      let paraSubjectMarkDetail = document.createElement("input");
      subjectMarkDetail.value += selectedDiv[i].children[0].value;
      paraSubjectMarkDetail.value += selectedDiv[i].children[1].value;
      subjectMarkDiv.appendChild(subjectMarkDetail);
      subjectMarkDiv.appendChild(paraSubjectMarkDetail);      
    selectedTrDiv.insertBefore(subjectMarkDiv,selectedTrDiv.lastChild);

    }
    studentMarkDetail.appendChild(selectedTrDiv);
    selectedTrDiv.style.backgroundColor = "rgb(190,177,250)";
  }
  let parentDiv = submitButton.parentNode;
  validateDiv(displayMainDiv);
  resetSubmit(markContainer, parentDiv);
});
// Select Function for Dynamic Create 
function fillSubjects(dynamicallyCreatedSelect) {
  let subjectArray = ["Select Subject", "English", "Hindi", "French", "Mathametics", "Physics", "Chemistry", "Moral Value", "Social Science", "General Awarness"];
  for (let i = 0; i < subjectArray.length; i++) {
    var optn = subjectArray[i];
    var el = document.createElement("option");
    el.textContent = optn;
    if (optn === "Select Subject") {
      el.setAttribute("selected", "selected");
      el.disabled = true;
      el.value = "";
    }
    else {
      el.value = optn;
    }
    dynamicallyCreatedSelect.appendChild(el);
  }
}
// Reset Finction For Submit Button
function resetSubmit(markContainer, parentDiv) {
  parentDiv.children[1].innerHTML = "";
  parentDiv.children[2].value = "";
  markContainer.style.display = "none";
  let list = parentDiv.children[3]

  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild);
  }
  // list.innerHTML="";  
}
// Validation Function For popUp 
function validateDiv(displayMainDiv) {
  if (displayUserSemester.value === "") {
    displayUserSemester.style.border = "2px solid red";
    
  }
  else {
    displayUserSemester.style.border = "2px solid green";
  }
  let selectedDiv = displayMainDiv.children;
  for (i = 0; i < selectedDiv.length; i++) {
    if (selectedDiv[i].children[0].value === "") {
      selectedDiv[i].children[0].style.border = "2px solid red";
    }
    else {
      selectedDiv[i].children[0].style.border = "2px solid green";
    }
    if (selectedDiv[i].children[1].value === ""){
      selectedDiv[i].children[1].style.border = "2px solid red";     
    }
    else {
      selectedDiv[i].children[1].style.border = "2px solid green";
    }
  }
}
// Student Dynamic Created Detail by clicking Submit button on popUp 
function dynamicMark(submitButton, studentMarkDetail) {
  let divMarkDetail = document.createElement("div");
  let paraMarkDetail = document.createElement("p");
  let paraSemesterMarkDetail = document.createElement("p");
  let divSubjectMarkContainer = document.createElement("div");
  let EditButton = document.createElement("button");
  EditButton.innerText = "Edit";
  EditButton.classList.add("btn", "btn-sm", "btn-primary");
  EditButton.addEventListener("click", function () {
    markContainer.style.display = "flex";
    let parentPlacingDiv = EditButton.parentNode;
    parentPlacingDiv.style.backgroundColor = "pink";
    placingValueInPopUp(parentPlacingDiv);
    let parentElement = displayMainDiv.children[0].children[3];
    parentElement.disabled = true;
  });
  let parentDiv = submitButton.parentNode;
  paraMarkDetail.innerHTML = "Student Name : " + parentDiv.children[1].innerHTML;
  paraSemesterMarkDetail.innerHTML = "Semester : " + parentDiv.children[2].value;
  let selectedDiv = parentDiv.children[3].children;
  for (i = 0; i < selectedDiv.length; i++) {
    let subjectMarkDiv = document.createElement("div");
    let subjectMarkDetail = document.createElement("input");
    let paraSubjectMarkDetail = document.createElement("input");
    subjectMarkDetail.value += selectedDiv[i].children[0].value;
    paraSubjectMarkDetail.value += selectedDiv[i].children[1].value;
    subjectMarkDiv.appendChild(subjectMarkDetail);
    subjectMarkDiv.appendChild(paraSubjectMarkDetail);
    divSubjectMarkContainer.appendChild(subjectMarkDiv);
  }
  divMarkDetail.appendChild(paraMarkDetail);
  divMarkDetail.appendChild(paraSemesterMarkDetail);
  divMarkDetail.appendChild(divSubjectMarkContainer);
  divMarkDetail.appendChild(EditButton);
  studentMarkDetail.appendChild(divMarkDetail);
}

// Function for Pop After Edit Button Click of Student Mark
function placingValueInPopUp(parentPlacingDiv) {
  displayUserName.innerHTML = parentPlacingDiv.children[0].innerText.split(" ")[3] + " " + parentPlacingDiv.children[0].innerText.split(" ")[4];
  displayUserSemester.value = parentPlacingDiv.children[1].innerText.split(" ")[2];
  let selectedDiv = parentPlacingDiv.children[2].children;
  for (i = 0; i < selectedDiv.length; i++) {    
    dynamicDivFormation2(selectedDiv);
  }
}
// Edit Mark Div Formation
function dynamicDivFormation2(selectedDiv) {
  let dynamicallyCreatedDiv = document.createElement("div");
  dynamicallyCreatedDiv.classList.add("displayDynamic");
  let dynamicallyCreatedSelect = document.createElement("select");
  dynamicallyCreatedSelect.classList.add("displaySubject");
  fillSubjects(dynamicallyCreatedSelect);
  dynamicallyCreatedOption0 = document.createElement("option");
  dynamicallyCreatedOption0.textContent = selectedDiv[i].children[0].value;
  dynamicallyCreatedOption0.value = selectedDiv[i].children[0].value;
  dynamicallyCreatedOption0.setAttribute("selected", "selected");
  let dynamicallyCreatedInput = document.createElement("input");
  dynamicallyCreatedInput.classList.add("displaySubjectMarks");
  dynamicallyCreatedInput.setAttribute("placeholder", "Marks");
  dynamicallyCreatedInput.value = selectedDiv[i].children[1].value;
  let dynamicallyCreatedAddOn = document.createElement("button");
  dynamicallyCreatedAddOn.classList.add("btn", "btn-sm", "btn-primary");
  dynamicallyCreatedAddOn.innerHTML = "+";
  dynamicallyCreatedAddOn.addEventListener("click", function () {
    let parentDiv = dynamicallyCreatedAddOn.parentNode;
    let parentMainDiv = parentDiv.parentNode;
    if (parentMainDiv.children.length === 10) {
      dynamicallyCreatedAddOn.disabled = true;
    }
    else {
      dynamicDivFormation(selectedDiv);
      dynamicallyCreatedAddOn.disabled = false;
    }
  });
  let dynamicallyCreatedRowDelete = document.createElement("button");
  dynamicallyCreatedRowDelete.classList.add("btn", "btn-sm", "btn-primary");
  dynamicallyCreatedRowDelete.innerHTML = "-";
  dynamicallyCreatedRowDelete.addEventListener("click", function () {
    let parentDiv = dynamicallyCreatedRowDelete.parentNode;
    parentDiv.parentNode.removeChild(parentDiv);
  });
  dynamicallyCreatedSelect.appendChild(dynamicallyCreatedOption0);
  dynamicallyCreatedDiv.appendChild(dynamicallyCreatedSelect);
  dynamicallyCreatedDiv.appendChild(dynamicallyCreatedInput);
  dynamicallyCreatedDiv.appendChild(dynamicallyCreatedAddOn);
  dynamicallyCreatedDiv.appendChild(dynamicallyCreatedRowDelete);
  displayMainDiv.appendChild(dynamicallyCreatedDiv);
}
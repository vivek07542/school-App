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
var closeDynamic = document.getElementById("closeDynamic");

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
// Button Submit Function for Table Formation
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
// validation Function for Table 
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
  if (txtUserMobileNo.value.length < 10) {
    txtUserMobileNo.classList.remove("displayBoxCorrect");
    txtUserMobileNo.classList.add("displayBoxWrong");
    let errorDiv1 = txtUserMobileNo.nextElementSibling;
    let errorDiv2 = txtUserMobileNo.nextElementSibling.nextElementSibling;
    errorDiv2.classList.add("invalidDisplay1");
    errorDiv1.classList.remove("invalidDisplay");
    errorDiv1.classList.add("displayIfWrong");
    isAllValidationPassed = false;
  }
  else {
    txtUserMobileNo.classList.remove("displayBoxWrong");
    txtUserMobileNo.classList.add("displayBoxCorrect");
    let error = txtUserMobileNo.nextElementSibling;
    error.classList.remove("displayIfWrong");
    error.classList.add("invalidDisplay");
    // error.classList.add("invalidDisplay1");
  }
  if (txtUserMobileNo.value.length > 10) {
    txtUserMobileNo.classList.remove("displayBoxCorrect");
    txtUserMobileNo.classList.add("displayBoxWrong");
    let errorDiv1 = txtUserMobileNo.nextElementSibling;
    let errorDiv2 = txtUserMobileNo.nextElementSibling.nextElementSibling;
    errorDiv1.classList.add("invalidDisplay");
    errorDiv2.classList.remove("invalidDisplay1");
    errorDiv2.classList.add("displayIfWrong");
    isAllValidationPassed = false;
  }
  else {
    txtUserMobileNo.classList.remove("displayBoxWrong");
    txtUserMobileNo.classList.add("displayBoxCorrect");
    let error = txtUserMobileNo.nextElementSibling.nextElementSibling;
    error.classList.remove("displayIfWrong");
    // error.classList.add("invalidDisplay");
    error.classList.add("invalidDisplay1");
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
    // chkFormData.classList.remove("displayBoxCorrect");
    // chkFormData.classList.add("displayBoxWrong");
    let errorDiv = chkFormData.nextElementSibling.nextElementSibling;
    errorDiv.classList.remove("invalidDisplay");
    errorDiv.classList.add("displayIfWrong");
    isAllValidationPassed = false;
  }
  else {
    let error = chkFormData.nextElementSibling.nextElementSibling;
    error.classList.remove("displayIfWrong");
    error.classList.add("invalidDisplay");
  }
  return isAllValidationPassed;
}
// Dyanamically Created Table on parent Screen Summary Sheet
function dynamicElementFormation() {
  let tblTr = document.createElement("tr");
  tblTr.className = "tblTr";
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
  let tblTdAction = document.createElement("td");
  let tblTdEdit = document.createElement("button");
  tblTdEdit.innerHTML = "Edit";
  tblTdEdit.classList.add("btn", "btn-sm", "btn-primary")
  tblTdEdit.addEventListener("click", function () {
    EditClick(tblTdEdit);
  });
  let tblTdDelete = document.createElement("button");
  tblTdDelete.innerHTML = "Delete";
  tblTdDelete.classList.add("btn", "btn-sm", "btn-primary")
  tblTdDelete.addEventListener("click", function () {
    deleteButton(tblTdDelete);
  });
  let tblTdMarkup = document.createElement("button");
  tblTdMarkup.innerHTML = "Add Mark";
  tblTdMarkup.classList.add("btn", "btn-sm", "btn-primary", "markButton");
  tblTdMarkup.addEventListener("click", function () {
    markContainer.style.display = "flex";
    popUp(tblTdMarkup);
    dynamicDivFormation();
    let parentElement = displayMainDiv.children[0].children[3];
    parentElement.disabled = true;
    tblTdMarkup.disabled = true;
  });
  // tblTr.appendChild(tblTdUniqueId);
  tblTr.appendChild(tblTdUserName);
  tblTr.appendChild(tblTdRdbGender);
  tblTr.appendChild(tblTdAddress);
  tblTr.appendChild(tblTdCountry);
  tblTr.appendChild(tblTdState);
  tblTr.appendChild(tblTdCity);
  tblTr.appendChild(tblTdMobile);
  tblTr.appendChild(tblTdEmail);
  tblTr.appendChild(tblTdAction);
  tblTdAction.appendChild(tblTdEdit);
  tblTdAction.appendChild(tblTdDelete);
  tblTdAction.appendChild(tblTdMarkup);
  tblData.appendChild(tblTr);
}
// First Edit Click While Table Formation 
function EditClick(tblTdEdit) {
  let parentTr = tblTdEdit.parentNode.parentNode;
  parentTr.style.backgroundColor = "pink";
  // Name Edit
  userFirstName.value = parentTr.children[0].innerText.split(" ")[0];
  userLastName.value = parentTr.children[0].innerText.split(" ")[1];
  // Gender Edit
  if (rdbFemaleGender.value === parentTr.children[1].innerText) {
    rdbFemaleGender.checked = true;
  } else {
    rdbMaleGender.checked = true;
  };
  // Address Edit        
  txtUserAddress.value = parentTr.children[2].innerText;
  // Country Edit
  countySel.value = parentTr.children[3].innerText;
  // State Edit 
  stateSel.value = parentTr.children[4].innerText;
  // City Sel 
  citySel.value = parentTr.children[5].innerText;
  // Mobile Edit
  txtUserMobileNo.value = parentTr.children[6].innerText;
  // Email Edit
  txtUserEmail.value = parentTr.children[7].innerText;
  // parentTr.parentNode.removeChild(parentTr);
}
// delete function For Table 
function deleteButton(tblTdDelete) {
  if (confirm("Do you want to delete the details?")) {
    let parentTr = tblTdDelete.parentNode.parentNode;
    parentTr.parentNode.removeChild(parentTr);
  }
  if (isDivFormation === true) {
    let parentTr = tblTdDelete.parentNode.parentNode;
    let deleteDivFormation = studentMarkDetail.getElementsByTagName("div");
    for (i = 0; i < deleteDivFormation.length; i++) {
      if (deleteDivFormation[i].children[0].innerText === parentTr.children[0].innerText) {
        selectedDivRowDelete = deleteDivFormation[i];
        break;
      }
    }
    selectedDivRowDelete.parentNode.removeChild(selectedDivRowDelete);
    selectedDivRowDelete.innerHTML = "";
  };
}
// Extracting & Placing Value to Old Place fot Detail To Table Back at same position.
function oldPositionPlacing(selectedTr) {
  let selectedTds = selectedTr.getElementsByTagName("td");
  selectedTds[0].innerHTML = userFirstName.value + " " + userLastName.value;
  for (i = 0; i < userGender.length; i++) {
    if (userGender[i].checked) {
      selectedTds[1].textContent = userGender[i].value;
    }
  }
  selectedTds[2].innerHTML = txtUserAddress.value;
  selectedTds[3].innerHTML = countySel.value;
  selectedTds[4].innerHTML = stateSel.value;
  selectedTds[5].innerHTML = citySel.value;
  selectedTds[6].innerHTML = txtUserMobileNo.value;
  selectedTds[7].innerHTML = txtUserEmail.value;
  selectedTr.removeAttribute("style");
}
// Reseting the Value After Submit Button Clicked Table And Input Summary
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
// Function PopUp Children Screen on "Add Mark Click"
function popUp(tblTdMarkup) {
  let parentTr = tblTdMarkup.parentNode.parentNode;
  let displayUserName = document.getElementById("displayUserName");
  displayUserName.innerHTML = parentTr.children[0].innerText;
};
// close Function of Child Element over PopUp 
closeDynamic.addEventListener("click", function () {
  disableMarkAdd(closeDynamic)
  selectedDelete.children[8].children[2].disabled = false;
  markContainer.style.display = "none";
  let parentDiv = submitButton.parentNode;
  resetSubmit(markContainer, parentDiv);
});
// MarkAdd Disable Function 
function disableMarkAdd(closeDynamic) {
  let tblTdRow = tblData.children;
  for (i = 0; i < tblTdRow.length; i++) {
    let displayName = closeDynamic.nextElementSibling;
    if (tblTdRow[i].children[0].innerText === displayName.innerText) {
      selectedDelete = tblTdRow[i];
      break;
    }
  }
}
// Add mark Pop up Div formation on click with Add Mark 
function dynamicDivFormation(editedEvent, parentPlacingDiv) {
  if (editedEvent === true) {     
    displayUserName.innerHTML = parentPlacingDiv.children[0].innerText;
    displayUserSemester.value = parentPlacingDiv.children[1].innerText;
    let selectedDiv = parentPlacingDiv.children[2].children;
    for (i = 0; i < selectedDiv.length; i++) {
      let dynamicallyCreatedDiv = document.createElement("div");
      dynamicallyCreatedDiv.classList.add("displayDynamic");
      let dynamicallyCreatedSelect = document.createElement("select");
      dynamicallyCreatedSelect.classList.add("displaySubject");
      fillSubjects(dynamicallyCreatedSelect, selectedDiv[i].children[0].innerText);
      let dynamicallyCreatedInput = document.createElement("input");
      dynamicallyCreatedInput.classList.add("displaySubjectMarks");
      dynamicallyCreatedInput.setAttribute("placeholder", "Marks");
      dynamicallyCreatedInput.type = "number";
      dynamicallyCreatedInput.value = selectedDiv[i].children[1].innerText;
      let dynamicallyCreatedAddOn = document.createElement("button");
      dynamicallyCreatedAddOn.classList.add("btn", "btn-sm", "btn-primary");
      dynamicallyCreatedAddOn.innerHTML = "+";
      dynamicallyCreatedAddOn.addEventListener("click", function () {
        let parentDiv = dynamicallyCreatedAddOn.parentNode;
        let parentMainDiv = parentDiv.parentNode;
        if (parentMainDiv.children.length === 9) {
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
  }
  else {
    addMarkClick();
}
function addMarkClick(){
  let dynamicallyCreatedDiv = document.createElement("div");
    dynamicallyCreatedDiv.classList.add("displayDynamic");
    let dynamicallyCreatedSelect = document.createElement("select");
    dynamicallyCreatedSelect.classList.add("displaySubject");
    fillSubjects(dynamicallyCreatedSelect, "");
    let dynamicallyCreatedInput = document.createElement("input");
    dynamicallyCreatedInput.classList.add("displaySubjectMarks");
    dynamicallyCreatedInput.setAttribute("placeholder", "Marks");
    dynamicallyCreatedInput.type = "number";
    let dynamicallyCreatedAddOn = document.createElement("button");
    dynamicallyCreatedAddOn.classList.add("btn", "btn-sm", "btn-primary", "add");
    dynamicallyCreatedAddOn.innerHTML = "+";
    dynamicallyCreatedAddOn.addEventListener("click", function () {
      let parentDiv = dynamicallyCreatedAddOn.parentNode;
      let parentMainDiv = parentDiv.parentNode;
      if (parentMainDiv.children.length === 9) {
        dynamicallyCreatedAddOn.disabled = true;
      }
      else {
        dynamicDivFormation();
        dynamicallyCreatedAddOn.disabled = false;
      }
    });
    let dynamicallyCreatedRowDelete = document.createElement("button");
    dynamicallyCreatedRowDelete.classList.add("btn", "btn-sm", "btn-primary","rowDelte");
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
  let selectedTrDiv;
  for (let i = 0; i < studentMarkDetail.children.length; i++) {
    if (studentMarkDetail.children[i].style.backgroundColor === "pink") {
      selectedTrDiv = studentMarkDetail.children[i];
      isCreatedDiv = false;
      break;
    }
  }
  if (validateDiv()) {
    if (isCreatedDiv) {
      dynamicMark();
      isDivFormation = true;
    }
    else {
      let selDiv = selectedTrDiv.children;
      let divSubjectMarkContainer = document.createElement("div");
      let studentMarkObject = {};
      studentMarkObject = editValue();
      selDiv[0].textContent = studentMarkObject.studentName;/*Now giving values from Object to the Edit Button Values*/
      selDiv[1].innerHTML = studentMarkObject.studentSemester;
      selectedTrDiv.removeChild(selDiv[2]);
      // let selectedDiv = parentDiv.children[3].children;
      loopSelected(studentMarkObject.subjectMarks, divSubjectMarkContainer); {
        selectedTrDiv.insertBefore(divSubjectMarkContainer, selectedTrDiv.lastChild);
      }
      selectedTrDiv.style.backgroundColor = "rgb(190,177,250)";
    }
    disableMarkAdd(closeDynamic);
    document.getElementsByClassName("markButton").disabled = true;
    let parentDiv = submitButton.parentNode;
    resetSubmit(markContainer, parentDiv);
  }
});
// Select Function for Dynamic Create 
function fillSubjects(dynamicallyCreatedSelect, selectValue) {
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
    else if (optn === selectValue) {
      el.setAttribute("selected", "selected");
      // el.disabled = true;
      el.value = selectValue;
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
  parentDiv.children[2].style.border = "1px solid black";
  markContainer.style.display = "none";
  let list = parentDiv.children[3];
  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild);
  }
}
// Validation Function For popUp 
function validateDiv() {
  let isValidateDiv = true;
  if (displayUserSemester.value === "") {
    displayUserSemester.style.border = "2px solid red";
    isValidateDiv = false;
  }
  else {
    displayUserSemester.style.border = "2px solid green";
  }
  let selectedDiv = displayMainDiv.children;
  for (i = 0; i < selectedDiv.length; i++) {
    for (j = 0; j < selectedDiv[i].children.length - 2; j++) {
      if (selectedDiv[i].children[j].value === "") {
        selectedDiv[i].children[j].style.border = "2px solid red";
        isValidateDiv = false;
      }
      else {
        selectedDiv[i].children[j].style.border = "2px solid green";
      }
    }
  }
  return isValidateDiv;
}
// Student Dynamic Created Detail by clicking Submit button on popUp 
function dynamicMark() {
  let divMarkDetail = document.createElement("div");
  let paraMarkDetail = document.createElement("p");
  let paraSemesterMarkDetail = document.createElement("p");
  let divSubjectMarkContainer = document.createElement("div");
  let EditButton = document.createElement("button");
  EditButton.innerText = "Edit";
  EditButton.classList.add("btn", "btn-sm", "btn-primary", "my-2");
  EditButton.addEventListener("click", function () {
    markContainer.style.display = "flex";
    let parentPlacingDiv = EditButton.parentNode;
    parentPlacingDiv.style.backgroundColor = "pink";
    dynamicDivFormation(true, parentPlacingDiv);
    let parentElement = displayMainDiv.children[0].children[3];
    parentElement.disabled = true;
  });
  let studentMarkObject = {};
  studentMarkObject = editValue();
  paraMarkDetail.innerHTML = studentMarkObject.studentName;/*Now giving values from Object to the Edit Button Values*/
  paraSemesterMarkDetail.innerHTML = studentMarkObject.studentSemester;/*Now giving values from Object to the Edit Button Values*/
  loopSelected(studentMarkObject.subjectMarks, divSubjectMarkContainer);
  divMarkDetail.appendChild(paraMarkDetail);
  divMarkDetail.appendChild(paraSemesterMarkDetail);
  divMarkDetail.appendChild(divSubjectMarkContainer);
  divMarkDetail.appendChild(EditButton);
  studentMarkDetail.appendChild(divMarkDetail);
}
// Function for Pop After Edit Button Click of Student Mark// 
function loopSelected(marks, divSubjectMarkContainer) {
  marks.forEach(function (objMark, index) {
    let subjectMarkDiv = document.createElement("div");
    let subjectMarkDetail = document.createElement("span");
    let paraSubjectMarkDetail = document.createElement("span");
    subjectMarkDetail.innerText = objMark.subject;
    paraSubjectMarkDetail.innerText = objMark.mark;
    subjectMarkDiv.appendChild(subjectMarkDetail);
    subjectMarkDiv.appendChild(paraSubjectMarkDetail);
    divSubjectMarkContainer.appendChild(subjectMarkDiv);
  });
}
function editValue() {
  let studentMarkObject = {}; /*We Created An Object*/
  studentMarkObject.studentName = displayUserName.innerText;/*First We append Student Name Value*/
  studentMarkObject.studentSemester = displayUserSemester.value;/*second We append Student Semester Value*/
  studentMarkObject.subjectMarks = [];/*Third We append an Array values of Student Subject & Marks */
  let studentMarkSummary = document.getElementById("displayMainDiv").querySelectorAll(".displayDynamic");/*Extracting all Div Which having values of Subject & Mark*/
  let markArray = Array.from(studentMarkSummary);/*Converting the elements to Form Array*/
  markArray.forEach(function (mark, index) {/*Looping to Each value of Array then*/
    let selectValue = mark.querySelector(".displaySubject").value;/*Giving Value of Subject from input tag*/
    let markInputValue = mark.querySelector(".displaySubjectMarks").value;/*Giving Value of Mark from input tag*/
    let studentMark = {};/*Again creating an Object again with inner values */
    studentMark.subject = selectValue;/*Giving Value of Subject and append in student object*/
    studentMark.mark = markInputValue;/*Giving Value of Mark and append in student object*/
    studentMarkObject.subjectMarks.push(studentMark);/*Pushing this object to array*/
  });
  return studentMarkObject;
}
}
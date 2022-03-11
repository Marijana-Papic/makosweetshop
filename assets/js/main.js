// //HOME BEST SELLERS
let url = window.location.pathname;

// if(url == '/contact.html') torte()  




if(url == "/index.html") {
var slideIndex = 1;

showDivs(slideIndex);

function plusDivs(n) {
  slideIndex += n
  showDivs(slideIndex)
}

function showDivs(n) {
  var i;
  var x = document.querySelectorAll(".mySlides");
  if(n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex-1].style.display = "block";
}
}

if(url == '/contact.html') formValidation() 

function formValidation(){
  // form validation

var imePrezime = document.getElementById("imePrezime");
var email = document.getElementById("email");
var number = document.getElementById("number");
var message = document.getElementById("message");

var reImePrezime = /^[A-ZŠĐČĆŽ][a-zšđčćž]{2,15}(\s[A-ZŠĐČĆŽ][a-zšđčćž]{2,20})+$/;
var reEmail = /^[\w-_\.]+@([\w-_]{2,}\.)+[a-z]{2,}$/;
var reNumber =/^06[0-689][0-9]{6,7}$/;  
var reMessage = /.{4,200}/;  

var noErrors;


imePrezime.addEventListener("blur", checkName);
function checkName() {
  var check = reImePrezime.test(imePrezime.value);
  var errorName = document.getElementById("error-name");
  if(check) {
    errorName.innerHTML="Name is valid!";
    errorName.style.color="green";
 } 
  else {
  noErrors = false;
  errorName.innerHTML="Name is not valid!";
  errorName.style.color="red";
 }
}

email.addEventListener("blur", checkEmail);
function checkEmail() {
 var check = reEmail.test(email.value);
 var errorEmail =  document.getElementById("error-email");
 if(check) {
  errorEmail.innerHTML="Email is valid!";
  errorEmail.style.color="green";
  
 } 
 else {
 noErrors = false;
  errorEmail.innerHTML="Email is not valid!";
  errorEmail.style.color="Red";
 }
}

number.addEventListener("blur", checkNumber);
function checkNumber(){
    var check = reNumber.test(number.value);
    var errorNumber = document.getElementById("error-number");
    if(check) {
        errorNumber.innerHTML="Number is valid!";
        errorNumber.style.color="green";
       } 
       else {
       noErrors = false;
       errorNumber.innerHTML="Number is not valid!";
       errorNumber.style.color="Red";
       }
}

message.addEventListener("blur", checkMsg);
function checkMsg() {
  var errorMsg =  document.getElementById("error-message");
 if (message.value == "") {
  errorMsg.textContent = "Message can`t be empty";
  errorMsg.style.color="red";
}
  else {
  errorMsg.textContent = "Message is valid";
  errorMsg.style.color="green";
 }

}
 var btnSubmitMessage = document.getElementById("btnSubmitMessage");

  btnSubmitMessage.addEventListener("click", function() {
  noErrors = true;
  checkName();
  checkEmail();
  checkNumber();
  checkMsg();
  if(noErrors) {
  imePrezime.value = "";
  number.value = "";
  email.value = "";
  message.value = "";
  errorName.innerHTML="";
  errorEmail.innerHTML='';
  errorNumber.innerHTML='';
  errorMsg.innerHTML='';
  
}
});
var select = document.getElementById("subject");
var error_op = document.getElementById("modal-error-op");
select.addEventListener("click",checkOption);

function checkOption(){
        if (select.value == "subject") {
            error_op.innerHTML = "Please select a subject"
            error_op.style.color = "red"
        }
        else{
          error_op.innerHTML = "Subject is valid."
          error_op.style.color = "green"
        }
  }

}


// to top button

window.onscroll = function () {
  scrollFunction()
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("movetop").style.display = "block";
  } else {
    document.getElementById("movetop").style.display = "none";
  }
}
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// //preloader

$(window).ready(() => {
  setTimeout(() => {
      $('.loading').animate({
          opacity: 0
      }, 500)
  }, 2000)

  setTimeout(() => {
      $('.loading').remove()
  }, 3000)
})



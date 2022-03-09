// header text slider
var $slide = $('.slide'),
    $slideGroup = $('.slide-group'),
    $bullet = $('.bullet');

var slidesTotal = ($slide.length - 1),
    current = 0,
    isAutoSliding = true;

$bullet.first().addClass('current');

var clickSlide = function() {
  //stop auto sliding
  window.clearInterval(autoSlide);
  isAutoSliding = false;

  var slideIndex = $bullet.index($(this));

  updateIndex(slideIndex);
};

var updateIndex = function(currentSlide) {
  if(isAutoSliding) {
    if(current === slidesTotal) {
      current = 0;
    } else {
      current++;
    }
  } else {
      current = currentSlide;
  }

  $bullet.removeClass('current');
  $bullet.eq(current).addClass('current');

  transition(current);
};

var transition = function(slidePosition) {
    $slideGroup.animate({
      'top': '-' + slidePosition + '00%'
    });
};

$bullet.on( 'click', clickSlide);

var autoSlide = window.setInterval(updateIndex, 2000);

//HOME BEST SELLERS

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if(n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex-1].style.display = "block";
}

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



//TESTEMONIAL

jQuery(document).ready(function($) {
  "use strict";
  //  TESTIMONIALS CAROUSEL HOOK
  $('#customers-testimonials').owlCarousel({
      loop: true,
      center: true,
      items: 3,
      margin: 0,
      autoplay: true,
      dots:true,
      autoplayTimeout: 8500,
      smartSpeed: 450,
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 2
        },
        1170: {
          items: 3
        }
      }
  });
});




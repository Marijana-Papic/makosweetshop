//-Dohvatanje podataka
function ajaxData(file, callback){
  $.ajax({
      url: "assets/json/" + file + ".json",
      method: "get",
      dataType: "json",
      success: function(response){
          callback(response);
      },
      error: function(error){
          console.log(error);
      }
  })
}
var url = window.location.pathname;


//HOME BEST SELLERS

if(url == "/makosweetshop/" || url== "/makosweetshop/index.html") {
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

// //LocalStorage

// function setItemToLocalStorage(name,data){
//   localStorage.setItem(name, JSON.stringify(data));
// }
// function getItemFromLocalStorage(name){
//   return JSON.parse(localStorage.getItem(name))
// }


//navigacija - dinamicki ispis

const hrefLink = ["index.html", "about.html", "shop.html", "contact.html", "shoping-cart.html"];
const imeLink = ["HOME", "ABOUT", "SHOP", "CONTACT",`<i class="fas fa-shopping-cart"></i>`];
let navBar = document.querySelector(".navbar-collapse");
let navList = `<ul class="navbar-nav m-auto align-items-center">`;
    for (let i = 0; i < hrefLink.length; i++) {
        navList += `<li class="nav-item">
                      <a class="nav-link font-weight-bold" aria-current="page" href="${hrefLink[i]}">${imeLink[i]}</a>
                    </li>`;
        }   
    navList += `</ul>`;
navBar.innerHTML = navList


var footer=document.getElementById('footer');
var content = ` <div class="container-fluid bg-fw">
  <div class="row">
    <div class="col-12 col-md-4 text-center">
      <h4 class="mb-4">WORKING HOURS</h4>
      <p>Monday - Friday: 08:00 - 21:00</p>
      <p>Saturday: 8:00 - 18:00</p>
      <p>Sunday: 10:00 - 15:00</p>
    </div>
    <div class="col-12 col-md-4 text-center">
      <h4 class="mb-4">CONTACT US</h4>
      <p>
        <i class="fa fa-solid fa-map-pin px-2"></i>
        Zdravka Celara 16
      </p>
      <p>
        <i class="fa fa-solid fa-phone px-2"></i>
        0123456789
      </p>
      <p>
        <i class="fa fa-solid fa-envelope px-2"></i>
        makoscakeshop@gmail.com
      </p>
    </div>
    <div class="col-12 col-md-4 text-center social">
      <h4 class="mb-4">FOLLOW US</h4>
        <a href="https://www.instagram.com/" target="_blank"><i class="fa fa-brands fa-instagram"></i></a>
        <a href="https://www.facebook.com/" target="_blank"><i class="fa fa-brands fa-facebook"></i></a>
        <a href="https://www.youtube.com/" target="_blank"><i class="fa fa-brands fa-youtube"></i></a>
        <a href="#"><i class="fa fa-solid fa-sitemap"></i></a>
        <a href="#"><i class="fa fa-solid fa-file"></i></a>
    </div>
  </div>
  </div>
  <button onclick="topFunction()" id="movetop" title="Go to top" style="display: block;">
  <span class="fa fa-solid fa-arrow-up" aria-hidden="true"></span>
  </button>
  <div class="col-md-12 text-center bg-dark">
  <p style="color: white; padding: 10px; margin: 0 !important;">Copyright &copy 2022 Marijana Papic</p>
  </div>`;
footer.innerHTML=content;

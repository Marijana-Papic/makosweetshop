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

// TESTIMONIALS

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

//preloader

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

// ispisivanje navigacije
function showNav(data){
  let html="";
  var nav = document.getElementById("navMenu");
  data.forEach(n => {
    html+=`<li class="nav-item">
            <a class="nav-link active" aria-current="page" href="${n.link}">${n.name}</a>
          </li>`;

  });
  nav.innerHTML = html;
}
ajaxData("nav",showNav);

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
        <a href="sitemap.xml"><i class="fa fa-solid fa-sitemap"></i></a>
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




// SHOP PAGE


document.addEventListener('DOMContentLoaded', () => {
  ajaxData("occasion", displayOccasion)
})

//-Ispis kategorija
function displayOccasion(data){
  let html = "";
  for(const d of data){
      html += `<li class="list-group-item">
                <input type="checkbox" value="${d.id}" class="occasion" /> ${d.occasion}
              </li>`
  }
  html += "<br/><br/>"
  $("#occasion").html(html);
  if($("#occasion").length!=0){
      $('#occasion').change(filter);
  }
  ajaxData("price", displayPrice);

  setItemLS("occasion", data);
}

function displayPrice(data){
  let html = "";
  for(const d of data){
      html += `<li class="list-group-item">
                <input type="checkbox" value="${d.price}" class="price" /> Under$${d.price}
              </li>`
  }
  html += "<br/><br/>"
  $("#price").html(html);
  if($("#price").length!=0){
      $('#price').change(filter);
  }
  ajaxData("product", function(response){
    setItemLS("allProducts", response);
    displayProduct(response);
  });
}

function displayTaste(data){
  let html = "";
  for(const d of data){
      html += `<li class="list-group-item">
                <input type="checkbox" value="${d.id}" class="taste" /> ${d.taste}
              </li>`;
  }
  html += "<br/><br/>";
  $("#taste").html(html);
  if($("#taste").length!=0){
  $('#taste').change(filter);
  }
  ajaxData("product", displayProduct);

  setItemLS("taste", data);
}
ajaxData("taste", displayTaste);

function filter(){
  ajaxData("product", displayProduct);
}

$("#sort").change(filter);

function displayProduct(data){
  data = filterTastes(data);
  data = filterOccasion(data);
  data = filterPrice(data);
  data = sort(data);
  
  let html = '';
  
      for(let d of data){
          html +=`<div class="col-lg-4 col-md-6 mb-4">
                    <div class="card">
                        <a href="#"><img class="card-img-top img-fluid" src="${d.image.src}" alt="${d.image.alt}"></a>
                      <div class="card-body h-100">
                            <h4 class="card-title">${d.title}</h4>
                            <div class="d-flex justify-content-between">
                              <div class="price">
                                <h5>$${d.price.newPrice}</h5>
                                <s>${d.price.oldPrice ? "$"+d.price.oldPrice : ""}</s>
                              </div>
                              <div class="cartDetails align-items-center">
                                <button data-id="${d.id}" class="mp-btn addToCart">Add to cart</button>
                              </div>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>`   
  }
  
  $('#products').html(html);
  $('.addToCart').click(addToCart);
}

function filterPrice(data){
  let value = 1000;
  let prices = [];
  $('.price:checked').each(function(e){
    prices.push(parseInt($(this).val()));
    for(p of prices){
      if(p < value){
        value = p;
      }
    }
  });
  if(prices.length > 0) {
      return data.filter(d => d.price.newPrice < value);
  }
  else return data;
  
}


function filterTastes(data){
  let tastes = [];
  $('.taste:checked').each(function(e){
    tastes.push(parseInt($(this).val()));
  });
  if(tastes.length > 0) {
      return data.filter(d => tastes.includes(d.taste));
  }
  else return data;
}
function filterOccasion(data){
  let occasions = [];
  $('.occasion:checked').each(function(e){
    occasions.push(parseInt($(this).val()));
  });
  if(occasions.length > 0) {
      return data.filter(d => occasions.includes(d.occasion));
  }
  else return data;
}

function sort(data){
  if($("#sort").length != 0){
    let by = document.getElementById("sort").value;
    switch(by){
      case "price-asc":{
          return data.sort((a,b) => a.price.newPrice - b.price.newPrice);
      }
      case "price-desc":{
          return data.sort((a,b) => b.price.newPrice - a.price.newPrice);
      }
      case "name-asc":{
          return data.sort(function(a,b){
              if(a.title < b.title){
                  return -1;
              }
              else if(a.title > b.title){
                  return 1;
              }
              else return 0;
          });
      }
      case "name-desc":{
          return data.sort(function(a,b){
              if(a.title > b.title){
                  return -1;
              }
              else if(a.title < b.title){
                  return 1;
              }
              else return 0;
          });
      }
      default :{
          return data;
      }
    } 
  }

}

// LOCAL STORAGE


function setItemLS(name,data){
  localStorage.setItem(name,JSON.stringify(data));
}   

function getItemLS(name){
  return JSON.parse(localStorage.getItem(name));
}


function addToCart(){
  let id = $(this).data("id");
  let products = getItemLS("cart");
  if(products){
      if(productsAlreadyInCart(products, id)){
          quantityUpdate(products, id);
       }
      else{
          addNewProduct(products, id);
          numberOfItemsInCart();
      }
  }
  else{
      addFirstProduct(id);
      numberOfItemsInCart();
  }
      alert("Your item has been added to the cart!");
}

function productsAlreadyInCart(products, id){
return products.filter(x => x.id == id).length;
}
function addFirstProduct(id){
  let products = [];
  products[0] = {
      id: id,
      quantity: 1
  }
  setItemLS("cart", products);
}
function addNewProduct(products, id){
  products.push({
      id: id,
      quantity: 1
      });

  setItemLS("cart", products);
}
function quantityUpdate(products, id){
  products.forEach(x => {
      if(x.id == id){
      x.quantity++;
      } 
      });
  setItemLS("cart", products);
  console.log(id)

}

function numberOfItemsInCart() {
  
  let products = getItemLS("cart");
  let cartNumberSpan = $('.number');
  let cartNumberText = "";
  if(products){
  let productsNumber = products.length;
  if(productsNumber == 0){
      productsNumber = "";
  }
  cartNumberText = productsNumber;
  }
  cartNumberSpan.html(cartNumberText);
}
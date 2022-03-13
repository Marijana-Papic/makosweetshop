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
  
// LOCAL STORAGE


function setItemLS(name,data){
    localStorage.setItem(name,JSON.stringify(data));
  }   
  
  function getItemLS(name){
    return JSON.parse(localStorage.getItem(name));
  }



  let products = getItemLS("cart");
    if(products == null){
        showEmptyCart();
    }
    else{
        showCart();
        quantityChange()
    }

    numberOfItemsInCart();
    function showEmptyCart(){
        let html =
            `<div class="row">
            <div class="col-lg-7 col-md-8 col-12 text-center mx-auto my-5">
            <div>
            <h3 class="text-danger mb-4">Cart is empty.</h3>
            <a href="shop.html" class="mp-btn">GO SHOPPING</a>
            </div>
            </div>
            </div>`;
        $("#shopping-cart").html(html);
    }


    function showCart(){
      let allProducts = getItemLS("allProducts");
      let productsInCart = getItemLS("cart");

      let productsToShow = allProducts.filter(x => {
          for(let wCart of productsInCart){
              if(x.id == wCart.id){
                  x.quantity = wCart.quantity;
                  return true;
              }
              }
              return false;
          })
        loadCart(productsToShow);
  }
  function loadCart(products){
    let html=`
    <div class="table-responsive shopping-cart">
    <table class="table">
        <thead>
            <tr>
                <th>PRODUCT</th>
                <th class="text-center">QUANTITY</th>
                <th class="text-center">PRICE</th>
                <th class="text-center">TOTAL</th>
                <th class="text-center"><a class="mp-btn p-2" href="#" id="clear-cart">Clear Cart</a></th>
            </tr>
        </thead>
        <tbody>`;
        for(let p of products){
            html+= generateTr(p);
        }
        html += `</tbody>
        </table>
        </div>`;
           
       
let html2 = `<div class="shopping-cart-footer">
    <div class="column text-lg">TOTAL PRICE: <span class="text-medium" id="total-sum">${sumPrices(products)}</span></div>
</div>
<div class="shopping-cart-footer">
    <div class="column"><a class="mp-btn" href="shop.html">BACK TO SHOPPING</a></div>
    <div class="column"><a class="mp-btn" id="finish" href="#" data-toast="" data-toast-type="success" data-toast-position="topRight" data-toast-icon="icon-circle-check" data-toast-title="Your cart" data-toast-message="is updated successfully!">ORDER</a></div>
</div>` ;

$("#shopping-cart").html(html+html2);
$("#finish").click(purchase);
    function generateTr(p){
        return `<tr>
        <td class="w-50">
            <div class="product-item d-flex">
                <a class="product-thumb" style="width:30%;" href="#"><img class="cart-img img-fluid w-100" src="${p.image.src}" alt="${p.image.alt}"></a>
                <div class="product-info">
                    <h4 class="product-title"></h4><span><em>${p.title}</em></span>
                </div>
            </div>
        </td>
        <td class="text-center">
        <input type="number" class="product-quantity" name="tentacles"
        min="1" max="50" value="${p.quantity}">
            </div>

        </td>
        <td class="text-center text-lg text-medium"><p class="price-per-product">$${p.price.newPrice}</p></td>
        <td class="text-center text-lg text-medium"><P class="sum-per-product">$${p.price.newPrice * p.quantity}</p></td>
        <td class="text-center"><a class="remove-from-cart" href="#" data-toggle="tooltip" title="" data-original-title="Remove item"><i class="fa fa-trash"></i></a></td>

    </tr>`;
    
   
    }
    $("#clear-cart").click(removeAll);
    
}             

function removeAll(){
    localStorage.removeItem("cart");
    showEmptyCart();
    numberOfItemsInCart();
}
  
// function removeFromCart(id) {
//     let products = getItemFromLS("cart");
//     let filteredProducts = products.filter(x => x.id != id);
//     setItemToLS("cart", filteredProducts);
//     showCart();

// }
function sumPrices(products){
    let sum = 0;
    products.forEach(s =>{
    sum += s.price.newPrice * s.quantity;
    })
    return "$" + sum;
}

function update(){
    let productSum = document.querySelectorAll(".sum-per-product");
    let price = document.querySelectorAll(".price-per-product");
    let quantity = document.querySelectorAll(".product-quantity");
    let totalSum = document.querySelector("#total-sum");
    let sumPerProduct = 0;
    for(let i=0; i < price.length; i++){
        let priceFormat = price[i].innerHTML.replace("$", "");
        productSum[i].innerHTML = (priceFormat)*(quantity[i].value) + "$";
        sumPerProduct += (priceFormat) * (quantity[i].value);
    }
    totalSum.innerHTML = "$" + sumPerProduct;
}

function quantityChange(){
    $(".product-quantity").change(function(){
        if(this.value > 0){
            update();
        }
        else{
            this.value = 1;
        }
    });
}

function purchase(){
    alert("Your purchase is successful." + "\n" + "Order number: " +
    Math.floor(Math.random() * 100000) + 1);
    removeAll();
}

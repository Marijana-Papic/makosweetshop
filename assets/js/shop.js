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

function setItemLS(string, data){
  localStorage.setItem(string, JSON.stringify(data));
}

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
  ajaxData("taste", displayTaste);

  setItemLS("price", data);
}

function displayTaste(data){
  let html = "";
  for(const d of data){
      html += `<li class="list-group-item">
                <input type="checkbox" value="${d.id}" class="taste" /> ${d.taste}
              </li>`
  }
  html += "<br/><br/>"
  $("#taste").html(html);
  if($("#taste").length!=0){
      $('#taste').change(filter);
      $('#sort').change(filter);
  }
  ajaxData("product", displayProduct);

  setItemLS("taste", data);
}

function filter(){
  ajaxData("product", displayProduct);
}

document.querySelector('#sort').addEventListener("change", filter);

function displayProduct(data){
  data = filterTastes(data);
  data = filterOccasion(data);
  data = filterPrice(data);
  data = sort(data);
  
  let html = '';
  if(data.length>0){
      for(let d of data){
          html +=`<div class="col-lg-4 col-md-6 mb-4" onclick="otvori()">
                    <div class="card">
                        <a href="#"><img class="card-img-top img-fluid" src="${d.image.src}" alt="${d.image.alt}"></a>
                      <div class="card-body h-100">
                            <h4 class="card-title">${d.title}</h4>
                            <div class="d-flex justify-content-between">
                              <div class="price">
                                <h5>$${d.price.newPrice}</h5>
                                <s>${d.price.oldPrice ? "$"+d.price.oldPrice : ""}</s>
                              </div>
                              <a href="#" class="mp-btn">Add to cart</a>
                            </div
                        </div>
                      </div>
                    </div>
                  </div>`
      }
  }
  else{
      html += `<div class="text-danger h3 bg rounded p-3 mt-5">Sorry, there are currently no products with selected features ...</div>`
  }
  $('#products').html(html);
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
  console.log("ušo");
  if($("#sort").length != 0){
    console.log("ušo");
    let by = document.getElementById("sort").value;
    console.log(by);
    switch(by){
      case "price-asc":{
          return data.sort((a,b) => a.price.newPrice - b.price.newPrice);
      }
      case "price-desc":{
          return data.sort((a,b) => b.price.newPrice - a.price.newPrice);
      }
      case "name-asc":{
        console.log("ušo");
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
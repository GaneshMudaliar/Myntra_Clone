const Url ='https://fakestoreapi.com/products';


async function fetchProducts() {
  let res = await fetch(`${Url}`);
  let data =  await res.json();
  // console.log(data)
  bindData(data)
}


function bindData(data) {

// banner img
 let bannerImg =document.querySelector(".banner-img");
 bannerImg.innerHTML= `
         <img src="${data[5].image}" alt="">
         
     
 `;



  let products = document.querySelector(".products");
  products.innerHTML="";

  let innerCard = "";
  
  data.forEach(item => {
   if(!item.image) {
    return;
   }

  

    innerCard += `
    <div class="card">
  <img src="${item.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${item.title}</h5>
        <h5 class="card-prize"><i class="fa-solid fa-indian-rupee-sign"></i> ${item.price} (Upto 20%off)</h5>
        <p>${item.rating.rate}</p>



    <button class="card-cart" onclick=AddtoCart(${item.id}) >Add To Cart</button>  
    </div>
</div>
    `;

    products.innerHTML = innerCard;

  });

}


fetchProducts();


//  cart

let cartItems = [];



function AddtoCart(itemId) {
  cartItems.push(itemId);
  localStorage.setItem('cartItems',JSON.stringify(cartItems));
 
  displayCartIcon();


}
 

let cartItemsStr = localStorage.getItem('cartItems');
// let cartItemsStr = localStorage.clear();

// cartItems = cartItemsStr ? JSON.parse(cartItemsStr) : [];
if (cartItemsStr) {
    cartItems = JSON.parse(cartItemsStr); 
} 

 function displayCartIcon() {
  let cartItemCount  = document.querySelector('.cart-item-count');
  if (cartItems.length > 0) {
    cartItemCount.style.visibility = 'visible';
  cartItemCount.innerHTML = cartItems.length;
      } else {
    cartItemCount.style.visibility='hidden';
  }
}

displayCartIcon();

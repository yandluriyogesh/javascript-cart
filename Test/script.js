document.addEventListener('DOMContentLoaded',()=>{
    const addtocartBtn=document.querySelectorAll('.add-to-cart-btn')
    // console.log(addtocartBtn)
    // accessing all btns for adding the functionality for all addtocart buttons
    addtocartBtn.forEach((ele)=>{
    //    console.log(ele)
    //    adding functionality
    ele.addEventListener('click',(e)=>{
        console.log(e.target)
       
        // accessing the product information through the navigation
        const productInfo=ele.parentElement.parentElement
        // console.log(productInfo)
        // accessing the information like  title price img
        const productTitle=productInfo.querySelector('.product-title').innerText
        const productPrice=productInfo.querySelector('.product-price').innerText
        const productimage=productInfo.querySelector('.product-img').src
        // console.log(productTitle)
        console.log(productPrice)
        console.log(productimage)
        // creating a single objects for selected items to store in cart
        const SelectedProducts={
            name:productTitle,
            price:productPrice,
            ImgUrl:productimage
        }
        console.log(SelectedProducts)
    //    passing the selected products into the addtocart function as value
    AddtoCart(SelectedProducts)

    })
    })
}) 

// to store the selected items 
let CartItems=[]

// function to add items into carts
function AddtoCart(products){
    // debugger;
 console.log(products)
//  checking for existing items in the cart
const ExistingItems=CartItems.find((item)=>item.name ==  products.name)
if(ExistingItems){
    // increasing the quantity for the items that is found in the cart (only for existingitems)
    ExistingItems.quantity++
}else{
    // if items not found in cart the single item with quantity one will be pushed in cart
    CartItems.push({...products,quantity:1})

}
// calling UpdateCartUI() to print the data in ui
updatedCartUI()

}
function updatedCartUI() {
    const CartItemElem = document.querySelector(".cart_items");
    console.log(CartItemElem);
    CartItemElem.innerHTML = "";
    CartItems.forEach((item) => {
      console.log(item);
      // creating li items and appending dynamically into cart
      const CartProd=document.createElement('li')
      CartProd.innerHTML=`      <div class="product">
      <img src=${item.ImgUrl} class="product-img" />
      <div class="product-info">
        <h4 class="product-title">${item.name}</h4>
        <p class="product-price">${item.price}</p>
        <span class="Quantity">${item.quantity}</span> 

        <div class="quantity-container">
          <button class="increase-quantity">+</button>
          <span class="quantity-val">${item.quantity}</span>
          <button class="decrease-quantity">-</button>
          <button class="remove-quantity">RemoveQunatity</button>
      </div>
      </div>

    </div>`
// console.log(CartProd)
// adding the functionality for increase and decrese buttons 
const CartProductEle=CartProd.querySelector('.quantity-container') // increase /decrease
const CartProductVal=CartProd.querySelector('.Quantity') //value of no products /items (similar)
const IncreaseQuantity=CartProductEle.querySelector('.increase-quantity')
const decreaseQuantity=CartProductEle.querySelector('.decrease-quantity')
const RemoveQuantity=CartProd.querySelector('.remove-quantity') // remove button


// adding functionality to increase decrease ,remove buttons through add event listiners
IncreaseQuantity.addEventListener('click',()=>{
  HandleIncQuantity(item,CartProductVal)
})
// decrease functionality
decreaseQuantity.addEventListener('click',()=>{
  HandleDecQuantity(item,CartProductVal)
})
// increase functionality
RemoveQuantity.addEventListener('click',()=>{
  HandleRemQuantity(item)})
   // appending the cardprod(li) element to ul list
  CartItemElem.appendChild(CartProd)
  })
    CartIconTotal()

}


function HandleIncQuantity(item,CartProductVal){
    item.quantity++
    CartProductVal.innerText=item.quantity
    updatedCartUI()
    CartTotal()
  
  }
  //function to handle decrese_quantity
  function HandleDecQuantity(item,CartProductVal){
    if(item.quantity>1){
      item.quantity--
      CartProductVal.innerText=item.quantity
    }
  //  function to upadte the ui of cart
  updatedCartUI() 
  CartTotal()
  }
  //function to handle Delete_item
  function HandleRemQuantity(item){
    let index=CartItems.findIndex((prod)=>item.name == prod.name)
    if(index!=-1){
      if(CartItems[index]>1){
        CartItems[index].quantity-- // used for removing only one item at a time
      }else{
        CartItems.splice(index,1) // if only one element is found it  removes item completely
      }
    }
    updatedCartUI()
    CartIconTotal()
    CartTotal()
  }
  
//function to handle total_price of items
function CartTotal(){
    const CartTotalEle=document.querySelector('#cart-total')
   const TotalVal=CartItems.reduce((total,cur)=>total + cur.price * cur.quantity,0)
   CartTotalEle.innerText=`total:${TotalVal.toFixed(2)}`
  }
  
  // function to update the cart_icon value 
  function CartIconTotal(){
    const CartIconEle=document.querySelector('#cart-item-count')
   const TotalVal=CartItems.reduce((total,cur)=>total + cur.quantity,0)
   CartIconEle.innerText=TotalVal
  }
  
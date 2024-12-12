
let renderCartData;
let dynamic_count;

async function getdata() {
  let url = await fetch("https://fakestoreapi.com/products");
  let data = await url.json();


  data.forEach((val) => {
    let card = document.createElement("div");
    card.setAttribute("class", "card");

    let container = document.querySelector(".renderdata");
    renderCartData = document.querySelector(".renderCartData");
    dynamic_count = document.querySelector(".dynamic-count");

    let title = document.createElement("p");
    title.textContent = `${val.title.slice(0, 30)}...`;
    title.setAttribute("class", "productTitle");

    let price = document.createElement("p");
    price.textContent = `price: ₹${val.price * 80}`;

    let btn = document.createElement("button");
    btntext = document.createTextNode("Add to cart");
    btn.appendChild(btntext);

    let createImage = document.createElement("img");
    createImage.setAttribute("src", `${val.image}`);
    createImage.setAttribute("class", "myImages");

    card.appendChild(createImage);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(btn);

    container.appendChild(card);

    // Function to add to cart and update local storage
    function addTocart(img, price) {
      // Retrieve existing cart items from local storage
      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

      // Check if the item already exists in the cart
      const existingItem = cartItems.find((item) => item.image === img);

      if (existingItem) {
        // If it exists, increment the quantity
        existingItem.quantity++;
      } else {
        // If it doesn't exist, add it to the cart
        cartItems.push({ image: img, price: price, quantity: 1 });
      }

      // Update local storage
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      // Update cart display
      renderCart();
    }

    btn.addEventListener("click", () =>
      addTocart(val.image, `price: ₹${val.price * 80}`)
    );

  });

  // Function to render cart items from local storage
  function renderCart() {

    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    renderCartData.innerHTML = ""; // Clear the cart area

    cartItems.forEach((item) => {

      let cartMDiv = document.createElement("div");
      cartMDiv.setAttribute("class", "cart-styling");

      let cartImg = document.createElement("img");
      cartImg.setAttribute("src", item.image);
      cartImg.classList.add("cartimg");

      let cartPrice = document.createElement("p");
      cartPrice.textContent = item.price;

      // Add quantity display
      let cartQuantity = document.createElement("p");
      cartQuantity.textContent = `Quantity: ${item.quantity}`;

      let cartrashbtn = document.createElement("i");
      cartrashbtn.setAttribute("class", "fa-solid fa-trash");

      cartMDiv.appendChild(cartImg);
      cartMDiv.appendChild(cartPrice);
      cartMDiv.appendChild(cartQuantity);
      cartMDiv.appendChild(cartrashbtn);
      renderCartData.appendChild(cartMDiv);

      // Add event listener to trash button
      cartrashbtn.addEventListener("click", () => {
        // Remove item from cart and update local storage
        cartItems = cartItems.filter((i) => i.image !== item.image);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        renderCart(); // Update cart display
      });
      
    });

    dynamic_count.innerHTML = cartItems.length;
  }

  // Initial render of cart items on page load
  renderCart();
}

getdata();

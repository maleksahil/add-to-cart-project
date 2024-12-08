let renderData = document.querySelector(".randerData");

async function getData() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();

    console.log(data);

    data.forEach((val) => {
      let card = document.createElement("div");
      card.classList.add("card");

      const p2 = document.createElement("p");
      p2.textContent = val.category;

      const p = document.createElement("p");
      p.textContent = val.title;

       const p3 = document.createElement('p');
       p3.textContent = val.description

       const p4 = document.createElement('p');
       p4.textContent = `₹ ${val.price}`

      let img = document.createElement("img");
      img.src = val.image;

      p.style.fontSize = '2rem'

      p4.style.fontSize = '1.5rem'
      p4.style.fontWeight = '700'

      card.appendChild(img);
      card.appendChild(p2);
      card.appendChild(p);
      card.appendChild(p3)
      card.appendChild(p4)

      renderData.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Call the getData function
getData();

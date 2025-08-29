// Load products from localStorage
function loadProducts() {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  let productList = document.getElementById("product-list");
  if (productList) {
    productList.innerHTML = "";
    products.forEach(p => {
      let div = document.createElement("div");
      div.classList.add("product");
      div.innerHTML = `
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>Price: ₹${p.price}</p>
      `;
      productList.appendChild(div);
    });
  }
}

// Handle admin form
let form = document.getElementById("product-form");
if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let imageFile = document.getElementById("imageFile").files[0];

    if (!imageFile) {
      alert("Please select an image!");
      return;
    }

    let reader = new FileReader();
    reader.onload = function(event) {
      let products = JSON.parse(localStorage.getItem("products")) || [];
      products.push({ name, price, image: event.target.result }); // Base64 save
      localStorage.setItem("products", JSON.stringify(products));

      alert("Product added successfully!");
      form.reset();
    };
    reader.readAsDataURL(imageFile);
  });
}

// Run on products page
window.onload = loadProducts;
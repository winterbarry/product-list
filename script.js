let cart = [];

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        const dessertDiv = event.target.closest('.dessert'); // select parent element
        const name = button.dataset.name; // select dessert name
        const priceText = dessertDiv.querySelectorAll('p')[2].textContent; // select third child of parent element
        const price = parseFloat(priceText.replace('$', '')); // remove dollar sign

        const existingItem = cart.find(item => item.name === name); // check if item already exists in cart

        if (existingItem) {
            existingItem.amount += 1;
            existingItem.totalPrice = existingItem.amount * existingItem.price;
        } else {
            const cartItem = {
                name: name,
                price: price,
                amount: 1,
                totalPrice: price
            };
            cart.push(cartItem);
        }

        console.log(cart);
        renderToCart(); 
    });
});

function renderToCart() {
  const cartPlaceholder = document.getElementById('cart-placeholder');
  const cartHeader = document.querySelector('.cart-text h2');

  cartPlaceholder.innerHTML = '';

  if (cart.length === 0) {
    const p = document.createElement('p');
    p.id = 'placeholder-message';
    p.textContent = 'No Items Yet';
    cartPlaceholder.appendChild(p);
  } else {
    cart.forEach((item, index) => {
      const newItem = document.createElement('div');
      newItem.classList.add('newItem');

      const newItemDetails = document.createElement('div');
      newItemDetails.classList.add('newItemDetails');

      const nameDiv = document.createElement('div');
      nameDiv.classList.add('newItemName');
      nameDiv.textContent = item.name;

      const dataDiv = document.createElement('div');
      dataDiv.classList.add('newItemData');
      dataDiv.innerHTML = `
        <span>Amount: ${item.amount}</span>
        <span>Price: $${item.price.toFixed(2)}</span>
        <span>Total: $${item.totalPrice.toFixed(2)}</span>
      `;

      newItemDetails.append(nameDiv, dataDiv);

      const removeWrapper = document.createElement('div');
      removeWrapper.classList.add('newItemRemoveBtn');
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove';
      removeWrapper.appendChild(removeBtn);

      removeBtn.addEventListener('click', () => {
        if (item.amount > 1) {
          item.amount -= 1;
          item.totalPrice = item.amount * item.price;
        } else {
          cart.splice(index, 1);
        }
        renderToCart();
      });

      newItem.append(newItemDetails, removeWrapper);
      cartPlaceholder.appendChild(newItem);
    });
  }

  // update cart counter
  let totalItems = 0;
  for (const item of cart) {
    totalItems += item.amount;
  }
  cartHeader.textContent = `Your Cart (${totalItems})`;
}

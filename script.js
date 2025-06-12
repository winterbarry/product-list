let cart = [];
let cartTotal = 0;

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

  /// render placeholder
  if (cart.length === 0) {
    const p = document.createElement('p');
    p.id = 'placeholder-message';
    p.textContent = 'No Items Yet';
    cartPlaceholder.appendChild(p);
  } else {
    let totalCost = 0;
    
    // render new item details
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

      // adding the remove buttom
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

      // display item details and remove button
      newItem.append(newItemDetails, removeWrapper);
      newItem.style.marginTop = '1rem';
      cartPlaceholder.appendChild(newItem);

      // calc total of all items
      totalCost += item.totalPrice;
    });

    // set global cart total cost
    cartTotal = totalCost;

    // render total cost div
    const totalCostDiv = document.createElement('div');
    totalCostDiv.classList.add('total-cost');
    totalCostDiv.style.marginTop = '1rem';
    totalCostDiv.style.fontWeight = 'bold';
    totalCostDiv.textContent = `Order Total: $${totalCost.toFixed(2)}`;
    cartPlaceholder.appendChild(totalCostDiv);

    // render carbon netral textt
    const carbonDiv = document.createElement('div');
    carbonDiv.textContent = 'This is a carbon neutral order';
    carbonDiv.style.marginTop = '1rem';
    cartPlaceholder.appendChild(carbonDiv);

    // render confirm button
    const confirmBtnDiv = document.createElement('div');
    const confirmBtn = document.createElement('button');
    confirmBtn.textContent = 'Confirm Order'
    confirmBtnDiv.appendChild(confirmBtn);
    confirmBtnDiv.style.marginTop = '1rem';
    cartPlaceholder.appendChild(confirmBtnDiv);

    // render final order
    confirmBtn.addEventListener('click', () => {
      const confirmContainer = document.querySelector('.confirm-container');
      confirmContainer.hidden = false;

      const finalPlaceholder = document.querySelector('.final-details');
      finalPlaceholder.innerHTML = '';

      // render final items
      if (cart.length !== 0) {
        cart.forEach((item, index) => {
        const finalItem = document.createElement('div');
        finalItem.classList.add('finalItem');

        const finalItemDetails = document.createElement('div');
        finalItemDetails.classList.add('finalItemDetails');

        const finalNameDiv = document.createElement('div');
        finalNameDiv.classList.add('finalItemName');
        finalNameDiv.textContent = item.name;

        const finalDataDiv = document.createElement('div');
        finalDataDiv.classList.add('finalItemData');
        finalDataDiv.innerHTML = `
          <span>Amount: ${item.amount}</span>
          <span>Price: $${item.price.toFixed(2)}</span>
          <span>Total: $${item.totalPrice.toFixed(2)}</span>
        `;

        finalItemDetails.append(finalNameDiv, finalDataDiv);

        // display item details and remove button
        finalItem.append(finalItemDetails);
        finalItem.style.marginTop = '1rem';
        finalPlaceholder.appendChild(finalItem);
        });
      }

      // render final cost div
      const finalCostDiv = document.createElement('div');
      finalCostDiv.classList.add('total-cost');
      finalCostDiv.style.marginTop = '1rem';
      finalCostDiv.style.fontWeight = 'bold';
      finalCostDiv.textContent = `Order Total: $${cartTotal.toFixed(2)}`;
      finalPlaceholder.appendChild(finalCostDiv);

      // reset program
      const startNew = document.querySelector('.start-new');
      startNew.addEventListener('click', () => {

      })
    })
  }

  // update cart counter
  let totalItems = 0;
  for (const item of cart) {
    totalItems += item.amount;
  }
  cartHeader.textContent = `Your Cart (${totalItems})`;
}
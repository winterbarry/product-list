let cart = [];
let cartTotal = 0;

const imageMap = {
  "Waffle with Berries": "assets/images/image-waffle-desktop.jpg",
  "Vanilla Bean Crème Brûlée": "assets/images/image-creme-brulee-desktop.jpg",
  "Macaron Mix of Five": "assets/images/image-macaron-desktop.jpg",
  "Classic Tiramisu": "assets/images/image-tiramisu-desktop.jpg",
  "Pistachio Baklava": "assets/images/image-baklava-desktop.jpg",
  "Lemon Meringue Pie": "assets/images/image-meringue-desktop.jpg",
  "Red Velvet Cake": "assets/images/image-cake-desktop.jpg",
  "Salted Caramel Brownie": "assets/images/image-brownie-desktop.jpg",
  "Vanilla Panna Cotta": "assets/images/image-panna-cotta-desktop.jpg"
};


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
        <span class="cart-amount"> ${item.amount}x</span>
        <span class="cart-unit-price"> $${item.price.toFixed(2)}</span>
        <span class="cart-total-price"> $${item.totalPrice.toFixed(2)}</span>
      `;

      newItemDetails.append(nameDiv, dataDiv);

      // adding the remove buttom
      const removeWrapper = document.createElement('div');
      removeWrapper.classList.add('newItemRemoveBtn');
      const removeBtn = document.createElement('button');

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

    const labelSpan = document.createElement('span');
    labelSpan.classList.add('order-total-text');
    labelSpan.textContent = 'Order Total';

    const priceSpan = document.createElement('span');
    priceSpan.classList.add('order-total-int');
    priceSpan.textContent = `$${totalCost.toFixed(2)}`;

    totalCostDiv.append(labelSpan, priceSpan);
    cartPlaceholder.appendChild(totalCostDiv);


    // render carbon netral textt
    const carbonDiv = document.createElement('div');
    carbonDiv.classList.add('carbon-neutral');

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('carbon-image');
    const image = document.createElement('img');
    image.src = 'assets/images/icon-carbon-neutral.svg';
    image.alt = 'Carbon Neutral Icon';
    imageDiv.appendChild(image);

    const textDiv = document.createElement('div');
    textDiv.classList.add('carbon-text');
    textDiv.innerHTML = 'This is a <strong>carbon neutral</strong> delivery';

    carbonDiv.append(imageDiv, textDiv);
    cartPlaceholder.appendChild(carbonDiv);

    // render confirm button
    const confirmBtnDiv = document.createElement('div');
    confirmBtnDiv.classList.add('confirm');
    const confirmBtn = document.createElement('button');
    confirmBtn.classList.add('confirm-btn');
    confirmBtn.textContent = 'Confirm Order'
    confirmBtnDiv.appendChild(confirmBtn);
    confirmBtnDiv.style.marginTop = '1rem';
    cartPlaceholder.appendChild(confirmBtnDiv);

    // render final order
    confirmBtn.addEventListener('click', () => {
      const confirmContainer = document.querySelector('.confirm-container');
      const overlay = document.querySelector('.overlay');

      confirmContainer.hidden = false;
      overlay.hidden = false;

      const finalPlaceholder = document.querySelector('.final-details');
      finalPlaceholder.innerHTML = '';

      // render final items
      if (cart.length !== 0) {
        cart.forEach((item, index) => {
          const finalItem = document.createElement('div');
          finalItem.classList.add('final-item');

          // wrapper for image and details
          const finalItemWrapper = document.createElement('div');
          finalItemWrapper.classList.add('finalItemWrapper');

          // image wrapper
          const imageWrapper = document.createElement('div');
          imageWrapper.classList.add('finalItemImageWrapper');
          const img = document.createElement('img');
          img.src = imageMap[item.name];
          img.alt = `Image of ${item.name}`;
          img.classList.add('finalItemImage');
          imageWrapper.appendChild(img);

          // details wrapper
          const finalItemDetails = document.createElement('div');
          finalItemDetails.classList.add('finalItemDetails');

          const itemNameDiv = document.createElement('div');
          itemNameDiv.classList.add('item-name');
          itemNameDiv.textContent = item.name;

          const itemMetaDiv = document.createElement('div');
          itemMetaDiv.classList.add('item-meta');

          const amountSpan = document.createElement('span');
          amountSpan.classList.add('final-amount');
          amountSpan.textContent = `${item.amount}x`;

          const priceSpan = document.createElement('span');
          priceSpan.classList.add('final-price');
          priceSpan.textContent = `$${item.price.toFixed(2)}`;


          itemMetaDiv.append(amountSpan, priceSpan);
          finalItemDetails.append(itemNameDiv, itemMetaDiv);

          finalItemWrapper.append(imageWrapper, finalItemDetails);

          // final price on the side
          const finalPriceDiv = document.createElement('div');
          finalPriceDiv.classList.add('confirm-total-price');
          finalPriceDiv.innerHTML = `<span>$${item.totalPrice.toFixed(2)}</span>`;

          finalItem.append(finalItemWrapper, finalPriceDiv);
          finalItem.style.marginTop = '1rem';

          finalPlaceholder.appendChild(finalItem);
        });
      }

      // render final cost div
      const finalCostDiv = document.createElement('div');
      finalCostDiv.classList.add('final-cost');

      const orderTotalText = document.createElement('span');
      orderTotalText.classList.add('order-total-text');
      orderTotalText.textContent = 'Order Total';

      const orderTotalInt = document.createElement('span');
      orderTotalInt.classList.add('order-total-int');
      orderTotalInt.textContent = `$${cartTotal.toFixed(2)}`;

      finalCostDiv.append(orderTotalText, orderTotalInt);
      finalPlaceholder.appendChild(finalCostDiv);

      // reset program
      const startNew = document.querySelector('.start-new');
      startNew.addEventListener('click', () => {

        //reset cart array
        cart.length = 0;
        console.log(cart);

        // reset cart placeholder
        cartPlaceholder.innerHTML = '';
        const newParagraph = document.createElement('p');
        newParagraph.id = 'placeholder-message';
        newParagraph.textContent = 'No Items Yet';
        cartPlaceholder.appendChild(newParagraph);

        // hide confirm div
        confirmContainer.hidden = true;
        overlay.hidden = true;

        // reset cart header
        cartHeader.textContent = 'Your Cart (0)';
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
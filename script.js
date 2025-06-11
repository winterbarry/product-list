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
    });
});

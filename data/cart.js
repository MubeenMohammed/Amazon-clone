export const cart  = [];

export function addToCart(productId) {
    let matchingItem;
    const quantitySelectorElement = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantitySelected = Number(quantitySelectorElement.value); 

    cart.forEach((cartItem) => {
        if(productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    if (matchingItem) {
        matchingItem.quantity += quantitySelected;
    } else {
        cart.push({
            productId: productId,
            quantity: quantitySelected
        });
    }

    console.log(cart);
}
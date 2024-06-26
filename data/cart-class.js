class Cart {
    #localStorageKey;
    cartItems;
    

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [{
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId: '1'
        }, {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity:1,
            deliveryOptionId: '2'
        }];
    }

    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    } 

    addToCart(productId) {
        let matchingItem;
        const quantitySelectorElement = document.querySelector(`.js-quantity-selector-${productId}`);
        const quantitySelected = Number(quantitySelectorElement.value); 
    
        this.cartItems.forEach((cartItem) => {
            if(productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });
    
        if (matchingItem) {
            matchingItem.quantity += quantitySelected;
        } else {
            this.cartItems.push({
                productId: productId,
                quantity: quantitySelected,
                deliveryOptionId: '1'
            });
        }
        this.saveToStorage();
    }

    removeFromCart(productId) {
        const newCart = [];
        cart.forEach((cartItem) => {
            if (cartItem.productId !== productId ) {
                newCart.push(cartItem);
            }
        });
        this.cartItems = newCart;
        this.saveToStorage();
    }

    getCartQuantity() {
        let cartQuantity = 0;
    
        this.cartItems.forEach((cartItem) => {
            cartQuantity += cartItem.quantity; 
        });
        return cartQuantity;
    }

    updateoOfProducts(productId, newQuantity) {
        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                cartItem.quantity = newQuantity;
                this.saveToStorage();
            }
        });
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;
        this.cartItems.forEach((cartItem) => {
            if(productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });
        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
        
    }
}

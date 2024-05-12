import {cart, getCartQuantity, removeFromCart, updateoOfProducts, updateDeliveryOption} from '../../data/cart.js';
import { getProduct, products } from '../../data/products.js';
import { formatCurrency } from '../utlis/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary() {


    let cartSummaryHTML = '';

    cart.forEach((cartItem) => {

        const productId = cartItem.productId;

        const matchingProduct = getProduct(productId); 

        const deliveryOptionId = cartItem.deliveryOptionId;

        const deliveryOption = getDeliveryOption(deliveryOptionId);

        const today = dayjs();
        const deliveryDate = today.add(
            deliveryOption.deliveryDays,'days'
        );
        const dayString = deliveryDate.format('dddd, MMMM D');

        
        cartSummaryHTML += `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: ${dayString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                    src="${matchingProduct.image}"
                >
                <div class="cart-item-details">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                        $${matchingProduct.getPrice()}
                    </div>
                    <div class="product-quantity">
                        <span>
                            Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary ">
                            <span class="js-update-link" data-product-id="${matchingProduct.id}">Update </span>
                            <input class="update-quantity-input js-update-quantity-input-${matchingProduct.id}" type="text">
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}" >
                            Delete
                        </span>
                    </div>
                </div>

                <div class="delivery-options js-delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOptionsHtml(matchingProduct,cartItem)}
                </div>
            </div>
        </div>
    `
    });

    const orderSummaryElement = document.querySelector(".js-order-summary");
    orderSummaryElement.innerHTML = cartSummaryHTML;

    document.querySelectorAll('.js-delete-link').forEach((link) => {
        link.addEventListener("click", () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);
            document.querySelector(`.js-cart-item-container-${productId}`).remove();
            renderOrderSummary();
            renderPaymentSummary();
        })
    });


    document.querySelectorAll(".js-update-link").forEach((link) => {
        link.addEventListener("click", () => {
            const productId = link.dataset.productId;
            const newQuantity = Number(document.querySelector(`.js-update-quantity-input-${productId}`).value);
            updateoOfProducts(productId,newQuantity);
            document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
            renderOrderSummary();
            renderPaymentSummary();
        })
    });


    function deliveryOptionsHtml(matchingProduct,cartItem) {

        let deliveryOptionsHTML = '';
        deliveryOptions.forEach((deliveryOption) => {

            const today = dayjs();
            const deliveryDate = today.add(
                deliveryOption.deliveryDays,'days'
            );
            const dayString = deliveryDate.format('dddd, MMMM D');
            const price = deliveryOption.priceCents === 0 
            ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)}`;

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

            deliveryOptionsHTML += `<div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" 
            data-delivery-option-id="${deliveryOption.id}">
                <input type="radio"
                    ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                >
                <div>
                    <div class="delivery-option-date">
                        ${dayString}
                    </div>
                    <div class="delivery-option-price">
                        ${price} - Shipping
                    </div>
                </div>
            </div>`
        });

        return deliveryOptionsHTML;
    }

    document.querySelectorAll(".js-delivery-option").forEach((element) => {
        element.addEventListener("click", () => {
            const productId = element.dataset.productId;
            const deliveryOptionId = element.dataset.deliveryOptionId;
            updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        });
    });
}




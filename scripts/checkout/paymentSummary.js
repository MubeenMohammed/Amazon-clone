import { cart } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utlis/money.js";

export function renderPaymentSummary() {

    let totalPriceCents = 0;
    let totalDeliveryCents = 0;
    let totalQuantity = 0;
    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        totalPriceCents += product.priceCents * cartItem.quantity;
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        totalDeliveryCents += deliveryOption.priceCents;
        totalQuantity += cartItem.quantity;
    });
    const totalBeforeTaxCents = totalDeliveryCents + totalPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;

    const paymentSummary = `
    <div class="payment-summary-title">
        Order Summary
    </div>

    <div class="payment-summary-row">
        <div>Items (${totalQuantity}):</div>
        <div class="payment-summary-money">$${formatCurrency(totalPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatCurrency(totalDeliveryCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary">
        Place your order
    </button>  
    `

    document.querySelector(".js-payment-summary").innerHTML = paymentSummary;

}
export let cart;

loadFromStorage();

export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem("cart"));

    if (!cart) {
        cart = [{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 2,
                deliveryOptionId: "1",
            },
            {
                productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 1,
                deliveryOptionId: "2",
            },
        ];
    }
}

function saveToStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
    let matchingItem;
    let cartSelectValue = document.querySelector(
        `.js-product-quantity-${productId}`
    ).value;
    console.log(cartSelectValue);
    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            matchingItem = cartItem;
        }
    });

    if (matchingItem) {
        matchingItem.quantity += Number(cartSelectValue);
    } else {
        cart.push({
            productId: productId,
            quantity: Number(cartSelectValue),
            deliveryOptionId: "1",
        });
    }

    saveToStorage();
}

export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;

    saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            matchingItem = cartItem;
        }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage();
}
import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe("test suite: addToCart", () => {
    it("Adds an existing product to the cart", () => {
        spyOn(localStorage, "setItem");
        spyOn(localStorage, "getItem").and.callFake(() => {
            return JSON.stringify([{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 1,
                deliveryOptionId: "1",
            }, ]);
        });

        const input = document.createElement("input");
        input.className =
            "js-product-quantity-e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
        input.value = 1;
        document.body.appendChild(input);

        loadFromStorage(); // Make sure cart is loaded from mocked localStorage
        addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart.length).toEqual(1); // Only one item in cart
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart[0].quantity).toEqual(2); // Quantity increased

        input.remove(); // Clean up
    });

    it("Adds a new product to the cart", () => {
        spyOn(localStorage, "setItem");
        spyOn(localStorage, "getItem").and.callFake(() => {
            return JSON.stringify([]);
        });

        const input = document.createElement("input");
        input.className =
            "js-product-quantity-e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
        input.value = 1;
        document.body.appendChild(input);

        loadFromStorage();
        addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart[0].quantity).toEqual(1);

        input.remove(); // Clean up
    });
});
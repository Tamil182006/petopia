import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("petopia_cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("petopia_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(pet) {
    setCartItems(prevItems => {
      const exists = prevItems.find(
        item => item.id === pet.id && item.type === pet.type
      );

      if (exists) {
        return prevItems.map(item =>
          item.id === pet.id && item.type === pet.type
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...pet, quantity: 1 }];
      }
    });
  }

  function removeFromCart(petId) {
    setCartItems(prevItems => prevItems.filter(item => item.id !== petId));
  }

  function updateQuantity(petId, quantity) {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === petId ? { ...item, quantity: quantity } : item
      )
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,   // Expose this so components like Checkout can use it
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,      // Optional but convenient for clearing cart
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

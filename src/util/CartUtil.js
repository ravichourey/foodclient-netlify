export const calculateCartTotal = (cartFoods,quantity) => {
   const totalPrice = cartFoods.reduce((acc, food) => {
    const qty = quantity[food.id] || 0;
    return acc + food.price * qty;
  }, 0);

  
  const shippingCost = totalPrice === 0 ? 0 : totalPrice > 50 ? 0 : 10;
  const tax = totalPrice === 0 ? 0 : totalPrice * 0.1; 
  const finalTotal = totalPrice + shippingCost + tax;
  return {
    totalPrice,
    shippingCost,
    tax,
    finalTotal,
  };
}
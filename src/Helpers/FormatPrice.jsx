// ye ek predefined object hai js ke andar
// 100 paise = 1Rs.
const FormatPrice = ({ price }) => {
  const priceInRupees = price * 74;
  return Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2, // decimal ke baad two hi digit show karega
  }).format(priceInRupees);
};

export default FormatPrice;


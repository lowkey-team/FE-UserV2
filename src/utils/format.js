export const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    // mở cmt nếu sử dụng đơn vị tiền tệ là VND
    currencyDisplay: "code",
    minimumFractionDigits: 0,
  }).format(value);
};
export const formatDateToMySQL = (date) => {
  return date.toISOString().slice(0, 19).replace("T", " ");
};
export const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
};

export function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

export function getInitials(name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
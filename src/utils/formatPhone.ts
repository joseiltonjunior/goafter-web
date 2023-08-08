export function formatPhone(number: string): string {
  const regex10Digitos = /^(\d{2})(\d{4})(\d{4})$/
  const regex11Digitos = /^(\d{2})(\d{5})(\d{4})$/

  if (regex10Digitos.test(number)) {
    return number.replace(regex10Digitos, '($1) $2-$3')
  } else if (regex11Digitos.test(number)) {
    return number.replace(regex11Digitos, '($1) $2-$3')
  }

  return number
}

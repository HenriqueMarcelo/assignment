export function newDateFromString(dateString: string) {
  const dateParts = dateString.split('-')

  const year = Number(dateParts[0]) // parte correspondente ao ano
  const month = Number(dateParts[1]) // parte correspondente ao mês
  const day = Number(dateParts[2]) // parte correspondente ao dia

  return new Date(year, month, day)
}

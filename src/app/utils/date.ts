// create function to convert 2024-08-18T09:45:00Z to 18 Aug 2024,with props { time:boolean, date:boolean }

interface FormatDateOptions {
  time?: boolean
  date?: boolean
}

export const formatDate = (date: string, options: FormatDateOptions = {}) => {
  const opt: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  }

  const formattedDate = new Date(date).toLocaleDateString('id-ID', opt)

  return formattedDate
}

// create function to convert 2024-08-18T09:45:00Z to 18 Aug 2024,with props { time:boolean, date:boolean }

interface FormatDateOptions {
  time?: boolean
  date?: boolean
}

export const formatDate = (date: string | Date, options: FormatDateOptions = {}) => {
  const locale = 'id-ID'

  const d = new Date(date)
  const month = d.toLocaleString(locale, { month: 'short' })
  const day = d.getDate()
  const year = d.getFullYear()
  const time = d.toLocaleString(locale, { hour: 'numeric', minute: 'numeric', hour12: true })

  const optionsProps = {
    date: true,
    ...options,
  }

  let formattedDate = ''

  if (optionsProps.date) {
    formattedDate = `${day} ${month} ${year}`
  }

  if (optionsProps.time) {
    formattedDate = `${formattedDate ? `${formattedDate} at ${time}` : time}`
  }

  return formattedDate
}

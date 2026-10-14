const enc = encodeURIComponent

export const EVENT = {
  title: "Talari Lasya's Half Saree Ceremony",
  start: '20261026T040000Z', // 9:30 AM IST
  end: '20261026T090000Z', // 2:30 PM IST
  location: 'Sitarama Function Hall, Station Road, Near Taluka Office, Kaikaluru, Eluru District',
  details: 'Half Saree Ceremony at 9:30 AM. Lunch from 12:00 noon onwards. Join us to celebrate love, laughter & blessings.',
}

export const googleCalendarUrl = () =>
  `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${enc(EVENT.title)}&dates=${EVENT.start}/${EVENT.end}&details=${enc(EVENT.details)}&location=${enc(EVENT.location)}`

export function downloadIcs() {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Talari Family//Half Saree Ceremony//EN',
    'BEGIN:VEVENT',
    'UID:lasya-half-saree-2026@talari-family',
    `DTSTAMP:${EVENT.start}`,
    `DTSTART:${EVENT.start}`,
    `DTEND:${EVENT.end}`,
    `SUMMARY:${EVENT.title}`,
    `LOCATION:${EVENT.location.replace(/,/g, '\\,')}`,
    `DESCRIPTION:${EVENT.details.replace(/,/g, '\\,')}`,
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    'DESCRIPTION:Half Saree Ceremony tomorrow',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'lasya-half-saree-ceremony.ics'
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

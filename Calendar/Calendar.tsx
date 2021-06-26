import React, { FC } from 'react'
import s from './Calendar.module.css'

export type CalendarDataType = Array<dataType>

export type dataType = {
    date: string,
    payload: any
}

type calendarProps = {
    namesOfDays?: Array<any>,
    namesOfMonths?: Array<any>,
    datePosition?: 'topLeft' | 'topCenter' | 'topRight' | 'centerLeft' | 'center' | 'centerRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight',
    currentMonthColor?: string,
    prevAndNextMonthColor?: string,
    navigationColor?: string,
    data?: Array<dataType>,
    value?: string,
    className?: string,
    theme?: 'chocolate' | 'christmas' |'greenToy' | 'unicorn' | 'aqua' | 'autumn' | 'night'
    setSelected?: (...args: any[]) => void,
    onClick?: (...args: any[]) => void,
}

type calendarDataObj = {
    year: number,
    month: number,
    day: number
}

function getCountOfDays(date: string) {
    return 32 - new Date(new Date(date).getFullYear(), new Date(date).getMonth(), 32).getDate()
}

function generateCalendar(date: string) {


    let calendarData: Array<calendarDataObj> = []
    let today: Date = new Date(date)
    let countOfDays = getCountOfDays(date)
    let firstDayOfMonth = new Date(today.getFullYear(), today.getMonth()).getDay()

    const prevMonth = today.getMonth() - 1
    const prevYear = today.getFullYear()
    const nextMonth = today.getMonth() + 1
    const nextYear = today.getFullYear()

    //fill space of previous month days
    for (let i = 1; i < firstDayOfMonth; i++) {

        let dataObj: calendarDataObj = {
            year: prevYear,
            month: prevMonth,
            day: getCountOfDays(new Date(prevYear, prevMonth, 2).toISOString().substr(0, 10)) - firstDayOfMonth + i + 1
        }

        calendarData.push(dataObj)
    }


    //fill current month
    for (let i = 1; i <= countOfDays; i++) {

        let dataObj: calendarDataObj = {
            year: today.getFullYear(),
            month: today.getMonth(),
            day: i
        }

        calendarData.push(dataObj)
    }

    //fill next month days
    for (let i = 1; i <= 42 - countOfDays - (firstDayOfMonth === 0 ? firstDayOfMonth : firstDayOfMonth - 1); i++) {

        let dataObj: calendarDataObj = {
            year: nextYear,
            month: nextMonth,
            day: i
        }

        calendarData.push(dataObj)
    }

    return calendarData
}

const Calendar: FC<calendarProps> = ({ namesOfDays = ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'], namesOfMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], datePosition = 'topLeft', data, theme = '', value, className = '', setSelected, onClick }) => {

    const [date, setDate] = React.useState(new Date())
    const [activeDay, setActiveDay] = React.useState(date)
    const today = new Date(Date.now())

    const nextMonth = () => {
        let currentDate = new Date(date.toISOString().substr(0, 10))
        let nextMonth = currentDate.getUTCMonth() + 2
        let nextYear = currentDate.getUTCFullYear()

        setDate(new Date(nextYear, nextMonth))
    }

    const nextYear = () => {
        let currentDate = new Date(date.toISOString().substr(0, 10))
        let nextYear = currentDate.getUTCFullYear() + 1

        setDate(new Date(nextYear, currentDate.getUTCMonth() + 1))
    }

    const prevMonth = () => {
        let currentDate = new Date(date.toISOString().substr(0, 10))
        let prevMonth = currentDate.getUTCMonth()
        let prevYear = currentDate.getUTCFullYear()

        setDate(new Date(prevYear, prevMonth))
    }

    const prevYear = () => {
        let currentDate = new Date(date.toISOString().substr(0, 10))
        let prevYear = currentDate.getUTCFullYear() - 1

        setDate(new Date(prevYear, currentDate.getUTCMonth() + 1))
    }

    const onClickHandler = (e: React.FormEvent<HTMLDivElement>, value: string) => {
        e.preventDefault()
        const [day, month, year] = splitDateString(value)

        if (date.getUTCMonth() < month) {
            nextMonth()
        } else if (date.getUTCMonth() > month) {
            prevMonth()
        }

        setActiveDay(new Date(year, month, day))

        let newActiveDay = new Date(year, month, day + 1)

        if (setSelected) setSelected(`${newActiveDay.getUTCDate()}.${newActiveDay.getUTCMonth() + 1}.${newActiveDay.getUTCFullYear()}`)
        if (onClick) onClick(`${newActiveDay.getUTCDate()}.${newActiveDay.getUTCMonth() + 1}.${newActiveDay.getUTCFullYear()}`)
    }

    const splitDateString = (date: string) => {
        return date.split('.').map(item => Number(item))
    }

    const isCurrentDay = (day1: number, month1: number, year1: number, day2: number, month2: number, year2: number) => {
        return new Date(day1, month1, year1).getTime() === new Date(day2, month2, year2).getTime()
    }

    React.useEffect(() => {
        if (value) {
            if (value.match(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/)) {
                let [day, month, year] = splitDateString(value)
                setDate(new Date(year, month, day))
                setActiveDay(new Date(year, month, day))
            }
        }
    }, [value])

    return (
        <div className={`${s.calendar} ${className} ${s[theme]}`}>
            <div className={s.navigation}>
                <button className={s.button} onClick={() => prevYear()}>
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-double-left" role="img" viewBox="0 0 448 512"><path fill="currentColor" d="M223.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L319.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L393.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34zm-192 34l136 136c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9L127.9 256l96.4-96.4c9.4-9.4 9.4-24.6 0-33.9L201.7 103c-9.4-9.4-24.6-9.4-33.9 0l-136 136c-9.5 9.4-9.5 24.6-.1 34z" /></svg>
                </button>
                <button className={s.button} onClick={() => prevMonth()}>
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-left" role="img" viewBox="0 0 256 512"><path fill="currentColor" d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z" /></svg>
                </button>
                <div className={s.monthYear}>{namesOfMonths[new Date(date).getUTCMonth()]} {new Date(date).getUTCFullYear()}</div>
                <button className={s.button} onClick={() => nextMonth()}>
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" role="img" viewBox="0 0 256 512"><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" /></svg>
                </button>
                <button className={s.button} onClick={() => nextYear()}>
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-double-right" role="img" viewBox="0 0 448 512"><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z" /></svg>
                </button>
            </div>
            <div className={s.calendarWrapper}>
                {namesOfDays.map((item: string, key: number) =>
                    <div
                        key={`dayName${key}`}
                        className={s.daysItem}>
                        <div className={`${s.number} ${s[datePosition]}`}>{item}</div>
                    </div>)}
                {generateCalendar(date.toISOString().substr(0, 10)).map((item: calendarDataObj, key: number) =>
                    <div
                        onClick={(e) => onClickHandler(e, `${item.day}.${item.month}.${item.year}`)}
                        key={`day${key}`}
                        className={`${s.calendarItem} ${item.month === new Date(date).getUTCMonth() ? s.currentMonth : s.otherMonth} ${isCurrentDay(today.getUTCDate(), today.getUTCMonth(), today.getUTCFullYear(), item.day, item.month, item.year) && s.currentDay} ${isCurrentDay(item.day, item.month, item.year, activeDay.getDate(), activeDay.getMonth(), activeDay.getFullYear()) && s.selectedDay}`}
                        >

                        <div className={`${s.number} ${s[datePosition]}`}>{item.day}</div>
                        <div className={s.content}>{data &&
                            data.filter((content: dataType) => {
                                let [day, month, year] = content.date.split('.')
                                if (isCurrentDay(Number(day), Number(month) - 1, Number(year), item.day, item.month, item.year)) return content.payload
                            }).length || ''}</div>
                    </div>)}
            </div>
        </div>
    )
}

export default React.memo(Calendar);
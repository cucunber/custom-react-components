import React, { FunctionComponent, useEffect, useState, useRef, useCallback } from "react"
import s from './RangeInput.module.css'

type RangeInput = {
    min?: number,
    max?: number,
    step?: number,
    value: number,
    setValue: React.Dispatch<React.SetStateAction<any>>,
    withLable?: boolean,
    id: any,
    options?: {
        name: string,
        data: Array<{ value: number | string, label?: string }>
    },
    showDelay?: number,
    className?: string,
}

/**
 * 
 * @param {number} min minimal value of range
 * @param {number} max maximal value of range
 * @param {number} step step of change
 * @param {number} value initial value of range
 * @param {React.Dispatch<React.SetStateAction<any>>} setValue function which will change value
 * @param {boolean} withLable true to show label on top of track, false in other case
 * @param {any} id unique id
 * @param {{name: string,data: Array<{ value: number | string, label?: string }>}} options list of options which will be set under track like hash-dots and labels 
 * @param {number} showDelay delay of showing label
 * @returns custom range input component
 */

export const RangeInput: FunctionComponent<RangeInput> = ({ min = 0, max = 100, step = 1, value, setValue, withLable = true, id, options = {}, showDelay = 500, className }) => {

    let [show, setShow] = useState(false)

    function changeHandler(e: React.ChangeEvent<HTMLInputElement>): void {
        setValue(e.target.value)
        showLabel()
    }

    const timer = useRef<NodeJS.Timeout>()

    const delayedCallback = useCallback(() => {
        if (timer.current) {
            clearTimeout(timer.current)
        }
        timer.current = setTimeout(() => {
            setShow(false)
        }, showDelay)
    }, [showDelay])

    function showLabel() {
        setShow(true)
        delayedCallback()
    }

    return (
        <div className={`${s.wrapper} ${className}`}>
            <label style={{ left: `${((value + min) / max) * 10}%` }} className={`${s.label} ${withLable ? show && s.active : s.hide}`} htmlFor={`range${id}`}>{value}</label>
            <datalist className={`${s.datalist} ${!(options.data && options.name) && s.hide}`} id={options?.name}>
                {options.data && options.data.map((item, key) => <option key={`option${options?.name}${key}`} style={{ left: item.label }} value={item.value} label={item.label ? item.label : ''} />)}
            </datalist>
            <input className={s.input} list={options?.name} type="range" id={`range${id}`} min={min} max={max} step={step} value={value} onInput={changeHandler} onChange={changeHandler} />
        </div>
    )
}
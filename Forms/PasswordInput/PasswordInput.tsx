import React, { FunctionComponent } from "react"
import s from './PasswordInput.module.css'

type PasswordProps = {
    withShowPass?: boolean,
    activePlaceholder?: boolean,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<any>>,
    id: any,
    placeholder?: string,
    className?: string,
}

/**
 * Simple input
 * @param {string} type type of input: text/number
 * @param {boolean} activePlaceholder set status of placeholder, if true it display, false in other case
 * @param {boolean} withShowPass set status of option which on click show password
 * @param {any} value value of input (use useState() or this.state/setState() for this)
 * @param {React.Dispatch<React.SetStateAction<any>>} setValue function to change value (use useState() or this.state/setState() for this)
 * @param {any} id unique id
 * @param {string} placeholder text of placeholder
 * @returns Input component
 */

export const PasswordInput: FunctionComponent<PasswordProps> = ({ withShowPass = true, activePlaceholder = true, value, setValue, placeholder = 'Password', className, id }) => {

    let [show, setShow] = React.useState(withShowPass || false)
    let [focus, setFocus] = React.useState(false)

    return (
        <div className={`${s.input_wrapper} ${className}`}>
            <label htmlFor={`Password${id}`} className={`${s.label} ${activePlaceholder ? (focus || value) ? s.moveUp : s.default : s.hide}`}>{placeholder}</label>
            <input className={s.input} id={`Password${id}`} type={show ? 'text' : 'password'} value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setValue(e.target.value)} onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)}/>

            <div onClick={() => setShow(!show)} className={`${s.icon_eye} ${withShowPass ? show ? s.eye_open : s.eye_close : s.hide}`}>
                <svg viewBox="-20 -200 320 400" xmlns="http://www.w3.org/2000/svg" >
                    <g className={s.eye} strokeWidth="25" fill="none">

                        <path id={`${s.eye_bottom}`} d="m0,0q150,150 280,0" stroke="currentColor" />
                        <path id={`${s.eye_top}`} d="m0,0q150,150 280,0" stroke="currentColor" />

                        <circle id={`${s.eye_pupil}`} cx="140" cy="0" r="40" fill="currentColor" stroke="none" />
                    </g>
                </svg>
            </div>
        </div>
    )
}

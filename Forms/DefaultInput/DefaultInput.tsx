import React, { FunctionComponent } from 'react'
import s from './DefaultInput.module.css'

type InputProps = {
    type?: string,
    activePlaceholder?: boolean,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<any>>,
    id: any,
    placeholder?: string,
    className?: string,
}

/**
 * 
 * @param {string} type type of input: text/number
 * @param {boolean} activePlaceholder set status of placeholder, if true it display, false in other case
 * @param {any} value value of input (use useState() or this.state/setState() for this)
 * @param {React.Dispatch<React.SetStateAction<any>>} setValue function to change value (use useState() or this.state/setState() for this)
 * @param {any} id unique id
 * @param {string} placeholder text of placeholder
 * @returns Input component
 */

export const DefaultInput: FunctionComponent<InputProps> = ({type = 'text', activePlaceholder = true, value, setValue, id, placeholder = '', className}) => {
    let [focus, onFocus] = React.useState(false)
    return(
        <div className={`${s.input_wrapper} ${className}`}>
            <label htmlFor={`input${id}`} className={`${s.label} ${activePlaceholder ? (focus || value) ? s.moveUp : s.default : s.hide}`}>{placeholder}</label>
            <input id={`input${id}`} type={type} value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setValue(e.target.value)} onFocus={()=>onFocus(true)} onBlur={()=>onFocus(false)} className={s.input}/>
        </div>
    )
}
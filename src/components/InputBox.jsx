import React from 'react'
import "../styles/InputBox.css"

const InputBox = (props) => {
  return (
    <div className ="field">
        <label htmlFor={props.Kind}>
            {props.Name}
             {!props.required && (
            <span className="optional"> (Optional)</span>
            )}
        </label>

        <input
            id={props.Kind}
            name={props.Kind}
            type={props.Type || "text"}
            value={props.Statename}
            onChange={props.handleChange}
            placeholder={props.Place}
            required={props.required}
        />
    </div>
  )
}

export default InputBox

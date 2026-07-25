import React from 'react'
import "../styles/TextareaBox.css"

const TextareaBox = (props) => {
  return (
    <div className = "textarea_field">
      <label htmlFor = {props.Kind}>
        {props.Name}
        {!props.required && (
        <span className="optional"> (Optional)</span>
        )}
      </label>
      <textarea
      id = {props.Kind}
      name = {props.Kind}
      value = {props.Statename}
      onChange={props.handleChange}
      placeholder={props.Place}
      rows = {props.Count}
      required = {props.required}  
      />
    </div>
  )
}

export default TextareaBox

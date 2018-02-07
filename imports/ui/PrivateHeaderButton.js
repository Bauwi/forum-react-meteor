import React from 'react'

const PrivateHeaderButton = (props) => {
  const btnClassName = props.location === props.reference ? "button--header button--header--selected" : "button--header"
  const faClassName = props.reference === "onHome" ? "fa fa-home" : props.reference === "onProfile" ? "fa fa-user" : "fa fa-comments-o"
  return(
    <button
      onClick={() => Session.set(props.reference, true)}
      className={btnClassName}
      >
        <i className={faClassName}></i>
      </button>
  )
}

export default PrivateHeaderButton

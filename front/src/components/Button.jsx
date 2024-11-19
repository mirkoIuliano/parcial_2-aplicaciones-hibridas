import React from "react";

const Button = (props) => {
    return (
        <button type="button" className={'btn btn-'+props.color} onClick={props.fn}> {props.text}  </button>
    )
}

export default Button
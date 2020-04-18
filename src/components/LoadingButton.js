import React from 'react';
import Animation from '../loading.svg';

const SPINNER = <img className="spinner" src={Animation} alt="Loading..."></img>

export default function LoadingButton(props) {
    const buttonProps = { ...props, loading: undefined };
    return (
        <button {...buttonProps}>
            {props.loading ? SPINNER : props.children}
        </button>
    );
}
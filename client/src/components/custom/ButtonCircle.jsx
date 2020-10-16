import React from 'react'

const Button = ({ children }) => {
    return (
        <button style={{
            backgroundImage: 'linear-gradient(to right, #8763fc, #806afd, #7a70fd, #7576fd, #707cfd, #6385ff, #578dff, #4d94ff, #39a0ff, #2caaff, #2cb4fe, #39bdfb)',
            border: 'none',
            width: '30px',
            height: '30px',
            padding: '6px 0',
            color: 'white',
            fontSize: '1rem',
            fontWeight: 'bold',
            borderRadius: '15px',
            textAlign: 'center'
        }}>
            { children}
        </button>
    );
}

export default Button;
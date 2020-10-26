import React from 'react'

const ButtonBlockSecundary = ({ children }) => {
    return (
        <button style={{
            border: '1px solid #ccc9c9',
            display: 'block',
            width: '100%',
            padding: '10px 0',
            color: '#424242',
            fontSize: '1rem',
            fontWeight: 'bold',
            borderRadius: '5px',
            textAlign: 'center',
            margin: '0 1rem'
        }}
        >
            {children}
        </button>
    );
}

export default ButtonBlockSecundary;
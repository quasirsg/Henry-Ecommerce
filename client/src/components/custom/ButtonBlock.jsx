import React from 'react'

const ButtonBlock = ({ children }) => {
    return (
        <button
            type="submit"
            style={{
                backgroundImage: 'linear-gradient(to right, #8763fc, #806afd, #7a70fd, #7576fd, #707cfd, #6385ff, #578dff, #4d94ff, #39a0ff, #2caaff, #2cb4fe, #39bdfb)',
                border: 'none',
                display: 'block',
                width: '100%',
                padding: '10px 0',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 'bold',
                borderRadius: '5px',
                textAlign: 'center',
                margin: '0 1rem',
            }}
        >
            {children}
        </button>
    );
}

export default ButtonBlock;
import React from 'react'

const ButtonSquare = ({ icon, onClick, Children }) => {
    return (
        <button
            type="button"
            style={{
                backgroundColor: 'transparent',
                border: '1px solid #ccc9c9',
                display: 'block',
                width: '100%',
                padding: '15px 0',
                marginBottom: '10px',
                color: '#424242',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                textAlign: 'center'
            }}
            onClick={onClick}
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="button__icon px-3">
                    {icon}
                </div>
                <div className="button__children">
                    {Children}
                </div>
            </div>
        </button>
    );
}

export default ButtonSquare;

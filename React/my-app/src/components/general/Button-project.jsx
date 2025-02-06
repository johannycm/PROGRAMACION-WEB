import React from 'react';
import propTypes from 'prop-types';


function ButtonP ({ children }) {
    return (
        <button className="w-full bg-rickgreen hover:bg-black text-black hover:text-white font-handjet p-2 text-xl rounded
        font-medium transition-all">
            {children}
        </button>
    );
}

ButtonP.propTypes = {
    children: propTypes.node.isRequired,
};

export default ButtonP;
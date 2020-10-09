import React from 'react';
import PropTypes from 'prop-types';
import './Nav.css';

function Nav(props) {
    return (
        <nav className='Nav'>
            { props.children }
            { props.items.map( 
                (item, i) => 
                    <a 
                        key={`/${i}-${item}`}
                        href={`/${item}`}>{ item }
                    </a>
                )
            }
        </nav>
    );
}

Nav.propTypes = {
    items: PropTypes.array
};

export default Nav;
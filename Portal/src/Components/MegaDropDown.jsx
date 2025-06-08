import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';

const MegaDropdown = ({ title, children }) => {
    const [show, setShow] = useState(false);

    
    const toggleShow = (nextShow) => setShow(nextShow);

    return (
        <Dropdown
            onMouseEnter={() => toggleShow(true)}
            onMouseLeave={() => toggleShow(false)}
            show={show}
            className="position-static MegaDropDownWrapper MenuNav"
        >
            <Dropdown.Toggle
                variant="link"
                id={`mega-dropdown-${title}`}
                className="text-decoration-none menuLinks"
                style={{ color: '#333' }}
            >
                {title}
            </Dropdown.Toggle>

        
            <Dropdown.Menu className="mega-menu">
                {children}
            </Dropdown.Menu>
        </Dropdown>
    );
};

MegaDropdown.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

export default MegaDropdown;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ItemNav( {nameItem}: {nameItem: string} ) {
    const [active, setActive] = useState('home');

    return <Link
        to={`/${nameItem}`}
        className={active === nameItem ? nameItem : ''}
        onClick={() => setActive(nameItem)}
    >
    </Link>
}

export default ItemNav;
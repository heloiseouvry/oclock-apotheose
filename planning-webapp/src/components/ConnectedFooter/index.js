import React from 'react';


import './styles.scss';

const ConnectedFooter= () => { 

    const currentYear = new Date().getFullYear();

    return (
        <footer className="copyright">

        <p>Copyright ⓒ {currentYear}</p>

        </footer>
    )
};

export default ConnectedFooter;
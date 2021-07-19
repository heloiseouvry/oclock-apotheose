import React from 'react';


import './styles.scss';

const Footer= () => { 
    return (
        <footer>
          <p>Qui sommes nous?</p>
            <div className="team">
                <div className="logoEquipe">
                    <img src="https://img.icons8.com/ios-filled/100/000000/user-male-circle.png"/>
                    <a target="_blank" rel="noopener noreferrer" href='https://github.com/YannSinbad'>Yann</a> 
                </div>
                <div className="logoEquipe">
                    <img src="https://img.icons8.com/ios/100/000000/user-male-circle.png"/>
                    <a target="_blank" rel="noopener noreferrer" href='https://github.com/heloiseouvry'>Heloïse</a> 
                </div>
                <div className="logoEquipe">
                    <img src="https://img.icons8.com/ios-filled/100/000000/user-male-circle.png"/>
                    <a target="_blank" rel="noopener noreferrer" href='https://github.com/FredericDosSantos'>Fred</a> 
                </div>
                <div className="logoEquipe">
                    <img src="https://img.icons8.com/ios/100/000000/user-male-circle.png"/>
                    <a target="_blank" rel="noopener noreferrer" href='https://github.com/nadegesinbad'>Nadège</a> 
                </div>       
            </div>
            
        </footer>
    )
     };

export default Footer;
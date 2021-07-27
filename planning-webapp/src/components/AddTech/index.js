import React from 'react';
import { Button, Checkbox } from 'semantic-ui-react';

import './styles.scss';

function AddTech () {

    return(
        <div className='CreateTech'>
        <h1 className='title'>Ajouter un technicien</h1>

            <form className='submitTech' method="POST" > 

                <input type='text' placeholder='Nom' />               
                <input type="text" placeholder='Prénom' />
                <input type='text' placeholder='Adresse' />               
                <input type="text" placeholder='Code postale' />
                <input type='text' placeholder='Ville' />               
                <input type="text" placeholder='Téléphone' />
                <input type='email' placeholder='Email' />
                    
                    <select className='statut' name="pets" id="pet-select">
                        <option value="">Quelle est son status?</option>
                        <option value="dog">Intermitant</option>
                        <option value="cat">Prestataire</option>
                    </select>

                <label className='datePicker' htmlFor="start">Date de naissance:</label> 
                <input id="date" type="date" contentEditable='true' min="1900-01-01" max="2100-12-31" /> 

                <input type="text" placeholder='Code Postale de Naissance' />
                <input type='text' placeholder='Ville de Naissance' />               
                <input type="text" placeholder='N° de Sécurité Sociale' />
                <input type='text' placeholder='N° de Congé de spectacle' />               
                <input type="text" placeholder='Raison Sociale' />
                <input type='text' placeholder='N° de Siret' />               
                <input type="text" placeholder='Commentaire suplémentaire?' />

                <Checkbox className='checkbox' label='Son' />
                <Checkbox className='checkbox' label='Lumiere' />
                <Checkbox className='checkbox' label='Video' />
                <Checkbox className='checkbox' label='Autre' />           
                
            
                <div className='Submit-Tech' >
                    <Button type='submit' className='button' content='Se connecter' primary />
                    
                </div>
            </form>
        </div>
    )
};

export default AddTech;

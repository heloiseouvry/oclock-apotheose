import React from 'react';
import { Button } from 'semantic-ui-react';

import './styles.scss';

// function PhaseType(that) {
//     if (that.value == "other") {
//         document.getElementById("ifYes").style.display = "block";
//     } else {
//         document.getElementById("ifYes").style.display = "none";
//     }
// }

const PhaseForm = () =>{ 

    return(
        <div className='CreatePhase'>
            <h1 className='title'>Créer une Phase</h1>
                            
            <form className='SubmitPhase' method="POST" > 

                <select name="Phases" id="pet-select">
                    <option value="">Listes des Phases</option>
                    <option value="Montage">Montage</option>
                    <option value="Répétition">Répétition</option>
                    <option value="Exploitation">Exploitation</option>
                    <option value="Démontage">Démontage</option>
                    <option value="Livraison">Livraison</option>
                    <option value="Autre">Transport autre</option>
                </select>

                <label  for="start">Début</label> 
                    <input id="date" type="date" contentEditable='true' min="1900-01-01" max="2100-12-31" value="2021-01-01" /> 
                <label className='datePicker' for="start">Fin</label> 
                    <input id="date" type="date" contentEditable='true' min="1900-01-01" max="2100-12-31" value="2021-01-01" /> 

                <label for="appt">Heure de Début:</label>
                    <input type="time" id="appt" name="appt" />  
                <label for="appt">Heure de Fin:</label>
                    <input type="time" id="appt" name="appt" />  

                    <textarea className='comment' type='text' placeholder='Laissez un commentaire (2000 charactère maximum)' maxlength = "2000"/> 

                    {/* <div id="ifYes" style="display: none;">
                        <label for="car">Muu, mikä?</label> <input type="text" id="car" name="car" />
                    </div>             */}
                
                <div className='Submit-Phase' >
                    <Button type='submit' className='button' content="Créer la phase" primary />
                    
                </div>
            </form>
        </div>
    )
};

export default PhaseForm;
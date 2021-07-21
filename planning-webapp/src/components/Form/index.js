import React from 'react';

const Form = ({ onSubmit, techList, currentPhase}) => {

  let test;

  if (currentPhase && currentPhase.raw && currentPhase.raw.techID) {
    test = currentPhase.raw.techID;
  }
  else {
    test = techList[0].id;
  }
  console.log("test", test);
  return (
    // dans un form le onSubmit est un mécanisme inhérent au system de form
    // il faut lui spécifier la méthode qui va récupérer les infos
    // pour ce faire, mettre 1 propriété name aux balises desquelles je veux récupérer les infos
    <form onSubmit={onSubmit}>
      <input type="hidden" name="createHidden" value={currentPhase ? "false" : "true"} />
      <input type="hidden" name="IDHidden" value={currentPhase ? currentPhase.id : -1 } />
      <input type="hidden" name="calendarIdHidden" value={currentPhase ? currentPhase.calendarId : -1 } />
      <div className="tech-list">
        <select name="techName" className="tech-list">
          {
            techList.map(({ id, prenom, nom }) => { 
              console.log("techListID", id);
              
              return(
              <option value={id} selected={test == id} key={id} className="techList">
                {prenom} {nom}
              </option> )}
              
            )
          }
        
        </select>
      </div>
      <div className="form-group">
        <button className="form-control btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};
export default Form;

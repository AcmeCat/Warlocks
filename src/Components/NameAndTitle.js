import React from 'react';
import data from '../Data/patrons.json';

function NameAndTitle({name, species, patron, pact}) {
    let patrons = data[patron];
    return (
      <div>
        <h2 className='warlock-name'>{name}</h2>
        <p className='running-title'>{species} Warlock, 
            {this.randomBool(33) ? 'Devotee' : this.randomBool(50) ? 'Servant' : 'Minion'} of {patron}
            {pact !== '' ? ', Pact of the ' + pact : ''}</p>
      </div> 
    )
  }

  export default NameAndTitle;
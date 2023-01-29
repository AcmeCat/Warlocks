import React from 'react';
import data from '../Data/patrons.json';

function NameAndTitle({details}) {
    let patrons = data[details.patron];
    return (
      <div>
        <h2 className='warlock-name'>{details.name}</h2>
        <p className='running-title'>{details.species} Warlock, 
            {this.randomBool(33) ? 'Devotee' : this.randomBool(50) ? 'Servant' : 'Minion'} of {details.patron}
            {details.pact !== '' ? ', Pact of the ' + details.pact : ''}</p>
      </div> 
    )
  }

  export default NameAndTitle;
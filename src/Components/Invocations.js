import React from 'react';
import data from '../data.json';

function Invocations({level, pact}) {

    let invocations = []
    let number = data.levels[level]["invocations"]

    return (
        <div>
          <h3>Invovations</h3>
          <p>number: {number}</p>
          <p>pact: {pact}</p>
          <p>{invocations.join(", ")}</p>
        </div> 
    )
}

export default Invocations
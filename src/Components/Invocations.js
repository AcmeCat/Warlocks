import React from 'react';
import data from '../Data/data.json';

function Invocations({level, pact}) {

    let invocations = [];
    let available = [];
    let numberOfInv = data.levels[level]["invocations"];
    for (const prereqLevel in data.invocations) {
        if (prereqLevel <= level && data.invocations[prereqLevel].hasOwnProperty("All")) {
            available.push(...data.invocations[prereqLevel]["All"])
            if (data.invocations[prereqLevel].hasOwnProperty(pact)) {
                available.push(...data.invocations[prereqLevel][pact])
            }
        }
    }

    for (let i = 0; i < numberOfInv; i++) {
        let ran = Math.floor(Math.random() * available.length);
        invocations.push(available.splice(ran, 1));
    }

    return (
        <div>
          <h3>Invocations</h3>
          <p>{invocations.join(", ")}</p>
        </div> 
    )
}

export default Invocations
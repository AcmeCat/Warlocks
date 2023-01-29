import React from 'react';
import data from '../Data/data.json';

function Spells({level}) {
    let numCantrips = Number.parseInt(data.levels[level]["cantrips"]);
    let allCantrips = [...data.spells.cantrips];
    let selectedCantrips = ["Eldritch Blast"];
    for (let i = 1; i < numCantrips; i++) {
      let ran = Math.floor(Math.random() * allCantrips.length)
      selectedCantrips.push(allCantrips.splice(ran, 1)[0]);
    }
    let leveledSpells = [[], [], [], [], [], [], [], [], []]
    let spellsPerLevel = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let slotLevel = data.levels[level]["slot level"];
    let numberOfSpells = data.levels[level]["spells known"];
  
    for (let i = 0; i < slotLevel; i++) {
      spellsPerLevel[i] = 2;
      numberOfSpells -= 2;
    }
    for (let i = numberOfSpells; i > 0; i--) {
      let spellLevel = Math.floor(Math.random() * data.levels[level]["slot level"])
      spellsPerLevel[spellLevel] += 1
    }
  
    if (level > 10) {
      spellsPerLevel[5] = 1;
      if (level > 12) {
        spellsPerLevel[6] = 1;
        if (level > 14) {
          spellsPerLevel[7] = 1;
          if (level > 16) {
            spellsPerLevel[8] = 1;
          }
        }
      }
    }
  
    leveledSpells = spellsPerLevel.map((ele, ind) => {
      let arr = [];
      let lvl = (ind + 1).toString();
      let spellList = [...data.spells[lvl]];
      for (let i = 0; i < ele; i++) {
        let ran = Math.floor(Math.random() * spellList.length);
        let spell = spellList.splice(ran, 1)[0];
        arr.push(spell);
      }
      return arr;
    });
  
    let selectedSpells = [selectedCantrips, ...leveledSpells];
  
    let getSpells = (lvl) => {
      if (selectedSpells[lvl].length !== 0) {
        return <p><span className='title'>Level {lvl}{lvl > 5 ? "(Arcanum)" : ""}: </span> {selectedSpells[lvl].join(", ")}</p>
      }
    }
  
    return (
      <div>
        <h3>Spells</h3>
        <p><span className='title'>Spell Slots: </span> {data.levels[level]["spell slots"]} <span className='title'>Slot Level:</span> {data.levels[level]["slot level"]}</p>
        <p><span className='title'>Cantrips: </span> {selectedSpells[0].join(", ")}</p>
        <p><span className='title'>Level 1: </span> {selectedSpells[1].join(", ")}</p>
        {getSpells(2)}
        {getSpells(3)}
        {getSpells(4)}
        {getSpells(5)}
        {getSpells(6)}
        {getSpells(7)}
        {getSpells(8)}
        {getSpells(9)}
      </div> 
    )
  }

  export default Spells;
import React from 'react';

function Attributes({att}) {
    return (
        <div>
            <p><span className='title'>STR: </span>{att.STR} ({this.modString(this.getModFromStat(this.state.STR))}), 
            <span className='title'>DEX: </span>{att.DEX} ({this.modString(this.getModFromStat(this.state.DEX))}), 
            <span className='title'>CON: </span>{att.CON} ({this.modString(this.getModFromStat(this.state.CON))}),</p>
          <p><span className='title'>INT: </span>{att.INT} ({this.modString(this.getModFromStat(this.state.INT))}), 
            <span className='title'>WIS: </span>{att.WIS} ({this.modString(this.getModFromStat(this.state.WIS))}), 
            <span className='title'>CHA: </span>{att.CHA} ({this.modString(this.getModFromStat(this.state.CHA))})</p>
        </div>
    )
}

export default Attributes
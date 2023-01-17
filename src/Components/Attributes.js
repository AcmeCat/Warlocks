import React from 'react';

function Attributes({att}) {

    return (
        <div>
            <div className='attribute-flex'>
                <div className='attribute'>
                    <h4>STR</h4>
                    <p className='value'>{att.STR.value}</p>
                    <p>({modString(att.STR.mod)})</p>
                </div>
                <div className='attribute'>
                    <h4>DEX</h4>
                    <p className='value'>{att.DEX.value}</p>
                    <p>({modString(att.DEX.mod)})</p>
                </div>
                <div className='attribute'>
                    <h4>CON</h4>
                    <p className='value'>{att.CON.value}</p>
                    <p>({modString(att.CON.mod)})</p>
                </div>
            </div>
            <div className='attribute-flex'>
                <div className='attribute'>
                    <h4>INT</h4>
                    <p className='value'>{att.INT.value}</p>
                    <p>({modString(att.INT.mod)})</p>
                </div>
                <div className='attribute'>
                    <h4>WIS</h4>
                    <p className='value'>{att.WIS.value}</p>
                    <p>({modString(att.WIS.mod)})</p>
                </div>
                <div className='attribute'>
                    <h4>CHA</h4>
                    <p className='value'>{att.CHA.value}</p>
                    <p>({modString(att.CHA.mod)})</p>
                </div>
            </div>
        </div>
        
    )  
    
    function modString (mod) {
        return mod < 0 ? mod.toString() : "+" + mod.toString();
    }
}

export default Attributes
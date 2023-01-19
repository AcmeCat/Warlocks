import React from 'react';

function Attributes({att}) {

    return (
        <div>
            <div className='attribute-flex'>
                <div className='attribute'>
                    <div className='attribute-name'>STR</div>
                    <div className='value'>{att.STR.value}</div>
                    <div className='modifier'>({modString(att.STR.mod)})</div>
                </div>
                <div className='attribute'>
                    <div className='attribute-name'>DEX</div>
                    <div className='value'>{att.DEX.value}</div>
                    <div className='modifier'>({modString(att.DEX.mod)})</div>
                </div>
                <div className='attribute'>
                    <div className='attribute-name'>CON</div>
                    <div className='value'>{att.CON.value}</div>
                    <div className='modifier'>({modString(att.CON.mod)})</div>
                </div>
            </div>
            <div className='attribute-flex'>
                <div className='attribute'>
                    <div className='attribute-name'>INT</div>
                    <div className='value'>{att.INT.value}</div>
                    <div className='modifier'>({modString(att.INT.mod)})</div>
                </div>
                <div className='attribute'>
                    <div className='attribute-name'>WIS</div>
                    <div className='value'>{att.WIS.value}</div>
                    <div className='modifier'>({modString(att.WIS.mod)})</div>
                </div>
                <div className='attribute'>
                    <div className='attribute-name'>CHA</div>
                    <div className='value'>{att.CHA.value}</div>
                    <div className='modifier'>({modString(att.CHA.mod)})</div>
                </div>
            </div>
        </div>
        
    )  
    
    function modString (mod) {
        return mod < 0 ? mod.toString() : "+" + mod.toString();
    }
}

export default Attributes
import React   from 'react'
import Profile from '../profile/Profile'
import  './Home.css'

export default function Home ({userName , difficultyLevel}) {
   return(
            <div style={{ display:'flex', flex:1, flexDrection:'row',margin:'10px', padding:'10px',
            justifyContent:'space-between'}}>
                <div className='column'>
                    <Profile userName={userName} difficultyLevel={difficultyLevel}/>
                    <h3 className='top-details'>SCOREBOARD</h3>
                    <h3 className='top-details'>QUIT GAME</h3>
                </div>
                
               


            </div>
        );
    
}
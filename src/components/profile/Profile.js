import React from 'react'
import  './Profile.css'
import gamepad from '../../assets/Iconawesome-gamepad.svg'
import person from '../../assets/Iconmaterial-person.svg'


export default function Profile ({userName , difficultyLevel}) {
    return(
            <div>
              <div className='left-section'>
              <img src={person} alt='Player' width='30' height='30' />
              <div class='profile-details' >{userName}</div>
              </div>
                <div className='left-section'>
                <img src={gamepad} alt='Player' width='30' height='30' />
                <div class='profile-details'>Level:{difficultyLevel}</div>
                </div>
            </div>
    )}
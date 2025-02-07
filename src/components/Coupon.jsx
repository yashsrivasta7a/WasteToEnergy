import React from 'react'
import { BiSolidCoinStack } from "react-icons/bi";
import { MdEnergySavingsLeaf } from "react-icons/md";

function Coupon({ brand, discount, description, image, coins }) {
    return (

        <div className='coupon'>
            <img src={image} alt="" />
            <span>
                <h1>{brand}</h1>
                <h2>{discount}</h2>
                <p>{description}</p>
            </span>
            <span>
                <MdEnergySavingsLeaf style={{ borderRadius: '50%', border: '#28a745 2px solid', padding: '0.5rem' }} size={30} fill='#28a745' />
                <h4>{coins}</h4>
                <h4>Coins</h4>
            </span>
        </div>
    )
}

export default Coupon
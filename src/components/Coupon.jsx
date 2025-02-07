import React from 'react'
import { BiSolidCoinStack } from "react-icons/bi";

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
                <BiSolidCoinStack size={40} />
                <h4>{coins}</h4>
                <h4>Coins</h4>
            </span>
        </div>
    )
}

export default Coupon
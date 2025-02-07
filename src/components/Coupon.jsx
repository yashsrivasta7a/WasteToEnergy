import React from "react";
import { BiSolidCoinStack } from "react-icons/bi";
import { MdEnergySavingsLeaf } from "react-icons/md";
import * as motion from "motion/react-client";

function Coupon({ brand, discount, description, image, coins, onRedeem }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50, rotate: 50 }}
            animate={{ opacity: 1, y: 0, rotate: 0, transition: { type: "spring", stiffness: 150, damping: 10 } }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            className="coupon"
            style={couponStyle}
        >
            <img src={image} alt="" />
            <span>
                <h1>{brand}</h1>
                <h2>{discount}</h2>
                <p>{description}</p>
            </span>
            <span>
                <MdEnergySavingsLeaf
                    style={{
                        borderRadius: "50%",
                        border: "#28a745 2px solid",
                        padding: "0.5rem",
                    }}
                    size={30}
                    fill="#28a745"
                />
                <h4>{coins} Coins</h4>
            </span>
            {/* Redeem Button */}
            <button onClick={() => onRedeem(coins)} className="redeem-button">
                Redeem
            </button>
        </motion.div>
    );
}

const couponStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    margin: "20px 0",
};

export default Coupon;
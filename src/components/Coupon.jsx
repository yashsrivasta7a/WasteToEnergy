import React from "react";
import { BiSolidCoinStack } from "react-icons/bi";
import { MdEnergySavingsLeaf } from "react-icons/md";
import * as motion from "motion/react-client";

const couponVariants = {
    hidden: { opacity: 0, y: 50, rotate: 50 },
    visible: {
        opacity: 1,
        y: 0,
        rotate: 0,
        transition: {
            type: "spring",
            stiffness: 150,
            damping: 10,
        },
    },
};

const hoverEffect = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
};

const iconHoverEffect = {
    hover: { backgroundColor: "#28a745", borderRadius: "50%", transition: { duration: 0.3 } },
};

function Coupon({ brand, discount, description, image, coins }) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            whileHover={hoverEffect}
            viewport={{ once: true, amount: 0.2 }}
            variants={couponVariants}
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
                <motion.div variants={iconHoverEffect}>
                    <MdEnergySavingsLeaf
                        style={{
                            borderRadius: "50%",
                            border: "#28a745 2px solid",
                            padding: "0.5rem",
                        }}
                        size={30}
                        fill="#28a745"
                    />
                </motion.div>
                <h4>{coins}</h4>
                <h4>Coins</h4>
            </span>
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
    transformOrigin: "10% 60%",
};

export default Coupon;

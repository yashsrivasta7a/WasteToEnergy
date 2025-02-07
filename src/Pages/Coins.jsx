import React, { useState, useEffect } from "react";
import Coupon from "../components/Coupon";
import Navbar from "../components/Navbar";
import { ref, onValue, set, push, update } from "firebase/database";
import { database } from "../firebase";

function Coins() {
    const [totalCoins, setTotalCoins] = useState(0);
    const userId = "user123"; // Replace with actual user ID from authentication

    useEffect(() => {
        const dbRef = ref(database, `users/${userId}/coins`); // Get user's coins

        const unsubscribe = onValue(dbRef, (snapshot) => {
            if (snapshot.exists()) {
                setTotalCoins(snapshot.val());
            } else {
                setTotalCoins(0);
            }
        });

        return () => unsubscribe();
    }, [userId]);

    // Handle redeem logic
    const handleRedeem = (coupon) => {
        if (totalCoins >= coupon.coins) {
            const newTotal = totalCoins - coupon.coins;
            const userCoinsRef = ref(database, `users/${userId}/coins`);
            const redeemedRef = ref(database, `users/${userId}/redeemedCoupons`);

            // Update Firebase: Subtract coins and store redeemed coupon
            update(userCoinsRef, { coins: newTotal });
            push(redeemedRef, coupon);

            setTotalCoins(newTotal);
        } else {
            alert("Not enough coins to redeem this coupon!");
        }
    };

    return (
        <section id="coins">
            <div className="Nav-container">
                <div className="total-coins">
                    <h2>Total Coins Available: {totalCoins.toFixed(2)}</h2>
                </div>
                <Navbar />
            </div>
            <div className="coupon-container">
                {[
                    { brand: "Amazon", discount: "₹400 off", description: "Get ₹400 off on ₹3500", coins: 200 },
                    { brand: "Flipkart", discount: "₹300 off", description: "Get 10% off on ₹3000", coins: 150 },
                    { brand: "Nike", discount: "₹1000 off", description: "₹1000 off on ₹5000", coins: 300 },
                ].map((coupon, index) => (
                    <Coupon key={index} {...coupon} onRedeem={() => handleRedeem(coupon)} />
                ))}
            </div>
        </section>
    );
}

export default Coins;

import { useEffect, useState } from "react";
import { ref, onValue, update, push } from "firebase/database";
import { database } from "../firebase";

const VendorDashboard = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const dbRef = ref(database, "requests");
        const unsubscribe = onValue(dbRef, (snapshot) => {
            if (snapshot.exists()) {
                setRequests(Object.entries(snapshot.val()).map(([id, data]) => ({ id, ...data })));
            }
        });

        return () => unsubscribe();
    }, []);

    const handleApproval = (requestId) => {
        const requestRef = ref(database, `requests/${requestId}`);
        update(requestRef, { approved: true });
    };

    return (
        <section id="vendorDashboard">
            <h2>Pending Approvals</h2>
            <div className="dashboard-container">
                {requests.map((req) => (
                    !req.approved && (
                        <div key={req.id} className="request-card">
                            <pre>
                                {JSON.stringify(req, null, 2)
                                    .replace(/_/g, " ") // Replace underscores with spaces
                                    .replace(/[\[\]{}"]/g, "") // Remove brackets and double quotes
                                }
                            </pre>
                            <button className="approve-btn" onClick={() => handleApproval(req.id)}>Approve</button>
                        </div>
                    )
                ))}
            </div>
        </section>
    );
};

export default VendorDashboard;

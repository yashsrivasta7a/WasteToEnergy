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
        <div className="dashboard-container">
            <h2>Pending Approvals</h2>
            {requests.map((req) => (
                !req.approved && (
                    <div key={req.id} className="request-card">
                        <pre>{JSON.stringify(req, null, 2)}</pre>
                        <button className="approve-btn" onClick={() => handleApproval(req.id)}>Approve</button>
                    </div>
                )
            ))}
        </div>
    );
};

export default VendorDashboard;

const ClientRequest = ({ userInput }) => {
    const [response, setResponse] = useState(null);
    const [isVerified, setIsVerified] = useState(false);
    const [requestId, setRequestId] = useState(null);

    useEffect(() => {
        if (requestId) {
            const requestRef = ref(database, `requests/${requestId}`);
            const unsubscribe = onValue(requestRef, (snapshot) => {
                if (snapshot.exists() && snapshot.val().approved) {
                    setIsVerified(true);
                    setResponse(snapshot.val().response);
                }
            });
            return () => unsubscribe();
        }
    }, [requestId]);

    const sendRequest = () => {
        const newRequestRef = push(ref(database, "requests"), {
            userInput,
            approved: false,
        });
        setRequestId(newRequestRef.key);
    };

    return (
        <div className="dashboard-container">
            <button className="request-btn" onClick={sendRequest}>Send Request</button>
            {isVerified && response && (
                <div className="verified-response">
                    <h3>Verified Response:</h3>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};
export default ClientRequest;

// frontend/src/pages/TestAPIPage.tsx
import { useEffect, useState } from "react";
import { pingBackend } from "@/services/api";

const TestAPIPage = () => {
    const [backendStatus, setBackendStatus] = useState("Loading...");

    useEffect(() => {
        pingBackend().then((data) => setBackendStatus(data.status));
    }, []);

    return (
        <div className="text-center mt-20">
            <h1 className="text-3xl font-bold">Laravel API Test</h1>
            <p className="mt-4 text-xl">
                Backend says: <strong>{backendStatus}</strong>
            </p>
        </div>
    );
};

export default TestAPIPage;
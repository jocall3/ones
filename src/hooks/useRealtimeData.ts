import { useState, useEffect, useCallback } from 'react';

interface WebSocketData<T> {
    type: string;
    payload: T;
}

const useRealtimeData = <T>(dataType: string, websocketUrl: string): [T | null, boolean, Error | null, () => void] => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [socket, setSocket] = useState<WebSocket | null>(null);

    const reconnect = useCallback(() => {
        if (socket) {
            socket.close();
        }
        setLoading(true);
        setError(null);

        const newSocket = new WebSocket(websocketUrl);

        newSocket.onopen = () => {
            console.log('WebSocket connected');
            setLoading(false);
        };

        newSocket.onmessage = (event) => {
            try {
                const message: WebSocketData<T> = JSON.parse(event.data);
                if (message.type === dataType) {
                    setData(message.payload);
                }
            } catch (e: any) {
                console.error('Error parsing WebSocket message:', e);
                setError(new Error('Error parsing WebSocket message'));
            }
        };

        newSocket.onclose = (event) => {
            console.log('WebSocket disconnected:', event.code, event.reason);
            setLoading(false);
            if (event.code !== 1000) { // Don't treat normal closure as an error
                setError(new Error(`WebSocket disconnected with code ${event.code}: ${event.reason}`));
            }
            // Attempt to reconnect after a delay
            setTimeout(reconnect, 5000);
        };

        newSocket.onerror = (event) => {
            console.error('WebSocket error:', event);
            setLoading(false);
            setError(new Error('WebSocket error'));
        };

        setSocket(newSocket);

    }, [websocketUrl, dataType, setSocket, setLoading, setError, setData, socket]);

    useEffect(() => {
        reconnect();

        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, [reconnect, socket]);

    const forceReconnect = () => {
        reconnect();
    };

    return [data, loading, error, forceReconnect];
};

export default useRealtimeData;
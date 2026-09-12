import { useState, useEffect, useCallback } from 'react';
import { authStore } from '../stores/AuthStore';
import { API_URL } from '../utils/api';

export function useOrderHistory() {
    const [orders, setOrders] = useState<any[]>([]);

    const loadOrders = useCallback(() => {
        if (!authStore.username) return;
        fetch(`${API_URL}/users/${authStore.username}/orders`)
            .then(r => r.json())
            .then(data => setOrders(data.orders ?? []));
    }, [authStore.username]);

    useEffect(() => {
        loadOrders();
    }, [loadOrders]);

    return { orders, loadOrders };
}
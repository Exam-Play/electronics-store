import { useState, useEffect, useCallback } from 'react';
import { API_URL } from '../utils/api';

import type { Order } from "../utils/structures.ts";

export function useOrderHistory(username: string) {
    const [orders, setOrders] = useState<Order[]>([]);

    const loadOrders = useCallback(() => {
        if (!username) return;
        fetch(`${API_URL}/users/${username}/orders`)
            .then(r => r.json())
            .then(data => setOrders(data.orders ?? []));
    }, [username]);

    useEffect(() => {
        loadOrders();
    }, [loadOrders]);

    return { orders, loadOrders };
}
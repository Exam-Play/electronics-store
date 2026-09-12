import { useState } from 'react';

export function useCartSelection(uniqueItems: { id: number }[]) {
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

    const toggleSelect = (id: number) => {
        setSelectedIds(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    const toggleSelectAll = () => {
        setSelectedIds(prev =>
            prev.size === uniqueItems.length ? new Set() : new Set(uniqueItems.map(i => i.id))
        );
    };

    return { selectedIds, setSelectedIds, toggleSelect, toggleSelectAll };
}
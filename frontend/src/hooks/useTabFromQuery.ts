import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useTabFromQuery<T extends string>(defaultTab: T, queryValue: T) {
    const [searchParams] = useSearchParams();
    const [tab, setTab] = useState<T>(
        searchParams.get('tab') === queryValue ? queryValue : defaultTab
    );

    useEffect(() => {
        if (searchParams.get('tab') === queryValue) {
            setTab(queryValue);
        }
    }, [searchParams, queryValue]);

    return [tab, setTab] as const;
}
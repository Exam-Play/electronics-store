import { useSearchParams } from 'react-router-dom';

export function useTabFromQuery<T extends string>(defaultTab: T, queryValue: T) {
    const [searchParams, setSearchParams] = useSearchParams();

    const tab = searchParams.get('tab') === queryValue ? queryValue : defaultTab;

    const setTab = (newTab: T) => {
        setSearchParams(newTab === defaultTab ? {} : { tab: newTab });
    };

    return [tab, setTab] as const;
}
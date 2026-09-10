import { categoryKeywords, colorKeywords, type FilterState, type Product } from "./structures";

export function getPages(current: number, total: number): (number | '...')[] {
    if (total <= 5) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }
    if (current <= 3) {
        return [1, 2, 3, '...', total];
    }
    if (current >= total - 2) {
        return [1, '...', total - 2, total - 1, total];
    }
    return [1, '...', current - 1, current, current + 1, '...', total];
}

export function getMinPrice(products: Product[]): number {
    if (products.length === 0) return 0;
    return products.reduce((min, p) => p.price < min ? p.price : min, products[0].price);
}

export function getMaxPrice(products: Product[]): number {
    if (products.length === 0) return 0;
    return products.reduce((max, p) => p.price > max ? p.price : max, products[0].price);
}

export function sortProducts(sortType: string, defaultProducts: Product[]): Product[] {
    switch (sortType) {
        case "Новые":
            return [...defaultProducts].sort((a, b) => b.isNovelty === a.isNovelty ? 0 : b.isNovelty ? 1 : -1);
        case "Популярные":
            return [...defaultProducts].sort((a, b) => b.isBestseller === a.isBestseller ? 0 : b.isBestseller ? 1 : -1);
        case "Подешевле":
            return [...defaultProducts].sort((a, b) => a.price - b.price);
        case "Подороже":
            return [...defaultProducts].sort((a, b) => b.price - a.price);
        default:
            return [...defaultProducts];
    }
}

export function filterProducts(products: Product[], filters: FilterState): Product[] {
    return products.filter(p => {
        const nameLower = p.name.toLowerCase();

        if (p.price < filters.priceMin || p.price > filters.priceMax) return false;

        if (filters.categories.size > 0) {
            const match = [...filters.categories].some(cat =>
                categoryKeywords[cat]?.some(kw => nameLower.includes(kw))
            );
            if (!match) return false;
        }

        if (filters.colors.size > 0) {
            const match = [...filters.colors].some(color =>
                colorKeywords[color]?.some(kw => nameLower.includes(kw))
            );
            if (!match) return false;
        }

        return true;
    });
}
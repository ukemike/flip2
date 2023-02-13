import { useState, useEffect } from 'react';

export const useSearchAndPaginationProduct = (items: any[], itemsPerPage: number) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
    const [pages, setPages] = useState<number[]>([]);
    const [filteredItems, setFilteredItems] = useState<any[]>([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
            pageNumbers.push(i);
        }
        setPages(pageNumbers);
        setFilteredItems(items);
    }, [items, itemsPerPage]);

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem)

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleNextBtn = () => {
        setCurrentPage(currentPage + 1);
        if (currentPage + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + 5);
            setMinPageNumberLimit(minPageNumberLimit + 5);
        }
    };

    const handlePrevBtn = () => {
        setCurrentPage(currentPage - 1);
        if ((currentPage - 1) % 5 === 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - 5);
            setMinPageNumberLimit(minPageNumberLimit - 5);
        }
    };

    const handleSearch = (e: any) => {
        setSearch(e.target.value)
        setFilteredItems(items.filter((item: any) => {
            return item.product.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                item.category.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                item.product.brand.toLowerCase().includes(e.target.value.toLowerCase());
        }))
    }

    const filterByPrice = (minPrice: string, maxPrice: string) => {
        setFilteredItems(items.filter((item: any) => {
            return item.product.price >= parseInt(minPrice) && item.product.price <= parseInt(maxPrice)
        }))
    }

    const filterByDiscount = (discountPercentage: string,) => {
        setFilteredItems(items.filter((item: any) => {
            return item.product.discount.discountPercentage>= parseInt(discountPercentage)
        }))
    }

    return {
        currentItems,
        currentPage,
        pages,
        paginate,
        handleNextBtn,
        handlePrevBtn,
        handleSearch,
        search,
        maxPageNumberLimit,
        minPageNumberLimit,
        setMaxPageNumberLimit,
        setMinPageNumberLimit,
        filterByPrice,
        filterByDiscount
    };
};
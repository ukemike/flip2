import { useState, useEffect } from 'react';

export const useSearchAndPagination = (items: any[], itemsPerPage: number) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
    const [pages, setPages] = useState<number[]>([]);
    const [filteredItems, setFilteredItems] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [days, setDays] = useState('all');

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

    const handleSearchService = (e: any) => {
        setSearch(e.target.value)
        setFilteredItems(items.filter((item: any) => {
            return item.service.serviceName.toLowerCase().includes(e.target.value.toLowerCase()) ||
                item.category.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                item.service.location.toLowerCase().includes(e.target.value.toLowerCase());
        }))
    }

    const handleSearchOrder = (e: any) => {
        setSearch(e.target.value)
        setFilteredItems(items.filter((item: any) => {
            return item.product.product.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                item.status.toLowerCase().includes(e.target.value.toLowerCase())
        }))
    }

    const handleSearchJob = (e: any) => {
        setSearch(e.target.value)
        setFilteredItems(items.filter((item: any) => {
            return item.headline.toLowerCase().includes(e.target.value.toLowerCase()) ||
                item.experienceLevel.toLowerCase().includes(e.target.value.toLowerCase()) ||
                item.jobScope.toLowerCase().includes(e.target.value.toLowerCase()) ||
                item.budget.toLowerCase().includes(e.target.value.toLowerCase()) ||
                item.jobDuration.toLowerCase().includes(e.target.value.toLowerCase()) ||
                item.skillsNeeded.map((skill: any) => skill?.skill?.toLowerCase()).includes(e.target.value.toLowerCase())
        }))
    }

    const handleSearchProposal = (e: any) => {
        setSearch(e.target.value)
        setFilteredItems(items.filter((item: any) => {
            return item.paymentOption.toLowerCase().includes(e.target.value.toLowerCase()) ||
                item.paymentStatus.toLowerCase().includes(e.target.value.toLowerCase()) ||
                item.status.toLowerCase().includes(e.target.value.toLowerCase())
        }))
    }

    const handleSearchServiceRequest = (e: any) => {
        setSearch(e.target.value)
        setFilteredItems(items.filter((item: any) => {
            return item.service.service.serviceName.toLowerCase().includes(e.target.value.toLowerCase()) ||
                item.paymentStatus.toLowerCase().includes(e.target.value.toLowerCase())
        }))
    }

    const handleFilterOrderByDays = (e: any) => {
        setDays(e.target.value)
        setFilteredItems(items.filter((item: any) => {
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            const lastWeek = new Date(today);
            lastWeek.setDate(lastWeek.getDate() - 8);
            const lastMonth = new Date(today);
            lastMonth.setDate(lastMonth.getDate() - 30);
            const lastYear = new Date(today);
            lastYear.setDate(lastYear.getDate() - 365);

            const orderDate = new Date(item.orderDate);
            if (e.target.value === 'today') {
                return orderDate.toDateString() === today.toDateString();
            } else if (e.target.value === 'yesterday') {
                return orderDate.toDateString() === yesterday.toDateString();
            } else if (e.target.value === 'lastWeek') {
                return orderDate.toDateString() >= lastWeek.toDateString();
            } else if (e.target.value === 'lastMonth') {
                return orderDate.toDateString() >= lastMonth.toDateString();
            } else if (e.target.value === 'lastYear') {
                return orderDate.toDateString() >= lastYear.toDateString();
            } else {
                return item;
            }
        }))
    }

    const handleFilterTransactionByDays = (e: any) => {
        setDays(e.target.value)
        setFilteredItems(items.filter((item: any) => {
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            const lastWeek = new Date(today);
            lastWeek.setDate(lastWeek.getDate() - 8);
            const lastMonth = new Date(today);
            lastMonth.setDate(lastMonth.getDate() - 30);
            const lastYear = new Date(today);
            lastYear.setDate(lastYear.getDate() - 365);

            const transDate = new Date(item.transDate);
            if (e.target.value === 'today') {
                return transDate.toDateString() === today.toDateString();
            } else if (e.target.value === 'yesterday') {
                return transDate.toDateString() === yesterday.toDateString();
            } else if (e.target.value === 'lastWeek') {
                return transDate.toDateString() >= lastWeek.toDateString();
            } else if (e.target.value === 'lastMonth') {
                return transDate.toDateString() >= lastMonth.toDateString();
            } else if (e.target.value === 'lastYear') {
                return transDate.toDateString() >= lastYear.toDateString();
            } else {
                return item;
            }
        }))
    }

    const filterProposalsByDays = (e: any) => {
        setDays(e.target.value)
        setFilteredItems(items.filter((item: any) => {
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            const lastWeek = new Date(today);
            lastWeek.setDate(lastWeek.getDate() - 8);
            const lastMonth = new Date(today);
            lastMonth.setDate(lastMonth.getDate() - 30);
            const lastYear = new Date(today);
            lastYear.setDate(lastYear.getDate() - 365);

            const submissionDate = new Date(item.submissionDate);
            if (e.target.value === 'today') {
                return submissionDate.toDateString() === today.toDateString();
            } else if (e.target.value === 'yesterday') {
                return submissionDate.toDateString() === yesterday.toDateString();
            } else if (e.target.value === 'lastWeek') {
                return submissionDate.toDateString() >= lastWeek.toDateString();
            } else if (e.target.value === 'lastMonth') {
                return submissionDate.toDateString() >= lastMonth.toDateString();
            } else if (e.target.value === 'lastYear') {
                return submissionDate.toDateString() >= lastYear.toDateString();
            } else {
                return item;
            }
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
        handleSearchOrder,
        handleSearchService,
        handleFilterOrderByDays,
        days,
        handleFilterTransactionByDays,
        handleSearchJob,
        handleSearchProposal,
        handleSearchServiceRequest,
        filterProposalsByDays
    };
};
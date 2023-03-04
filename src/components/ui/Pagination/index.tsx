import Image from 'next/image'
import { ArrowRight1, ArrowLeft } from '../../../assets'

interface PaginationProps {
    currentPage: number;
    pages: any[];
    handlePrevBtn: () => void;
    handleNextBtn: () => void;
}

const Pagination = (props: PaginationProps) => {
    const { currentPage, pages, handlePrevBtn, handleNextBtn } = props
    return (
        <>
            <div className='flex justify-center items-center gap-4 mt-20'>
                <span className='text-base font-medium text-gray22'>Page</span>
                <div className='border-[1px] border-gray23 rounded-[10px] px-8 py-2'>{currentPage}</div>
                <span className='text-base font-medium text-gray22'>of {pages.length}</span>
                <div className='bg-primary6 flex items-center justify-between w-[90px] py-2 px-3 rounded-[10px]'>
                    <button className={`${currentPage === pages[0] ? 'cursor-auto pointer-events-none opacity-50' : ''}`}
                        onClick={handlePrevBtn}
                    >
                        <Image src={ArrowLeft} alt='' />
                    </button>
                    <button className={`${currentPage === pages[pages.length - 1] ? 'cursor-auto pointer-events-none opacity-50' : ''}`}
                        onClick={handleNextBtn}
                    >
                        <Image src={ArrowRight1} alt='' />
                    </button>
                </div>
            </div>
        </>
    )
}

export default Pagination
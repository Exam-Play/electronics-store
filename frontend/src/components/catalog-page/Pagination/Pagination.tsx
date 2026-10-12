import styles from './Pagination.module.scss'

import leftArrowIcon from '../../../assets/images/home-page/left-arrow.svg'
import rightArrowIcon from '../../../assets/images/home-page/right-arrow.svg'

interface PaginationProps {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    countOfPages: number;
    pages: (number | '...')[];
}

export function Pagination({
    currentPage,
    setCurrentPage,
    countOfPages,
    pages
}: PaginationProps) {
    return <div className={styles.pagination}>
        {currentPage > 1 && (
            <img
                src={leftArrowIcon}
                className={styles.arrow}
                alt="arrow left icon"
                onClick={() => setCurrentPage(currentPage - 1)}
            />
        )}

        {pages.map((page, i) =>
            page === '...'
            ? <div key={`dots-${i}`} className={styles.paginationItem} onClick={
                () => setCurrentPage(i === 1 ? 1 : countOfPages)
            }><span>…</span></div>
            : <div
                key={page}
                className={`${styles.paginationItem} ${currentPage === page ? styles.active : ''}`}
                onClick={() => setCurrentPage(page)}
            >
                <span>{page}</span>
            </div>
        )}

        {currentPage < countOfPages && (
            <img
                src={rightArrowIcon}
                className={styles.arrow}
                alt="arrow right icon"
                onClick={() => setCurrentPage(currentPage + 1)}
            />
        )}
    </div>
}
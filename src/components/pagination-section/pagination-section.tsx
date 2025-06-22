import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styles from './pagination-section.module.scss';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  limit: number;
};

export const PaginationSection = ({ currentPage, totalPages, limit }: PaginationProps) => {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(useLocation().search);

  const handlePageChange = (newPage: number) => {
    queryParams.set('page', String(newPage));
    queryParams.set('limit', String(limit));
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };

  return (
    <div className={styles.wrapper}>
      <Button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
        <ArrowBackIcon />
      </Button>
      <span className={styles.pagesCounter}>
        Page {currentPage} from {totalPages}
      </span>
      <Button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
        <ArrowForwardIcon />
      </Button>
    </div>
  );
};

import { useRouter } from "next/router";

import { cn } from "@/lib/utils";

import CustomPagination from "../../CustomPagination";
import { ITablePaginationProps } from "./TablePagination.interfaces";

const TablePagination: React.FC<ITablePaginationProps> = ({ paginationMetadata, className }) => {
  const router = useRouter();

  const handlePageClick = (page: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: String(page), limit: paginationMetadata.itemsPerPage },
    });
  };

  const handleNextClick = () => {
    if (paginationMetadata.hasNextPage) {
      handlePageClick(paginationMetadata.currentPage + 1);
    }
  };

  const handlePrevClick = () => {
    if (paginationMetadata.hasPreviousPage) {
      handlePageClick(paginationMetadata.currentPage - 1);
    }
  };

  return (
    <>
      {paginationMetadata.totalPages > 1 && (
        <CustomPagination
          paginationMetadata={paginationMetadata}
          onPageClick={handlePageClick}
          onNextClick={handleNextClick}
          onPrevClick={handlePrevClick}
          className={cn("mt-10 justify-start", className)}
        />
      )}
    </>
  );
};

export default TablePagination;

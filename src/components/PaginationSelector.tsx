import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

type Props = {
    page: number;
    pages: number;
    onPageChange: (page: number) => void;
}

export const PaginationSelector = ({page, pages, onPageChange}: Props) => {
    const pageNums = [];
    
    for (let i = 1; i <= pages; i++) {
        pageNums.push(i);
    }
  
    return (
        <Pagination className="text-blue-900">
            <PaginationContent>

                {page !== 1 && (
                <PaginationItem>
                <PaginationPrevious href="#" onClick={()=> onPageChange(page-1)}/>
                </PaginationItem>
                )}
                
                {pageNums.map((pageNum) => (
                    <PaginationLink 
                    href="#" 
                    onClick={() => onPageChange(pageNum)} 
                    isActive={page === pageNum}>
                        {pageNum}
                    </PaginationLink>
                ))}

                {page !== pageNums.length && (
                    <PaginationItem>
                        <PaginationNext href="#" onClick={() => onPageChange(page + 1)}/>
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    )
}

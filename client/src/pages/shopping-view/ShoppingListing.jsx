
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Filter from './Filter'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { sortOptions } from '@/config'
import { ShopppingProductTile } from './product-tile'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getProducts } from '@/store/admin/products-slice'
import { Skeleton } from '@/components/ui/skeleton'
import { getFilterProducts, setSortFilter } from '@/store/listing/prouductSlice'
import { useParams } from 'react-router-dom'


function ShoppingListing() {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const {
    products,
    isLoading,
    totalPages,
  } = useSelector((state) => state.adminProducts);
  const [sort, setSort] = useState("default");
  const params = useParams();
  

  const handleSort = (value) => {
    dispatch(setSortFilter(value));
  };

  const { categoriesFilter, sortFilter } = useSelector(state => state.products);

// DELETE your three (3) old useEffect hooks and REPLACE them with this one:
  useEffect(() => {
    // 1. Correctly format the category IDs
    const categoryIds = categoriesFilter.map(cat => cat.id);
    
    // 2. Prepare parameters for the API call
    const categoryParam = categoryIds.length > 0 ? JSON.stringify(categoryIds) : undefined;
    const sortParam = sortFilter || undefined; // Send undefined instead of ""

    // 3. Dispatch the action to get products
    dispatch(getFilterProducts({
      page: currentPage,
      limit: 10,
      category: categoryParam,
      sortedBy: sortParam
    }));

    // 4. Update the URL to match the current state (optional but good)
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    
    if (categoryParam) {
      params.set('categoriesFilter', categoryParam);
    } else {
      params.delete('categoriesFilter'); // Clean up URL
    }
    
    if (sortParam) {
      params.set('sortFilter', sortParam);
    } else {
      params.delete('sortFilter'); // Clean up URL
    }
    
    params.set('page', currentPage);
    url.search = params.toString();
    window.history.replaceState(null, '', url.href);

    const handleSort = (value) => {
      dispatch(setSortFilter(value));
    };
  }, [dispatch, currentPage, categoriesFilter, sortFilter]); // <-- This hook now runs when ANY of these change
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
      <Filter/>
    <div className='bg-background w-full rounded-lg shadow-sm'>
      <div className='p-4 border-b flex items-center justify-between'>
        <h2 className='text-lg font-extrabold'>All Products</h2>
        <div className='flex items-center gap-3'>
          <span className='text-muted-foreground'>10 Products</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <ArrowUpDown className='h-4 w-4'/>
              <span>Sort By</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent >
            <DropdownMenuRadioGroup value={sort} onValueChange={handleSort} side="end" className="w-[200px]">
              {
                    sortOptions.map(option=>(
                      <DropdownMenuRadioItem key={option.id} id={`sort-${option.id}`} className="cursor-pointer" value={option.id}>
                        {option.label}
                      </DropdownMenuRadioItem>
                    ))
              }
           </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 p-4'>
          {
            isLoading ? (
              <div >
                {Array.from({ length: 8 }).map((_, index) => (
                  <Skeleton key={index} className="h-[400px]" />
                ))}
              </div>
            ):
            products.map(product=>(
              <ShopppingProductTile key={product.id} product={product}/>
            ))
          }
      </div>
    </div>

         { totalPages > 1 && <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => handlePageChange(index + 1)}
                    isActive={currentPage === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>}
    </div>
  )
}

export default ShoppingListing
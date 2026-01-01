import { fetchCategories } from "@/store/listing/categories";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { setCategoriesFilter } from "@/store/listing/prouductSlice";

const Filter = () => {
    const { categories } = useSelector(state=>state.listing);

    const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(fetchCategories());
    },[])

  function handleCheckboxChange(id){
    dispatch(setCategoriesFilter({id}));
  }
  return (  
    <div className="bg-background rounded-lg shadow-sm">
        <div className="p-4 border-b mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
        </div>
      <div className='p-4 space-y-4'>
        {/* Product Listing Section */}
        {
          categories.map(category => (
            <Fragment key={category.id}>
              <div key={category.id} className='pb-4'>
                <h2 className='text-base font-bold'>{category.name}</h2>
                <div className='grid gap-2 mt-2'>
                  {
                    category.subCategories.map(sub => (
                      <Label key={sub.id} className='flex items-center gap-2 cursor-pointer font-medium'>
                        <Checkbox onCheckedChange={() => handleCheckboxChange(sub.id)}/>{sub.name}
                      </Label>
                    ))
                  }
                </div>
              </div>
              <Separator />
            </Fragment>
          ))
        }
      </div>
    </div>
  )
}

export default Filter
import React, { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import CommonForm from "@/components/common/form";
import ProductImageUploads from "@/components/admin-view/image-uploads";
import { useSelector, useDispatch } from "react-redux";
import {
  getProducts,
  addNewProduct,
  updateProduct,
  setCurrentEdited,
} from "../../store/admin/products-slice";
import { getAllSubCategories } from "../../store/admin/subcategory-slice";
import AdminProductTitle from "../../components/admin-view/product-title";
import { Skeleton } from "@/components/ui/skeleton";
import ProductVariants from "@/components/admin-view/product-variants";
import ProductInfo from "@/components/admin-view/product-info";

const initialFormData = {
  title: "",
  description: "",
  price: "",
  subCategoryId: "",
};

const addProductFormElements = (subCategories) => [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Sub Category",
    name: "subCategoryId",
    componentType: "select",
    options: subCategories?.map((subcategory) => ({
      id: subcategory.id,
      label: subcategory.name,
      name: subcategory.name,
      value: subcategory.id,
    })),
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
];

function AdminProduct() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFiles, setImageFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [variants, setVariants] = useState([]);
  const [infos, setInfos] = useState([]);
  const dispatch = useDispatch();
  const {
    products,
    isLoading,
    error,
    totalPages,
    currentEdited,
  } = useSelector((state) => state.adminProducts);
  const { subCategories } = useSelector((state) => state.subCategories);

  useEffect(() => {
    dispatch(getProducts({ page: currentPage, limit: 10 }));
  }, [dispatch, currentPage]);

  useEffect(() => {
    dispatch(getAllSubCategories());
  }, [dispatch]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const productData = new FormData();
      productData.append("title", formData.title);
      productData.append("description", formData.description);
      productData.append("price", formData.price);
      productData.append("subCategoryId", formData.subCategoryId);
      productData.append("variants", JSON.stringify(variants));
      productData.append("infos", JSON.stringify(infos));
      
      if (imageFiles.length > 0) {
        imageFiles.forEach((file) => {
          productData.append("images", file);
        });
      }

      if (currentEdited) {
        dispatch(
          updateProduct({ id: currentEdited.id, formData: productData })
        );
      } else {
        dispatch(addNewProduct(productData));
      }

      setOpen(false);
      setFormData(initialFormData);
      setImageFiles([]);
      dispatch(setCurrentEdited(null));
    },
    [
      formData,
      imageFiles,
      currentEdited,
      dispatch,
    ]
  );
  const handleEdit = useCallback(
    (product) => {
      dispatch(setCurrentEdited(product));
      setFormData({
        title: product.title,
        description: product.description,
        price: product.price,
        subCategoryId: product.subCategoryId,
      });
      setOpen(true);
    },
    [dispatch]
  );

  const handleAddNewProduct = () => {
    dispatch(setCurrentEdited(null));
    setFormData(initialFormData);
    setOpen(true);
  };

  return (
    <>
      <div className="mb-5 flex justify-end">
        <Button onClick={handleAddNewProduct}>Add New Product</Button>
      </div>

      {isLoading ? (
        <div className="grid px-6 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-[400px]" />
          ))}
        </div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div className="grid px-6 gap-4 md:grid-cols-3 lg:grid-cols-3">
          {products.map((item) => (
        
              <AdminProductTitle
                key={item.id}
                product={item}
                onEdit={() => handleEdit(item)}
              />
          ))}
        </div>
      )}

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

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="right" className="overflow-auto">
            <SheetHeader>
              <SheetTitle>
                {currentEdited ? "Edit Product" : "Add New Product"}
              </SheetTitle>
            </SheetHeader>

            <ProductImageUploads
              currentEdited={currentEdited}
              imageFiles={imageFiles}
              setImageFiles={setImageFiles}
            />

            <ProductVariants variants={variants} setVariants={setVariants} />

            <ProductInfo infos={infos} setInfos={setInfos} />

            <div className="py-6 px-6">
              <CommonForm
                formData={formData}
                setFormData={setFormData}
                buttonText={currentEdited ? "Update" : "Add"}
                formControls={addProductFormElements(subCategories)}
                onSubmit={onSubmit}
              />
            </div>
          </SheetContent>
        </Sheet>
    </>
  );
}
export default AdminProduct;
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import CommonForm from "@/components/common/form";
import { addProductFormElements } from "@/config";
import ProductImageUploads from "@/components/admin-view/image-uploads";

import { useSelector, useDispatch } from "react-redux";
import { addNewProduct, updateProduct } from "../../store/admin/products-slice";
import AdminProductTitle from "../../components/admin-view/product-title";

const initialFormData = {
  name: "",
  price: "",
  category: "",
  image: "",
};

function AdminProduct() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminProducts);

  function onSubmit(e) {
    e.preventDefault();

    // Create final form data
    const finalData = {
      ...formData,
      image: imageFile ? imageFile : formData.image,
    };

    // Use a different variable name for FormData
    const formDataObj = new FormData();
    formDataObj.append("name", finalData.name);
    formDataObj.append("price", finalData.price);
    formDataObj.append("category", finalData.category);
    if (imageFile) formDataObj.append("image", imageFile);

    if (currentEditedId) {
      // Edit product
      dispatch(
        updateProduct({
          id: currentEditedId,
          updatedData: formDataObj,
        })
      );
    } else {
      // Add new product
      dispatch(addNewProduct(formDataObj));
    }

    // Reset form
    setOpen(false);
    setFormData(initialFormData);
    setImageFile(null);
    setCurrentEditedId(null);
  }

  return (
    <>
      {/* Add Product Button */}
      <div className="mb-5 flex justify-end">
        <Button
          onClick={() => {
            setCurrentEditedId(null);
            setFormData(initialFormData);
            setOpen(true);
          }}
        >
          Add New Product
        </Button>
      </div>

      {/* Product List */}
      <div className="grid px-6 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList.map((item) => (
          <AdminProductTitle
            key={item.id}
            product={item}
            setCurrentEditedId={setCurrentEditedId}
            setFormData={setFormData}
            setOpen={setOpen}
          />
        ))}
      </div>

      {/* Side Sheet Form */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>

          {/* Image Upload */}
          <ProductImageUploads
            imageFile={imageFile}
            setImageFile={setImageFile}
          />

          {/* Form */}
          <div className="py-6 px-6">
            <CommonForm
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId ? "Update" : "Add"}
              formControls={addProductFormElements}
              onSubmit={onSubmit}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default AdminProduct;

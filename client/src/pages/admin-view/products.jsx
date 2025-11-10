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
import {
  addNewProduct,
  updateProduct,
} from "../../store/admin/products-slice";
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

    const finalData = {
      ...formData,
      image: imageFile ? URL.createObjectURL(imageFile) : formData.image,
    };
    const formData = new FormData();
    formData.append("name", finalData.name);
    formData.append("price", finalData.price);
    formData.append("category", finalData.category);
    formData.append("image", imageFile);

    if (currentEditedId) {
      dispatch(
        updateProduct({
          id: currentEditedId,
          updatedData: formData,
        })
      );
    } else {
      dispatch(addNewProduct(formData));
    }

    setOpen(false);
    setFormData(initialFormData);
    setImageFile(null);
    setCurrentEditedId(null);
  }

  return (
    <>
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

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>

          <ProductImageUploads
            imageFile={imageFile}
            setImageFile={setImageFile}
          />

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

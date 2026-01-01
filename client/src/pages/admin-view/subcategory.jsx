import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

import CommonForm from "@/components/common/form";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewSubCategory,
  getAllSubCategories,
  updateSubCategory,
  deleteSubCategory,
} from "../../store/admin/subcategory-slice";
import { getAllCategories } from "../../store/admin/category-slice";

import { Pencil, Trash2 } from "lucide-react";

const initialFormData = {
  name: "",
  category: "",
};

function AdminSubCategory() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [subCategoryToDelete, setSubCategoryToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { subCategories, isLoading } = useSelector(
    (state) => state.subCategories
  );
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getAllSubCategories());
    dispatch(getAllCategories());
  }, [dispatch]);

  const filteredSubCategories = subCategories.filter((subCat) =>
    subCat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const subCategoryFormElements = [
    {
      label: "SubCategory Name",
      name: "name",
      componentType: "input",
      type: "text",
      placeholder: "Enter subcategory name",
      required: true,
    },
    {
      label: "Category",
      name: "category",
      componentType: "select",
      options: categories.map((cat) => ({
        name: cat.name,
        id: cat.id,
        value: cat.id,
        label: cat.name,
      })),
      placeholder: "Select a category",
      required: true,
    },
  ];

  const onSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.category) return;

    console.log(formData.name, formData.category)
    const dataToSubmit = {
      name: formData.name,
      categoryId: formData.category,
    };

    if (currentEditedId) {
      dispatch(
        updateSubCategory({ id: currentEditedId, updatedData: dataToSubmit })
      );
    } else {
      dispatch(addNewSubCategory(dataToSubmit));
    }

    setOpen(false);
    setFormData(initialFormData);
    setCurrentEditedId(null);
  };

  const handleEdit = (subCategory) => {
    setCurrentEditedId(subCategory.id);
    setFormData({
      name: subCategory.name,
      category: subCategory.categoryId,
    });
    setOpen(true);
  };

  const handleOpenDeleteConfirm = (id) => {
    setSubCategoryToDelete(id);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (subCategoryToDelete) {
      dispatch(deleteSubCategory(subCategoryToDelete));
      setSubCategoryToDelete(null);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 px-4 gap-3">
        <h2 className="text-xl font-semibold">Manage SubCategories</h2>

        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search subcategories..."
            className="border rounded-md px-3 py-1 w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Button
            onClick={() => {
              setCurrentEditedId(null);
              setFormData(initialFormData);
              setOpen(true);
            }}
          >
            Add New SubCategory
          </Button>
        </div>
      </div>

      <div className="grid px-6 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-white border rounded-xl shadow-sm p-4 flex justify-between items-center"
            >
              <Skeleton className="h-5 w-32" />
              <div className="flex gap-2">
                <Skeleton className="h-9 w-9" />
                <Skeleton className="h-9 w-9" />
              </div>
            </div>
          ))
        ) : filteredSubCategories.length > 0 ? (
          filteredSubCategories.map((subCat) => (
            <div
              key={subCat.id}
              className="bg-white border rounded-xl shadow-sm p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium text-gray-800">{subCat.name}</h3>
                <p className="text-sm text-gray-500">
                  {
                    categories.find((cat) => cat.id === subCat.categoryId)
                      ?.name
                  }
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleEdit(subCat)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => handleOpenDeleteConfirm(subCat.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center mt-10">
            No subcategories found.
          </p>
        )}
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId ? "Edit SubCategory" : "Add New SubCategory"}
            </SheetTitle>
          </SheetHeader>

          <div className="py-6 px-6">
            <CommonForm
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId ? "Update" : "Add"}
              formControls={subCategoryFormElements}
              onSubmit={onSubmit}
            />
          </div>
        </SheetContent>
      </Sheet>

      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              subcategory.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AdminSubCategory;

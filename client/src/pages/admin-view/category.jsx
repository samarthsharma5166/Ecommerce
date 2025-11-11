import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import CommonForm from "@/components/common/form";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} from "../../store/admin/category-slice";

import { Pencil, Trash2 } from "lucide-react";

// Only category name
const categoryFormElements = [
  {
    label: "Category Name",
    name: "name",
    componentType: "input",
    type: "text",
    placeholder: "Enter category name",
    required: true,
  },
];

const initialFormData = {
  name: "",
};

function AdminCategory() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ search state

  const dispatch = useDispatch();
  const { categoryList } = useSelector((state) => state.adminCategory);

  // Load categories
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  // Filtered categories based on search
  const filteredCategories = categoryList.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Submit form
  const onSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (currentEditedId) {
      dispatch(updateCategory({ id: currentEditedId, updatedData: formData }));
    } else {
      dispatch(addNewCategory(formData));
    }

    setOpen(false);
    setFormData(initialFormData);
    setCurrentEditedId(null);
  };

  // Edit category
  const handleEdit = (category) => {
    setCurrentEditedId(category.id);
    setFormData({ name: category.name });
    setOpen(true);
  };

  // Delete category
  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this category?")) {
      dispatch(deleteCategory(id));
    }
  };

  return (
    <>
      {/* Header + Search + Add Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 px-4 gap-3">
        <h2 className="text-xl font-semibold">Manage Categories</h2>

        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          {/* Search input */}
          <input
            type="text"
            placeholder="Search categories..."
            className="border rounded-md px-3 py-1 w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Add button */}
          <Button
            onClick={() => {
              setCurrentEditedId(null);
              setFormData(initialFormData);
              setOpen(true);
            }}
          >
            Add New Category
          </Button>
        </div>
      </div>

      {/* Category Grid */}
      <div className="grid px-6 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white border rounded-xl shadow-sm p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium text-gray-800">{cat.name}</h3>
              </div>

              <div className="flex gap-2">
                <Button size="icon" variant="outline" onClick={() => handleEdit(cat)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="destructive" onClick={() => handleDelete(cat.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center mt-10">
            No categories found.
          </p>
        )}
      </div>

      {/* Sheet Form */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>{currentEditedId ? "Edit Category" : "Add New Category"}</SheetTitle>
          </SheetHeader>

          <div className="py-6 px-6">
            <CommonForm
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId ? "Update" : "Add"}
              formControls={categoryFormElements}
              onSubmit={onSubmit}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default AdminCategory;

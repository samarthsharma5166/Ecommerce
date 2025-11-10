import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../store/admin/products-slice";

function AdminProductTitle({ product, setCurrentEditedId, setFormData, setOpen }) {
  const dispatch = useDispatch();

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <img
          src={product?.image}
          className="w-full h-[300px] object-cover rounded-lg"
        />

        <CardContent>
          <h2 className="text-xl font-bold mb-2">{product?.name}</h2>

          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold text-primary">
              ₹{product?.price}
            </span>
            <span>{product?.category}</span>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between items-center">

          {/* ✅ EDIT */}
          <Button
            onClick={() => {
              setCurrentEditedId(product.id);
              setFormData(product);
              setOpen(true);
            }}
          >
            Edit
          </Button>

          {/* ✅ DELETE */}
          <Button
            variant="destructive"
            onClick={() => dispatch(deleteProduct(product.id))}
          >
            Delete
          </Button>

        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTitle;

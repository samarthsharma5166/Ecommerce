import React from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../store/admin/products-slice";
import { Link } from "react-router-dom";
// We no longer need icons for this simpler design
// import { Pencil, Trash2 } from "lucide-react"; 

function AdminProductCard({ product, onEdit }) {
  const dispatch = useDispatch();

  return (
    <>
  <div class="max-w-sm  bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <Link className="relative" href="#">
          <img class="rounded-t-lg h-[260px] w-full object-fill" src={`${import.meta.env.VITE_IMAGE_URL}/${product?.images[0]}`}
          alt={product?.title || "Product image"} />
          <Badge className={"absolute bottom-2 right-2"} variant="secondary">
          {product.subCategory?.name}
        </Badge>
      </Link>
      <div class="p-5">
          <a href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.title}</h5>
          </a>
          <p class="mb-3 font-normal line-clamp-3 text-gray-700 dark:text-gray-400">{product.description}</p>
          <div className="grid grid-cols-2 gap-4  pt-0">
            {/* ✅ EDIT BUTTON */}
            <Button
              variant="outline"
              onClick={() => onEdit(product)}
            >
            Edit
            </Button>

            {/* ✅ DELETE BUTTON */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the
                    product:{" "}
                    <strong className="text-foreground">{product?.title}</strong>.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => dispatch(deleteProduct(product.id))}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
      </div>
  </div>
    </>
  );
}

export default AdminProductCard;
import React, { useRef } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteProductImage } from "@/store/admin/products-slice";
import { useDispatch } from "react-redux";

function ProductImageUploads({ imageFiles, setImageFiles,currentEdited }) {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  function handleImageFilesChange(event) {
    const selectedFiles = Array.from(event.target.files || []);
    if (selectedFiles.length > 0) {
      setImageFiles((prev) => [...prev, ...selectedFiles]);
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files || []);
    if (droppedFiles.length > 0) {
      setImageFiles((prev) => [...prev, ...droppedFiles]);
    }
  }

  function handleRemoveImage(index) {
    const imageName = currentEdited.images[index];
    dispatch(deleteProductImage({ productId: currentEdited.id, imageName }));

    // setImageFiles(updatedFiles);

    // Reset input if no files left
    if (currentEdited.images.length === 0 && inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className="w-full px-6 max-w-md mx-auto">
      <Label className="text-lg font-semibold mb-2 block">
        Upload Images
      </Label>

      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed rounded-lg p-4"
      >
        {/* Hidden Input */}
        <Input
          id="image-upload"
          type="file"
          multiple
          className="hidden"
          ref={inputRef}
          onChange={handleImageFilesChange}
        />

        {imageFiles.length === 0 ? (
          // Default upload UI
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center h-32 cursor-pointer border border-dashed rounded-lg"
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & Drop or click to upload images</span>
          </Label>
        ) : (
          // Preview section
          <div className="grid grid-cols-3 gap-3">
            {imageFiles.map((file, index) => (
              <div
                key={index}
                className="relative border rounded-lg overflow-hidden group"
              >x
                <img
                  src={URL.createObjectURL(file)}
                  alt={`preview-${index}`}
                  className="object-cover w-full h-24"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-1 bg-white/70 rounded-full opacity-0 group-hover:opacity-100 transition"
                  
                >
                  <XIcon className="w-4 h-4 text-red-600" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {
          currentEdited && currentEdited.images && currentEdited.images.length > 0 && (
            <div className="mt-4">
              <Label className="text-md font-semibold mb-2 block">
                Existing Images
              </Label>
              <div className="grid grid-cols-3 gap-3">
                {currentEdited.images.map((img, index) => (
                  <div
                    key={index}
                    className="relative border rounded-lg overflow-hidden"
                  >
                    <Button onClick={() => handleRemoveImage(index)} className={"absolute top-1 right-1 bg-white/70 rounded-full"}>
                      <XIcon
                        className="w-1/2 h-1/2 text-red-600"
                      />
                    </Button>
                    <img
                      src={`${import.meta.env.VITE_IMAGE_URL}/${img}`}
                      alt={`existing-${index}`}
                      className="object-cover w-full h-24"
                    />
                  </div>
                ))}
              </div>
            </div>
          )
        }

        {imageFiles.length > 0 && (
          <div className="mt-3 flex justify-center">
            <Label
              htmlFor="image-upload"
              className="text-sm text-primary cursor-pointer flex items-center gap-2"
            >
              <UploadCloudIcon className="w-4 h-4" />
              Add more images
            </Label>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUploads;

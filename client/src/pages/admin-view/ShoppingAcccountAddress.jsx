import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import React, { useRef, useState } from "react";
import prisma from "../../../../server/db/db.js";

// This is the config you provided
const addressFormElements = [
    {
        label: "Street Address",
        name: "street",
        componentType: "input",
        type: "text",
        placeholder: "Enter street address",
    },
    {
        label: "Address Line 2 (Optional)",
        name: "addressLine2",
        componentType: "input",
        type: "text",
        placeholder: "Apt, suite, building, etc.",
    },
    {
        label: "City",
        name: "city",
        componentType: "input",
        type: "text",
        placeholder: "Enter city",
    },
    {
        label: "State / Province",
        name: "state",
        componentType: "input",
        type: "text",
        placeholder: "Enter state or province",
    },
    {
        label: "Postal Code / ZIP",
        name: "postalCode",
        componentType: "input",
        type: "text",
        placeholder: "Enter postal code",
    },
    {
        label: "Country",
        name: "country",
        componentType: "input",
        type: "text",
        placeholder: "Enter country",
    },
    {
        label: "Phone Number (Optional)",
        name: "phoneNumber",
        componentType: "input",
        type: "tel", // 'tel' is better for phone numbers
        placeholder: "Enter phone number for delivery",
    },
];

// --- ADD THIS ---
// Define the initial empty state for your form
const initialAddressState = {
    street: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phoneNumber: "",
};
// ---------------

const ShoppingAcccountAddress = () => {
    const [open, setOpen] = useState(false);
    const [currentEdited, setCurrentEdited] = useState(null);
    // --- ADD THIS ---
    // Create state to manage the form data
    const [formData, setFormData] = useState(initialAddressState);
    // ---------------
    // --- ADD THIS ---
    // Handle form submission
    const onSubmit = (e) => {
        e.preventDefault();
        if (currentEdited) {
            // Logic to update an existing address
            console.log("Updating address:", formData);
        } else {
            // Logic to add a new address
            console.log("Adding new address:", formData);
        }
        // Close the sheet and reset the form
        setOpen(false);
        setFormData(initialAddressState);
        setCurrentEdited(null);
    };
    // ---------------

    // --- ADD THIS ---
    // Handle opening the sheet for a new address
    const handleAddNewAddress = () => {
        setFormData(initialAddressState); // Reset form to empty
        setCurrentEdited(null); // Ensure we are not in edit mode
        setOpen(true); // Open the sheet
    };
    // ---------------

    // --- ADD THIS ---
    // Handle closing the sheet (to reset state)
    const handleSheetOpenChange = (isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
            // Reset form when sheet is closed
            setFormData(initialAddressState);
            setCurrentEdited(null);
        }
    };
    // ---------------

    return (
        <div className="container max-w-7xl mx-auto p-4">
            <div className="flex justify-end">
                {/* UPDATE THIS */}
                <Button onClick={handleAddNewAddress}>Add Address</Button>
            </div>

            {/* UPDATE THIS */}
            <Sheet open={open} onOpenChange={handleSheetOpenChange}>
                <SheetContent side="right" className="overflow-auto">
                    <SheetHeader>
                        <SheetTitle>
                            {/* Fixed the title to say "Address" */}
                            {currentEdited ? "Edit Address" : "Add New Address"}
                        </SheetTitle>
                    </SheetHeader>

                    <div className="py-6 px-6">
                        {/* --- UPDATE THIS --- */}
                        {/* Pass all the required props to your CommonForm */}
                        <CommonForm
                            formData={formData}
                            setFormData={setFormData}
                            buttonText={currentEdited ? "Update Address" : "Add Address"}
                            formControls={addressFormElements}
                            onSubmit={onSubmit}
                        />
                        {/* ----------------- */}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default ShoppingAcccountAddress;
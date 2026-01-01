import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProductVariants({ variants, setVariants }) {
    const [variant, setVariant] = useState({
        size: "",
        color: "",
        stock: 0,
    });

    function addVariant() {
        if (!variant.size && !variant.color) return;
        setVariants([...variants, variant]);
        setVariant({ size: "", color: "", stock: 0 });
    }

    function deleteVariant(index) {
        setVariants(variants.filter((_, i) => i !== index));
    }

    return (
        <div className="mt-4 px-6">
            <h3 className="text-lg font-semibold mb-2">Product Variants</h3>

            <div className="flex gap-3 mb-3">
                <Input
                    placeholder="Size (e.g. M)"
                    value={variant.size}
                    onChange={(e) => setVariant({ ...variant, size: e.target.value })}
                />
                <Input
                    placeholder="Color (e.g. Red)"
                    value={variant.color}
                    onChange={(e) => setVariant({ ...variant, color: e.target.value })}
                />
                <Input
                    type="number"
                    placeholder="Stock"
                    value={variant.stock}
                    onChange={(e) =>
                        setVariant({ ...variant, stock: parseInt(e.target.value) })
                    }
                />
                <Button onClick={addVariant}>Add</Button>
            </div>

            {/* List */}
            {variants.length > 0 && (
                <div className="space-y-2">
                    {variants.map((v, i) => (
                        <div
                            key={i}
                            className="border p-3 rounded flex justify-between items-center"
                        >
                            <span>
                                {v.size} - {v.color} (Stock: {v.stock})
                            </span>
                            <Button variant="destructive" onClick={() => deleteVariant(i)}>
                                Remove
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

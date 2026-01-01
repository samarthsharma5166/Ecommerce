import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProductInfo({ infos, setInfos }) {
    const [info, setInfo] = useState({
        key: "",
        value: "",
    });

    function addInfo() {
        if (!info.key || !info.value) return;
        setInfos([...infos, info]);
        setInfo({ key: "", value: "" });
    }

    function deleteInfo(index) {
        setInfos(infos.filter((_, i) => i !== index));
    }

    return (
        <div className="mt-6 px-6">
            <h3 className="text-lg font-semibold mb-2">Product Information</h3>

            <div className="flex gap-3 mb-3">
                <Input
                    placeholder="Label (e.g. Fabric)"
                    value={info.key}
                    onChange={(e) => setInfo({ ...info, key: e.target.value })}
                />
                <Input
                    placeholder="Value (e.g. Cotton)"
                    value={info.value}
                    onChange={(e) => setInfo({ ...info, value: e.target.value })}
                />
                <Button onClick={addInfo}>Add</Button>
            </div>

            {/* List */}
            {infos.length > 0 && (
                <div className="space-y-2">
                    {infos.map((item, i) => (
                        <div
                            key={i}
                            className="border p-3 rounded flex justify-between items-center"
                        >
                            <span>
                                {item.key}: {item.value}
                            </span>
                            <Button variant="destructive" onClick={() => deleteInfo(i)}>
                                Remove
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

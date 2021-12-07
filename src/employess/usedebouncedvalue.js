import React from "react";
import { useState } from "react";
import { useEffect } from "react/cjs/react.development";

export function useDebouncedValue(value, wait) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const id = setTimeout(() => setDebouncedValue(value), wait);
        return () => clearTimeout(id);
    }, [value])
    return debouncedValue;
}
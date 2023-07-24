'use client';

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure('79283172-98c0-4bbc-be5f-3263e26dc73f');
    }, []);

    return null;
};
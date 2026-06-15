"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, ChevronRight, ShoppingBag, ShieldCheck } from "lucide-react";
import { trackPixelEvent } from "@/components/MetaTracking";

export default function OrderSuccess() {
    const [orderId, setOrderId] = useState("DVS-");
    const [price, setPrice] = useState(0);

    useEffect(() => {
        // Mock success data extraction
        const randomId = "DVS-" + Math.floor(100000 + Math.random() * 900000);
        const randomPrice = Math.floor(450 + Math.random() * 2500);
        setOrderId(randomId);
        setPrice(randomPrice);

        // Fire Meta Purchase Event for Ad conversion optimization
        trackPixelEvent("Purchase", {
            value: randomPrice,
            currency: "INR",
            order_id: randomId,
            content_name: "SMM Engagement Package"
        });
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-slate-100 flex flex-col items-center text-center">
                <div className="text-emerald-500 mb-6 bg-emerald-50 p-4 rounded-full">
                    <CheckCircle2 size={56} />
                </div>
                
                <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Order Confirmed!</h1>
                <p className="text-slate-500 mb-6">Your campaign order has been logged. Delivery starts automatically in 5-10 minutes.</p>

                <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6 text-left">
                    <div className="flex justify-between border-b border-slate-200 pb-3 mb-3 text-sm">
                        <span className="text-slate-500">Order ID</span>
                        <strong className="text-slate-800 font-bold">{orderId}</strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-3 mb-3 text-sm">
                        <span className="text-slate-500">Amount Charged</span>
                        <strong className="text-slate-800 font-bold">₹{price.toFixed(2)}</strong>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Delivery Status</span>
                        <span className="text-emerald-600 font-bold">Processing</span>
                    </div>
                </div>

                <div className="flex flex-col gap-3 w-full">
                    <Link 
                        href="/" 
                        className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-md shadow-blue-200 flex items-center justify-center gap-2"
                    >
                        <ShoppingBag size={18} /> Continue Shopping <ChevronRight size={16} />
                    </Link>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-6 font-medium">
                    <ShieldCheck size={16} /> 256-Bit SSL Encrypted Purchase Guard
                </div>
            </div>
        </div>
    );
}

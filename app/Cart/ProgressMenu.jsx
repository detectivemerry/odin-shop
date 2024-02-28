import React from "react";

export default function ProgressMenu() {
  return (
    <div className = "flex flex-row justify-center py-8 gap-2">
      <div>
        <button className = "border-2 border-teal-900 bg-teal-700 text-white rounded p-1">Summary</button>
      </div>
      <div>
        <button className = "border-2 border-teal-400- bg-teal-200 text-white rounded p-1" disabled = "true">Sign In</button>
      </div>
      <div>
        <button className = "border-2 border-teal-400- bg-teal-200 text-white rounded p-1" disabled = "true">Address</button>
      </div>
      <div>
        <button className = "border-2 border-teal-400- bg-teal-200 text-white rounded p-1" disabled = "true">Shipping</button>
      </div>
      <div>
        <button className = "border-2 border-teal-400- bg-teal-200 text-white rounded p-1" disabled = "true">Payment</button>
      </div>
    </div>
  );
}

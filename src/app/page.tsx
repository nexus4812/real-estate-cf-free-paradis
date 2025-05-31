'use client';

import React, { useState } from 'react';

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Hello Next.js with App Router!</h1>
      <p className="text-xl mb-4">
        Count: <span className="font-semibold">{count}</span>
      </p>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        onClick={() => setCount(count + 1)}
      >
        Increase
      </button>
    </div>
  );
}

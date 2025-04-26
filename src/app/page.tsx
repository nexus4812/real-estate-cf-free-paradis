'use client';

import React, { useState } from 'react';

export default function Home() {
  const [count, setCount] = useState(0);

  return (
      <div>
        <h1>Hello Next.js with App Router!</h1>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increase</button>
      </div>
  );
}

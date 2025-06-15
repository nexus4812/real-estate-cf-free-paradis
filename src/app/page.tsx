'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        不動産投資シミュレーター
      </h1>
      <p className="text-lg text-gray-600 mb-10 text-center max-w-prose">
        このアプリケーションは、不動産投資におけるキャッシュフロー、利回り、税引前収益などを詳細に計算し、視覚的に分かりやすく表示します。
        あなたの投資計画を強力にサポートします。
      </p>
      <Link href="/simulation" passHref>
        <button className="btn-primary text-xl px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
          シミュレーションを開始する
        </button>
      </Link>
    </div>
  );
}

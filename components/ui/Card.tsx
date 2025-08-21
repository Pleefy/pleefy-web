'use client';
export function Card({ title, value }: { title: string, value: string }) {
  return (
    <div className="card text-center">
      <h4 className="text-gray-500 dark:text-gray-400">{title}</h4>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
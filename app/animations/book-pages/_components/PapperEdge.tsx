export default function PapperEdge({ color }: { color: string }) {
  return (
    <div className="flex flex-col items-center justify-around w-12 px-10 border-r border-r-gray-300">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className="w-5 h-5 rounded-full"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}

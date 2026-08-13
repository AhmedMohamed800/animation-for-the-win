import PapperEdge from "./_components/PapperEdge";

export default function BookPages() {
  return (
    <div className="flex rounded-xs bg-white text-black">
      <PapperEdge color="red" />
      <div className="pl-4  w-[80%] py-4 min-h-screen">First</div>
    </div>
  );
}

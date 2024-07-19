export default function TopBar({ title }: { title: string }) {
    return (
        <div className="bg-gray-950 text-white p-2 w-full py-4 uppercase font-bold text-center">
            { title }
        </div>
    )
}
export default function NavBarAdmin () {
    return (
        <div className="flex mt-16 mb-2">
            <a href="/admin" className="text-3xl text-gold mr-4">Dashboard</a>
            <a href="/admin/stats" className="text-3xl text-gold mr-4">Stats</a>
        </div>
    )
}
export default function AuthenticatedHero() {
    return (
        <div className="h-40 flex w-full justify-center items-center">
            <div className="h-full w-1/2 flex justify-center items-center">
                <div className="block ">
                    <div className="flex justify-center items-center">
                        <h1 className="text-3xl font-semibold mb-4">You are authenticated</h1>
                    </div>
                    
                    <div className="flex justify-center items-center">
                        <h2 className="text-lg font-normal">Log out before logging into another account</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}
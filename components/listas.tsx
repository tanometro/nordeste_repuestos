export default function Lista ({ children }: { children?: React.ReactNode }){
    return (
        <div className="flex items-center justify-center mt-12">
            <div className="bg-white shadow-xl rounded-2xl border-custom-red border-2 p-8">
                {children}
            </div>
        </div>
    )
}
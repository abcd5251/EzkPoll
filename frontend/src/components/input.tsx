const Input = () => {
    return (
        <div className="relative">
            <input type="password" className="px-4 w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <button className="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-6 h-6 text-gray-500">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                </svg>
                </button>
                <button className="ml-2 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-6 h-6 text-gray-500">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-5.7 5.3A8.7 8.7 0 0 1 3 12a8.8 8.8 0 0 1 4.3-7.7 8.5 8.5 0 0 1 5.7 5.3A8.38 8.38 0 0 1 21 11.5z"></path>
                    <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"></path>
                </svg>
                </button>
            </div>
        </div>
    )
}

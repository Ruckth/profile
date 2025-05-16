'use client'

import { useState, useEffect } from 'react'

export default function CurrentDate() {
    // Set initial state
    const [currentDateTime, setCurrentDateTime] = useState({
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
    })
    
    // Update the date and time every second
    useEffect(() => {
        // Function to update the time
        const updateDateTime = () => {
            const now = new Date()
            setCurrentDateTime({
                date: now.toLocaleDateString(),
                time: now.toLocaleTimeString()
            })
        }  
        // Set up the interval to update every second
        const timerId = setInterval(updateDateTime, 1000)
        
        // Clean up the interval when the component unmounts
        return () => clearInterval(timerId)
    }, []) // Empty dependency array means this runs once on mount
    
    return (
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-900">
            <p className="text-cyan-50 text-sm font-medium">
                Date: {currentDateTime.date} | Time: {currentDateTime.time}
            </p>
        </div>
    )
}
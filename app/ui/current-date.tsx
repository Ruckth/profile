'use client'

import { useState, useEffect } from 'react'

export default function CurrentDate() {
    // Initialize with empty strings to avoid hydration mismatch
    const [currentDateTime, setCurrentDateTime] = useState({
        date: '',
        time: ''
    })
    
    // Update the date and time on client-side only
    useEffect(() => {
        // Initial update
        updateDateTime()
        
        // Function to update the time
        function updateDateTime() {
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
                {currentDateTime.date && currentDateTime.time ? (
                    `Date: ${currentDateTime.date} | Time: ${currentDateTime.time}`
                ) : (
                    // Show loading state until client-side values are set
                    'Loading...'
                )}
            </p>
        </div>
    )
}
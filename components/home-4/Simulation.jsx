import React, { useEffect, useState } from 'react';

const SimulationDashboard = () => {
    const [width, setWidth] = useState(window.innerWidth > 1024 ? 760 : window.innerWidth - 40); // Adjust initial width based on screen size

    // Update width on window resize
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth > 1024 ? 760 : window.innerWidth - 40); // Adjust for padding
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const generateSimulationCurve = () => {
        const points = [];
        const height = 300;

        for (let x = 0; x <= width; x += 2) {
            const y = Math.sin(x * 0.01) * 50 +
                Math.sin(x * 0.02) * 30 +
                Math.sin(x * 0.005) * 70 +
                150;
            points.push({ x, y });
        }
        return points;
    };

    const points = generateSimulationCurve();
    const pathD = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;

    return (
        <div className="w-full lg:w-[860px] bg-white dark:bg-[#222220] rounded-lg p-4 dark:text-white transition-colors duration-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <h2 className="text-xl font-semibold mb-6 dark:text-white">Simulation Results</h2>

            <div className="grid grid-cols-3 gap-4 mb-2">
                <div className="bg-gray-50 dark:bg-[#2f3422] rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300">Total Iterations</p>
                    <p className="text-2xl font-bold dark:text-white">33,558</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Convergence achieved</p>
                </div>
                <div className="bg-[#b5e434] rounded-lg p-4">
                    <p className="text-sm text-[#122606] dark:text-[#122606]">Average Error Rate</p>
                    <p className="text-2xl font-bold text-[#122606] dark:text-[#122606]">0.0027%</p>
                    <p className="text-xs text-[#122606] dark:text-[#122606] mt-1">Below threshold</p>
                </div>
                <div className="bg-gray-900 dark:bg-[#ffffff] text-white rounded-lg p-4">
                    <p className="text-sm opacity-80 text-white dark:text-[#122606]">Processing Time</p>
                    <p className="text-2xl font-bold text-white dark:text-[#122606]">87.077ms</p>
                    <p className="text-xs opacity-60 text-white dark:text-[#122606] mt-1">GPU Accelerated</p>
                </div>
            </div>

            <div className="border border-dashed border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h3 className="text-lg font-semibold dark:text-white">Convergence Analysis</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">90 Time Steps</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="w-2 h-2 rounded-full bg-[#E5FE42]"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">Real-time monitoring</span>
                    </div>
                </div>

                <svg viewBox={`0 0 ${width} 400`} className="w-full">
                    <path d={pathD} fill="none" stroke="#E5FE42" strokeWidth="2" strokeLinecap="round" />
                    <path d={`${pathD} L ${points[points.length - 1].x},400 L 0,400 Z`} fill="url(#simulationGradient)" opacity="0.1" />
                    <defs>
                        <linearGradient id="simulationGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#E5FE42" />
                            <stop offset="100%" stopColor="#E5FE42" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    {points.filter((_, i) => i % 50 === 0).map((point, i) => (
                        <circle key={i} cx={point.x} cy={point.y} r="3" fill="#E5FE42" stroke="white" strokeWidth="1" />
                    ))}
                </svg>
            </div>
        </div>
    );
};

export default SimulationDashboard;

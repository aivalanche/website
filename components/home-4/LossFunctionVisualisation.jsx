import React from 'react';

const LossFunctionVisualization = () => {
    // Generate points for exponential decay curve with adjusted dimensions
    const generatePoints = () => {
        const points = [];
        const width = 408;  // adjusted width
        const height = 300; // adjusted height
        const padding = 30; // reduced padding for smaller size

        for (let x = 0; x <= width - 2 * padding; x += 2) {
            const xNorm = x / (width - 2 * padding);
            const y = Math.exp(-xNorm * 3) + 0.1;
            points.push({
                x: x + padding,
                y: height - (y * (height - 2 * padding) + padding)
            });
        }
        return points;
    };

    const points = generatePoints();
    const pathD = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;

    return (
        <div className="w-[408px] bg-white  dark:bg-[#222220] rounded-lg p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] ">
            <div className="w-full border border-dashed border-gray-200 rounded-lg ">
                <div className="flex justify-between ">
                    <div className='w-full text-center'>
                        <h3 className="text-lg font-semibold text-black-800">Loss Function</h3>
                    </div>
                </div>

                <svg viewBox="0 0 408 300" className="w-full">
                    {/* Axes */}
                    <line x1="30" y1="270" x2="378" y2="270" stroke="#bdbdbd" strokeWidth="1" />
                    <line x1="30" y1="00" x2="30" y2="270" stroke="#bdbdbd" strokeWidth="1" />

                    {/* Loss function curve */}
                    <path
                        d={pathD}
                        fill="none"
                        stroke="#dcef9b"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />

                    {/* Gradient under the curve */}
                    <path
                        d={`${pathD} L 378,270 L 30,270 Z`}
                        fill="url(#gradient)"
                        opacity="0.2"
                    />

                    {/* Gradient definition */}
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#dcef9b" />
                            <stop offset="100%" stopColor="#dcef9b" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Data points indicators */}
                    {points.filter((_, i) => i % 50 === 0).map((point, i) => (
                        <circle
                            key={i}
                            cx={point.x}
                            cy={point.y}
                            r="5"
                            fill="#dcef9b"
                        />
                    ))}
                </svg>
            </div>
        </div>
    );
};

export default LossFunctionVisualization;
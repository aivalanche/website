import { useState, useEffect } from 'react';

const ParameterEvolution = () => {
    const [data, setData] = useState([]);
    const [isHovered, setIsHovered] = useState(false);

    const cols = 40;
    const rows = 30;
    const cellWidth = 18;
    const cellHeight = 15;

    useEffect(() => {
        const newData = Array(cols).fill(0).map(() => {
            return Array(rows).fill(0).map((_, rowIndex) => {
                const ratio = rowIndex / (rows - 1);
                const blue = Math.round(255 * (1 - ratio));
                const green = Math.round(255 * ratio);
                const blueVariation = Math.min(255, Math.max(0, blue + (Math.random() * 40 - 20)));
                const greenVariation = Math.min(255, Math.max(0, green + (Math.random() * 40 - 20)));

                return {
                    color: `rgb(0,${greenVariation},${blueVariation})`
                };
            });
        });
        setData(newData);
    }, []);

    return (
        <div
            className={`
                w-300px h-408px 
                 dark:bg-[#222220]
                bg-white rounded-lg p-4 
                shadow-[0_8px_30px_rgb(0,0,0,0.12)]
            `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="w-full h-full border border-dashed border-gray-200 rounded-lg p-4">
                <svg
                    viewBox={`0 0 ${cols * cellWidth + 100} ${rows * cellHeight + 100}`}
                    className="w-full h-full"
                >
                    <rect
                        x="50"
                        y="50"
                        width={cols * cellWidth}
                        height={rows * cellHeight}
                        fill="#f8f9fa"
                    />

                    <g transform="translate(50, 50)">
                        {data.map((column, i) =>
                            column.map((cell, j) => (
                                <rect
                                    key={`${i}-${j}`}
                                    x={i * cellWidth}
                                    y={j * cellHeight}
                                    width={cellWidth - 1}
                                    height={cellHeight - 1}
                                    fill={cell.color}
                                    opacity={0.9}
                                />
                            ))
                        )}
                    </g>
                </svg>
            </div>
        </div>
    );
};

export default ParameterEvolution;
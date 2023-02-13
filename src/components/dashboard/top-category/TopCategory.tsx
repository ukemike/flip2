import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
];

const COLORS = ['#4339F2', '#FFB200', '#FF3A29',];

const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
//     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//     const x = cx + radius * Math.cos(-midAngle * RADIAN);
//     const y = cy + radius * Math.sin(-midAngle * RADIAN);

//     return (
//         <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
//             {`${(percent * 100).toFixed(0)}%`}
//         </text>
//     );
// };

const TopCategory = () => {
    return (
        <>
            <div className="card mb-4">
                <h3 className='text-xl text-black-100 font-normal'>Sales By Category</h3>

                <div className="relative h-[180px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400}>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                // label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#d89684"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div>
                    <ul className="flex items-center justify-center gap-2">
                        <li className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red4"></div>
                            <span className='text-sm text-black-100 font-medium'>Women</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-yellow2"></div>
                            <span className='text-sm text-black-100 font-medium'>Men</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue2"></div>
                            <span className='text-sm text-black-100 font-medium'>Kids</span>
                        </li>
                    </ul>
                </div>



            </div>
        </>
    )
}

export default TopCategory
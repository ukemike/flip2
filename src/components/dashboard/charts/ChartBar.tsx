import React from 'react'
import { ResponsiveContainer, PieChart, Pie } from 'recharts';

const data01 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];

const data02 = [
    { name: 'A1', value: 100 },
    { name: 'A2', value: 300 },
    { name: 'B1', value: 100 },
    { name: 'B2', value: 80 },
    { name: 'B3', value: 40 },
    { name: 'B4', value: 30 },
    { name: 'B5', value: 50 },
    { name: 'C1', value: 100 },
    { name: 'C2', value: 200 },
    { name: 'D1', value: 150 },
    { name: 'D2', value: 50 },
];

const ChartBar = () => {

    return (
        <>
            <div className="card">
                <div className="rounded-t mb-0 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <h3 className="font-semibold text-lg text-blueGray-700">
                                Traffic
                            </h3>
                        </div>
                        <div className="relative w-full max-w-full flex-grow flex-1 text-right">
                            <select className="bg-white rounded border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 shadow leading-tight focus:outline-none focus:shadow-outline">
                                <option>Today</option>
                                <option>Yesterday</option>
                                <option>Last Week</option>
                                <option>Last Month</option>
                                <option>Last Year</option>
                            </select>
                        </div>
                    </div>
                </div>
                 {/* Chart */}
                    <div className="relative h-96">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart
                                margin={{
                                    top: 0,
                                    right: 0,
                                    left: 0,
                                    bottom: 70,
                                }}
                            >
                                <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" />
                                <Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
            </div>
        </>
    )
}

export default ChartBar
import React from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const ChartLine = (props: any) => {

    const data = props.transactions.map((transaction: any) => {
        const date = new Date(transaction.transDate);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        const formattedDate = `${month} ${day} ${year}`;
        return {
            name: formattedDate,
            amount: transaction.amount,
        };
    })

    return (
        <>
            <div className="card mt-4">
                <div className="rounded-t mb-2 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <h3 className="font-medium text-xl text-black-100">
                                Transactions
                            </h3>
                        </div>
                        <div className="relative w-full max-w-full flex-grow flex-1 text-right">
                            <select className="bg-white rounded-[10px] border-2 border-primary6 
                            text-primary6 text-sm font-medium py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white">
                                <option value="all">All</option>
                                <option value="today">Today</option>
                                <option value="yesterday">Yesterday</option>
                                <option value="lastWeek">Last Week</option>
                                <option value="lastMonth">Last Month</option>
                                <option value="lastYear">Last Year</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* Chart */}
                <div className="relative h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart width={500} height={300} data={data}>
                            <XAxis dataKey="name" padding={{ left: 30, right: 30 }} tick={{ fontSize: 12, fill: '#7C7C7C' }} />

                            <YAxis tick={{ fontSize: 12, fill: '#7C7C7C' }} />
                            <Tooltip />
                            <Line type="linear" dataKey="date" stroke="#1900D5" activeDot={{ r: 8 }} />
                            <Line type="linear" dataKey="amount" stroke="#FF5252" />
                        </LineChart>
                    </ResponsiveContainer>
                    {/* empty chary */}
                    {data.length === 0 &&
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <h3 className="text-xl font-medium text-black-100">No data</h3>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default ChartLine
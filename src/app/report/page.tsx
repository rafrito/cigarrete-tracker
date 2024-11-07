"use client"

import { QueryResultRow } from "@vercel/postgres";
import { getAll } from "../actions/entries";
import { Report } from "./chart";
import EntriesList from "./entries-list";
import { useEffect, useState } from "react";


export default function ChartPage() {
    const [ data, setData ] = useState([] as QueryResultRow[])
    const formatDate = (date: string) => {
        const [year, month, day] = (new Date(date).toISOString().split('T')[0]).split('-')
        if (day === '01') {
            const monthName = new Date(+year, +month - 1, 1).toLocaleString('default', { month: 'short' })
            return `${day}/${monthName}`
        }
        return day
    }

    useEffect(() => {
        getAll().then(setData)
    }, [])

    const chartData = data.map(item => ({
        date: formatDate(item.date),
        quantity: +item.quantity,
    }));

    return (
        <div className="flex flex-col gap-4 text-center">
            <Report chartData={chartData} />
            <EntriesList entries={data} />
        </div>
    );
}

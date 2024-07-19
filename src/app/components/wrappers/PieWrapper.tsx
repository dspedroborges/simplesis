"use client";

import 'chart.js/auto';
import { Pie } from "react-chartjs-2";

export default function PieWrapper({ labels, label, data, backgroundColor, borderColor, borderWidth }: { labels: string[], label: string, data: number[], backgroundColor: string[], borderColor: string[], borderWidth: number}) {
    return (
        <Pie data={{
            labels,
            datasets: [
                {
                    label,
                    data,
                    backgroundColor,
                    borderColor,
                    borderWidth,
                },
            ],
        }} />
    )
}
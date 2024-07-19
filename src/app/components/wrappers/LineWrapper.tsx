"use client";

import 'chart.js/auto';
import { Line } from "react-chartjs-2";

export default function LineWrapper({ labels, label, data, backgroundColor, borderColor, borderWidth }: { labels: string[], label: string, data: number[], backgroundColor: string[], borderColor: string[], borderWidth: number}) {
    return (
        <Line data={{
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
import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as CHJS } from 'chart.js/auto'
import {plugin} from "../utils";

function PieChart({ data, options }) {
    return (
        <Pie
            data={data}
            options={options ? options : {}}
            plugins={[plugin]}
            style={{
                marginBottom: "1rem",
            }}
        />
    )
}

export default PieChart
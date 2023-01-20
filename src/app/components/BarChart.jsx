import React from 'react'
import { Bar, Chart } from 'react-chartjs-2'
import { Chart as CHJS } from 'chart.js/auto'
import {plugin} from "../utils";

function BarChart({ data, options }) {
    return (

        <Bar
            data={data}
            options={options ? options : {}}
            plugins={[plugin]}
        />
    )
}

export default BarChart
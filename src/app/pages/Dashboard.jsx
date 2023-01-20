import React, { useEffect, useState } from 'react'
import { Container, ToggleButton, ToggleButtonGroup, Row, Col, Table } from 'react-bootstrap'
import { api } from '../api'
import BarChart from '../components/BarChart'
import DataTable from '../components/DataTable'
import DCard from '../components/DCard'
import PieChart from '../components/PieChart'
import { formatTableData } from '../utils'

import "./pages.scss"

function Dashboard() {
	const [tableData, setTableData] = useState(null);
	const [lineData, setLineData] = useState(null);


	useEffect(() => {
		api.get("dashboard").then(res => {
			if (res.ok) {
				setTableData(formatTableData(res.data))
			}
		})

		api.get("line").then(res => {
			if (res.ok) {
				res.data.start_years.splice(0, 1)
				setstartYears(["All", ...res.data.start_years])

				setLineData({
					labels: ["None", ...res.data.start_years],
					datasets: [
						{
							label: 'Avg. Intensity',
							data: res.data.intensity,
							backgroundColor: ["#ff6384"],
							borderWidth: 0,
							borderRadius: 5,
						},
						{
							label: 'Avg. Relevance',
							data: res.data.relevance,
							backgroundColor: ["#4bc0c0"],
							borderWidth: 0,
							borderRadius: 5,
						},
						{
							label: 'Avg. Likelihood',
							data: res.data.likelihood,
							backgroundColor: ["#36a2eb"],
							borderWidth: 0,
							borderRadius: 5,
						},
					]
				});
			}
		})
	}, [])

	const pieData = {
		labels: ['Red', 'Blue', 'Yellow'],
		datasets: [{
			label: '# of Votes',
			data: [12, 19, 3],
		},
		]
	}

	const options = {
		plugins: {
			customCanvasBackgroundColor: {
				color: 'white',
			},
			title: {
				display: true,
				text: 'Avg. Quantities V/S Start Year',
			}
		}
	}

	const [allSummaryData, setAllSummaryData] = useState([
		{
			title: 'Total Records',
			value: 1000,
		},
		{
			title: 'Unique Sector',
			value: 362,
		},
		{
			title: 'Unique Source',
			value: 102,
		},
		{
			title: 'Unique Countries',
			value: 28,
		},
	])

	const summaryDataBlueprint = [
		{
			key: 'total_records',
			title: 'Total Records',
			value: 1000,
		},
		{
			key: "unique_sector",
			title: 'Unique Sector',
			value: 362,
		},
		{
			key: "unique_source",
			title: 'Unique Source',
			value: 102,
		},
		{
			key: "unique_countries",
			title: 'Unique Countries',
			value: 28,
		},
		{
			key: "avg_intensity",
			title: "Avg. Intensity",
			value: 10.5,
			min: 0.4,
			max: 70,
		},
		{
			key: "avg_relevance",
			title: "Avg. Relevance",
			value: 2,
			min: 1,
			max: 6,
		},
		{
			key: "avg_likelihood",
			title: "Avg. Likelihood",
			value: 0.5,
			min: 0,
			max: 1,
		},
	]
	const [summaryData, setSummaryData] = useState()

	const [pestleData, setpestleData] = useState(null);
	const [countryData, setCountryData] = useState(null);
	const [sectorData, setSectorData] = useState(null)

	const [pestlePieData, setPestlePieData] = useState(null);
	const [countryPieData, setCountryPieData] = useState(null);
	const [sectorPieData, setSectorPieData] = useState(null)

	const [startYears, setstartYears] = useState(["All"]);
	const [selectedYear, setSelectedYear] = useState("All");

	useEffect(() => {
		let url = selectedYear != "All" ? `year-summary?start_year=${selectedYear}` : "year-summary"
		api.get(url).then(res => {
			if (res.ok) {
				setSummaryData(
					summaryDataBlueprint.map(item => {
						console.log(item.key, res.data);
						if (item.key in res.data) {
							return {
								...item,
								value: Number(res.data[item.key].value).toFixed(2),
								min: res.data[item.key] ? res.data[item.key].min : null,
								max: res.data[item.key] ? res.data[item.key].max : null,
							}
						}
						return item;
					})
				)
			}
		})

		let url2 = selectedYear != "All" ? `pie?start_year=${selectedYear}` : "pie"
		api.get(url2).then(res => {
			if (res.ok) {
				setpestleData(res.data['source']);
				setCountryData(res.data['country']);
				setSectorData(res.data['sector']);

				let pestle_label = [];
				let pestle_data = [];
				let country_label = [];
				let country_data = [];
				let sector_label = [];
				let sector_data = [];
				
				Object.keys(res.data['pestle']).forEach(item => {
					pestle_label.push(item);
					pestle_data.push(res.data['pestle'][item]);
				})

				Object.keys(res.data['country']).forEach(item => {
					country_label.push(item);
					country_data.push(res.data['country'][item]);
				})

				Object.keys(res.data['sector']).forEach(item => {
					sector_label.push(item);
					sector_data.push(res.data['sector'][item]);
				})

				setPestlePieData({
					labels: pestle_label,
					datasets: [
						{
							label: 'Source',
							data: pestle_data,
						}
					]
				})
				setCountryPieData({
					labels: country_label,
					datasets: [
						{
							label: 'Country',
							data: country_data,
						}
					]
				})
				setSectorPieData({
					labels: sector_label,
					datasets: [
						{
							label: 'Sector',
							data: sector_data,
						}
					]
				})
			}
		}
		)

	}, [selectedYear])


	const handleChangeStartYear = (val) => {
		if (val != selectedYear) {
			setSelectedYear(val);
		}
	}

	return (
		<div className='dashboard-container'>
			<Container fluid='xl'>
				<hr />
				<h2 className='section-heading'>Data Summary</h2>
				<div className='section-wrapper'>
					<div>
						<p>
							This is a summary of all the data that has been collected so far.
						</p>
						<Row>
							{allSummaryData && allSummaryData.map((item, index) => (
								<Col key={index} xl={3} md={4} lg={3} sm={4} xs={6}>
									<DCard bg_color='#4747A1' title={item.title} value={item.value} />
								</Col>
							))}
						</Row>
						<br />
						<p>This graph shows avg. quantites i.e. <b>Intensity, Relecance and Likelihood</b> per <b>start year.</b></p>
						<Row>
							<Col>
								{lineData && <BarChart data={lineData} options={options} />}
							</Col>
						</Row>
					</div>
				</div>
				<hr />

				<div>
					<h2 className='section-heading'>Analytics</h2>
					<div className='section-wrapper'>
						<p>
							This section contains analytics for data grouped per start year.
						</p>
						<br />
						<h4><b>Start Year</b></h4>
						<p><b>Select Start Year for data in this section.</b></p>
						<p>Currently Selected: <b>{selectedYear}</b></p>
						<ToggleButtonGroup className='start-year-selector' type="radio" name="start-years" value={selectedYear} onChange={handleChangeStartYear}>
							{
								startYears && startYears.map((item, index) => (
								
									<ToggleButton key={index} id={`tbg-btn-${index + 1}`} value={item}>
										{item}
									</ToggleButton>
								
								))
							}
						</ToggleButtonGroup>
						<br />

						<br />
						<h4><b>Summary For Start Year {selectedYear}</b></h4>
						<Row>
							{summaryData && summaryData.map((item, index) => (
								<Col key={index} xl={3} md={4} lg={3} sm={4} xs={6}>
									<DCard bg_color='#F3797E' title={item.title} value={item.value} max={item?.max} min={item?.min} />
								</Col>
							))}
						</Row>

						<br />
						<h4><b>Sector</b></h4>
						<p>This section contains data for total records per sectors for {selectedYear}.</p>
						<Row>
							<Col style={{
								height: 'calc(90vh - 100px)',
								overflowY: 'scroll',
							}}>
								<Table striped hover bordered>
									<thead>
										<tr>
											<th>Sector</th>
											<th>Records</th>
										</tr>
									</thead>
									<tbody>
										{sectorData && Object.keys(sectorData).map((item, index) => (
											<tr key={index}>
												<td>{item}</td>
												<td>{sectorData[item]}</td>
											</tr>
										))}
									</tbody>
								</Table>
							</Col>
							<Col xl={6} md={6} lg={6} sm={6} xs={12} style={{
								height: 'calc(90vh - 100px)',
							}}>
								{sectorPieData && <PieChart data={sectorPieData} options={options} />}
							</Col>
						</Row>

						<br />
						<h4><b>Countries</b></h4>
						<p>This section contains data for total records per country for {selectedYear}.</p>
						<Row>
							<Col style={{
								height: 'calc(90vh - 100px)',
								overflowY: 'scroll',
							}}>
								<Table striped hover bordered>
									<thead>
										<tr>
											<th>Country</th>
											<th>Records</th>
										</tr>
									</thead>
									<tbody>
										{countryData && Object.keys(countryData).map((item, index) => (
											<tr key={index}>
												<td>{item}</td>
												<td>{countryData[item]}</td>
											</tr>
										))}
									</tbody>
								</Table>
							</Col>
							<Col sm={6} xs={12} style={{
								height: 'calc(90vh - 100px)',
								overflowY: 'scroll',
							}}>
								{countryPieData && <PieChart data={countryPieData} options={options} />}
							</Col>
						</Row>

						<br />
						<h4><b>Pestle</b></h4>
						<p>This section contains data for total records per pestle for {selectedYear}.</p>
						<Row>
							<Col style={{
								height: 'calc(90vh - 100px)',
								overflowY: 'scroll',
							}}>
								<Table striped hover bordered>
									<thead>
										<tr>
											<th>Pestle</th>
											<th>Records</th>
										</tr>
									</thead>
									<tbody>
										{pestleData && Object.keys(pestleData).map((item, index) => (
											<tr key={index}>
												<td>{item}</td>
												<td>{pestleData[item]}</td>
											</tr>
										))}
									</tbody>
								</Table>
							</Col>
							<Col sm={6} xs={12} style={{
								height: 'calc(90vh - 100px)',
								overflowY: 'scroll',
							}}>
								{pestlePieData && <PieChart data={pestlePieData} options={options} />}
							</Col>
						</Row>
					</div>
					<br />
					<hr />
					<br />

					<div>
						<h2 className='section-heading' >
							Table containing records
						</h2>
						<br />
						<div className="section-wrapper">
							{tableData && <DataTable data={tableData} />}
						</div>
					</div>
				</div>
			</Container>
		</div>
	)
}

export default Dashboard
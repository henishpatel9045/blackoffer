import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Col, Dropdown, DropdownButton, Row, Table } from 'react-bootstrap'
import { fieldToLabel } from '../utils'
import "./components.scss"

function DataTable({ data }) {
	const [fieldOrder, setFieldOrder] = useState([])
	const [filteredData, setFilteredData] = useState(data)
	const [topicFilter, setTopicFilter] = useState("")

	// Filters
	const [filters, setFilters] = useState({
		end_year: false,
		topic: false,
		start_year: false,
		sector: false,
		source: false,
		country: false,
	})

	useEffect(() => {
		setFilteredData(data.filter((item) => {
			let result = true
			Object.keys(filters).forEach((key) => {
				if (key == "topic" && filters[key] != false) {
					if (!item[key] || item[key]?.indexOf(filters[key]) == -1) {
						result = false
					}
				}
				else if (filters[key] != false && item[key] !== filters[key]) {
					result = false
				}
			})
			return result
		}))
	}, [filters])

	useEffect(() => {
		if (data.length > 0) {
			setFieldOrder(Object.keys(data[0]))
		}
		setFilteredData(data)
	}, [data])


	const handleTopicFilter = () => {
		if (topicFilter != filters.topic) {
			setFilters({ ...filters, topic: topicFilter ? topicFilter : false })
		}
	}

	const handleStartYear = (year) => {
		if (!filters.start_year && year == "All") {
			null
		}
		else if (year != filters.start_year) {
			setFilters({ ...filters, start_year: year != "All" ? year : false })
		}
	}
	const handleEndYear = (year) => {
		if (!filters.end_year && year == "All") {
			null
		}
		else if (year != filters.end_year) {
			setFilters({ ...filters, end_year: year != "All" ? year : false })
		}
	}

	const handleSector = (sector) => {
		if (!filters.sector && sector == "All") {
			null
		}
		else if (sector != filters.sector) {
			setFilters({ ...filters, sector: sector != "All" ? sector : false })
		}
	}

	const handleCountry = (country) => {
		if (!filters.country && country == "All") {
			null
		}
		else if (country != filters.country) {
			setFilters({ ...filters, country: country != "All" ? country : false })
		}
	}

	const handlePestle = (pestle) => {
		if (!filters.pestle && pestle == "All") {
			null
		}
		else if (pestle != filters.pestle) {
			setFilters({ ...filters, pestle: pestle != "All" ? pestle : false })
		}
	}

	const handleRegion = (region) => {
		if (!filters.region && region == "All") {
			null
		}
		else if (region != filters.region) {
			setFilters({ ...filters, region: region != "All" ? region : false })
		}
	}


	const filtersData = [
		{
			title: "Start Year",
			key: "start_year",
			handle: handleStartYear,
			options: ["All", "2017", "2018", "2019", "2020"]
		},
		{
			title: "End Year",
			key: "end_year",
			handle: handleEndYear,
			options: ["All", "2017", "2018", "2019", "2020"]
		},
		{
			title: "Sector",
			key: "sector",
			handle: handleSector,
			options: ["All", "Agriculture", "Automotive", "Banking", "Chemicals", "Construction", "Consumer Goods", "Education", "Energy", "Entertainment", "Financial Services", "Food & Beverage", "Healthcare", "Hospitality", "Information Technology", "Insurance", "Manufacturing", "Media", "Mining", "Oil & Gas", "Pharmaceuticals", "Real Estate", "Retail", "Telecommunications", "Transportation", "Utilities"]
		},
		{
			title: "Country",
			key: "country",
			handle: handleCountry,
			options: ["All", "Australia", "Austria", "Belgium", "Brazil", "Canada", "China", "Denmark", "Finland", "France", "Germany", "Greece", "Hong Kong", "India", "Indonesia", "Ireland", "Italy", "Japan", "Malaysia", "Mexico", "Netherlands", "New Zealand", "Norway", "Philippines", "Poland", "Portugal", "Russia", "Singapore", "South Africa", "South Korea", "Spain", "Sweden", "Switzerland", "Taiwan", "Thailand", "Turkey", "United Kingdom", "United States"]
		},
		{
			title: "Pestle",
			key: "pestle",
			handle: handlePestle,
			options: ["All", "Political", "Economic", "Social", "Technological", "Legal", "Environmental"]
		},
		{
			title: "Region",
			key: "region",
			handle: handleRegion,
			options: ["All", "Africa", "Asia", "Australia", "Europe", "North America", "South America"]
		}
	]

	return (
		<div>
			<p><b>Filters</b></p>
			<div className='filters'>
				<span className='topic-filter'>
					<label for="topic-search" class="form-label"><b>Topic</b></label>
					<span>
						<input type="text" class="form-control" onChange={(e) => setTopicFilter(e.target.value)} id="topic-search" placeholder="Search by topic..."></input>
						<Button onClick={handleTopicFilter}>Search</Button>
					</span>
				</span>
				<span>
					<Row>
						{filtersData.map((filter) => (
							<Col xl={4} sm={6} xs={12}>
								<div className='options-container'>
									<label htmlFor={`${filter.key}_filter`}>{filter.title}</label>
									<DropdownButton
										id={`${filter.key}_filter`}
										as={ButtonGroup}
										key={"Primary"}
										variant={"primary"}
										title={filters[filter.key] ? filters[filter.key] : "All"}
										onClick={e => filter.handle(e.target.innerText)}
									>
										{filter.options.map((option) => (
											<Dropdown.Item eventKey={option}>{option}</Dropdown.Item>
										))}
									</DropdownButton>
								</div>
							</Col>
						))}

					</Row>

				</span>
			</div>
			<div className='data-table'>
				<h4>Total Records: {filteredData.length}</h4>
				<Table striped hover bordered responsive='xs' >
					<thead className='table-head'>
						<tr>
							{fieldOrder.map((field) => (
								<th>{fieldToLabel(field)}</th>
							))}
						</tr>
					</thead>
					<tbody className='table-body'>
						{filteredData.length > 0 && filteredData.map((item, index) => (
							<tr key={index}>
								{fieldOrder.map((field) => (
									<td>{item[field]}</td>
								))}
							</tr>
						))}
					</tbody>
				</Table>
				{filteredData.length == 0 && <p>No records found</p>}
			</div>
		</div>
	)
}

export default DataTable
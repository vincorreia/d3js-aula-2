/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

d3.csv("../data/revenues.csv")
    .then(data => {
        data.forEach(d => {
            d.revenue = Number(d.revenue)
            d.profit = Number(d.profit)
        })
        
        const MARGIN = {LEFT: 100, RIGHT: 20, TOP: 20, BOTTOM: 100}
        const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT
        const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM

        const svg = d3.selectAll("#chart-area")
        .append("svg")
            .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
            .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
        
        
        const g = svg.append("g")
            .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

        const x = d3.scaleBand()
            .domain(data.map(d => d.month))
            .range([0, WIDTH])
            .paddingInner(0.1)
            .paddingOuter(0.1)

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.revenue)])
            .range([HEIGHT, 0])
        
        const xAxisCall = d3.axisBottom(x)

        g.append("g")
            .attr("class", "x axis")
            .attr("transform", `translate(0, ${HEIGHT})`)
            .call(xAxisCall)

        const yAxisCall = d3.axisLeft(y)

        g.append("g")
            .attr("class", "y axis")
            .call(yAxisCall)
            .selectAll("text")
        
        // X Label
        g.append("text")
            .attr("class", "x axis-label")
            .attr("font-size", "20")
            .text("Month")
            .attr("x", (WIDTH / 2) - 30)
            .attr("y", HEIGHT + 60)

        // Y Label
        g.append("text")
            .attr("class", "y axis-label")
            .attr("transform", "rotate(-90)")
            .attr("font-size", "20")
            .text("Revenue ($)")
            .attr("x", - (HEIGHT / 2 + 60))
            .attr("y", - 60)
        const rects = g.selectAll("rect")
            .data(data)

        rects.enter().append("rect")
            .attr("x", d => x(d.month))
            .attr("y", d => y(d.revenue))
            .attr("height", d => HEIGHT - y(d.revenue))
            .attr("width", x.bandwidth)
            .attr("fill", "grey")
})
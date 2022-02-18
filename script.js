document.getElementById("cryptoSubmit").addEventListener("click", function (event) {
    event.preventDefault();

    // Form to get crypto name
    var x = document.getElementById("cryptoSelect").selectedIndex;
    var y = document.getElementById("cryptoSelect").options;
    const value = y[x].text;
    const value_capitalized = value.charAt(0).toUpperCase() + value.slice(1);
    console.log(value_capitalized);

    // Get stock data
    let url = "https://api.coincap.io/v2/candles?exchange=binance&interval=d1&baseId=" + value + "&quoteId=bitcoin";
    anychart.data.loadJsonFile(url,
        function (data) {
            // Clean data div
            document.getElementById("data").innerHTML = "";

            // Create data table on loaded data
            var dataTable = anychart.data.table("period");
            dataTable.addData(data["data"]);
            console.log(data["data"]);

            // Map loaded data for the ohlc series
            var mapping = dataTable.mapAs({ open: "open", high: "high", low: "low", close: "close" });

            // Create stock chart
            var chart = anychart.stock();

            // Create first plot on the chart
            var plot = chart.plot(0);

            // Create ohlc series
            plot
                .ohlc()
                .data(mapping)
                .name(value_capitalized);

            // Set grid settings
            plot
                .yGrid(true)
                .xGrid(true)
                .yMinorGrid(true)
                .xMinorGrid(true);

            // Create scroller series with mapped data
            chart.scroller().area(dataTable.mapAs({ value: 4 }));

            // Change background
            chart.background().fill('#2d3e50');

            // Set y axis label
            plot.yAxis().labels().format('{%Value} BTC');

            // Set the title of the chart
            chart.title(value_capitalized + ' Prices');

            // Set container id for the chart
            chart.container('data');

            // Initiate chart drawing
            chart.draw();
        });
});
async function getData() {
    const response = await fetch('Data.csv'); // Update to match the file path in the folder structure
    const data = await response.text();

    const xLabels = []; // x-axis labels (groups)
    const yValues = []; // y-axis values (percent increase)

    // Split the CSV data into individual rows and skip the header row
    const table = data.split('\n').slice(1);

    table.forEach(row => {
        const columns = row.split(','); // Split row into columns
        const group = columns[0]; // Group name
        const percentIncrease = parseFloat(columns[1]); // Percent increase

        if (!isNaN(percentIncrease)) {
            xLabels.push(group);
            yValues.push(percentIncrease);
        }
    });

    return { xLabels, yValues }; // Return multiple values as an object
}

async function createChart() {
    const data = await getData(); // Wait for getData() to send
    const barChart = document.getElementById('lineChart');

    const myChart = new Chart(barChart, {
        type: 'bar',
        data: {
            labels: data.xLabels, // x-axis labels
            datasets: [
                {
                    data: data.yValues,
                    backgroundColor: [
                        'rgba(255, 99, 132)',
                        'rgba(54, 162, 235)',
                        'rgba(255, 206, 86)',
                        'rgba(75, 192, 192)',
                        'rgba(153, 102, 255)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Groups',
                        font: {
                            size: 14,
                        },
                    },
                    grid: {
                        color: '#6c767e',
                    },
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Percent Increase (%)',
                        font: {
                            size: 14,
                        },
                    },
                    grid: {
                        color: '#6c767e',
                    },
                },
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Percent of Length Increased Days 1-15 for Each Group',
                    font: {
                        size: 24,
                    },
                    padding: {
                        top: 10,
                        bottom: 30,
                    },
                },
                legend: {
                    display: false,
                },
            },
        },
    });
}

createChart();

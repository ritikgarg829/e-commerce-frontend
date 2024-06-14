import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const Barchart = ({ horizontal = false, data_1 = [], data_2 = [], title_1, title_2, bgColor_1, bgColor_2, label = months }) => {
    const options = {
        responsive: true,
        indexAxis: horizontal ? "y" : "x",
        plugins: {
            legend: {
                display: true, // Set to true to display legend
                position: 'top',
            },
            title: {
                display: true, // Set to true to display title
                text: 'Bar Chart', // Title text
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: false
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    };

    const data = {
        labels: label,
        datasets: [
            {
                label: title_1,
                data: data_1,
                backgroundColor: bgColor_1,
            },
            {
                label: title_2,
                data: data_2,
                backgroundColor: bgColor_2,
            },
        ],
    };

    return (
        <Bar options={options} data={data} />
    );
};



export const GenderChart = ({
    labels,
    data,
    backgroundColor,
    cutout,
    legends = true,
    offset,
}) => {
    const doughnutData = {
        labels: labels,
        datasets: [
            {
                data: data,
                backgroundColor: backgroundColor,
                borderWidth: 0,
                offset: offset,
            },
        ],
    };

    const doughnutOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: legends,
                position: "bottom",
                labels: {
                    padding: 40,
                },
            },
        },
        cutout: cutout,
    };

    return <Doughnut data={doughnutData} options={doughnutOptions} />;
};


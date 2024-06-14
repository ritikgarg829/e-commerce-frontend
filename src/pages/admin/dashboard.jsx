import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/admin/adminSidebar';
import Table from "../../components/admin/table";
import { BsSearch } from 'react-icons/bs';
import { FaRegBell } from 'react-icons/fa6';
import { BiMaleFemale } from 'react-icons/bi';
import { HiTrendingUp, HiTrendingDown } from 'react-icons/hi';
import { Barchart, GenderChart } from "../../components/admin/chart";
import "../../Styles/admin/dashboard.css";
import { useStateQuery } from "../../redux/api/dashboard-api";
import { useSelector } from 'react-redux';
import { toast } from "react-hot-toast";
import { getLastMonths } from "../../utils/features.js"


const { last6Months: months } = getLastMonths();

const Dashboard = () => {
    const { user } = useSelector((state) => state.userReducer);
    const { data, isLoading, isError } = useStateQuery(user?._id);

    const [stats, setStats] = useState({});

    useEffect(() => {
        if (data) {
            setStats(data.stats);
        }
    }, [data]);

    useEffect(() => {
        if (isError) {
            toast.error(isError.data.message);
        }
    }, [isError]);

    const getWidgetCircleStyle = (percentage, color) => {
        return {
            background: percentage > 9999 ? 'white' : `conic-gradient(
                ${color} ${Math.abs(percentage) / 100 * 360}deg, rgba(255,255,255,0) 0
            )`
        };
    };

    return (
        <div className="adminContainer">
            <AdminSidebar />
            <main className="dashboard">
                <div className="bar">
                    <BsSearch className="mt-4" />
                    <input type="text" placeholder='Search for data , users' />
                    <FaRegBell className="mt-4" />
                    <img
                        className="h-9 w-9 rounded-full mt-1 ml-4"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="" />
                </div>

                <section className="widgetContainer">
                    <article className="widget">
                        <div className="widget-info">
                            <p>Revenue</p>
                            <h4>${stats.counts?.Revenue ?? 0}</h4>
                            {stats.changePercentage?.revenue > 0 ? (
                                <span className="text-green-500"><HiTrendingUp /> +{stats.changePercentage?.revenue}%</span>
                            ) : (
                                <span className="text-red-500"><HiTrendingDown /> {stats.changePercentage?.revenue}%</span>
                            )}
                        </div>
                        <div className="widgetCircle"
                            style={getWidgetCircleStyle(stats.changePercentage?.revenue, 'blue')}>
                            {stats.changePercentage?.revenue > 0 ? (
                                <span className="text-green-500">{stats.changePercentage?.revenue}%</span>
                            ) : (
                                <span className="text-red-500">{stats.changePercentage?.revenue}%</span>
                            )}
                        </div>
                    </article>

                    <article className="widget">
                        <div className="widget-info">
                            <p>Users</p>
                            <h4>{stats.counts?.user ?? 0}</h4>
                            {stats.changePercentage?.user > 0 ? (
                                <span className="text-green-500"><HiTrendingUp /> +{stats.changePercentage?.user}%</span>
                            ) : (
                                <span className="text-red-500"><HiTrendingDown /> {stats.changePercentage?.user}%</span>
                            )}
                        </div>
                        <div className="widgetCircle"
                            style={getWidgetCircleStyle(stats.changePercentage?.user, 'yellow')}>
                            {stats.changePercentage?.user > 0 ? (
                                <span className="text-green-500">{stats.changePercentage?.user}%</span>
                            ) : (
                                <span className="text-red-500">{stats.changePercentage?.user}%</span>
                            )}
                        </div>
                    </article>

                    <article className="widget">
                        <div className="widget-info">
                            <p>Transactions</p>
                            <h4>{stats.counts?.order ?? 0}</h4>
                            {stats.changePercentage?.order > 0 ? (
                                <span className="text-green-500"><HiTrendingUp /> +{stats.changePercentage?.order}%</span>
                            ) : (
                                <span className="text-red-500"><HiTrendingDown /> {stats.changePercentage?.order}%</span>
                            )}
                        </div>
                        <div className="widgetCircle"
                            style={getWidgetCircleStyle(stats.changePercentage?.order, 'purple')}>
                            {stats.changePercentage?.order > 0 ? (
                                <span className="text-green-500">{stats.changePercentage?.order}%</span>
                            ) : (
                                <span className="text-red-500">{stats.changePercentage?.order}%</span>
                            )}
                        </div>
                    </article>

                    <article className="widget">
                        <div className="widget-info">
                            <p>Products</p>
                            <h4>{stats.counts?.product ?? 0}</h4>
                            {stats.changePercentage?.product > 0 ? (
                                <span className="text-green-500"><HiTrendingUp /> +{stats.changePercentage?.product}%</span>
                            ) : (
                                <span className="text-red-500"><HiTrendingDown /> {stats.changePercentage?.product}%</span>
                            )}
                        </div>
                        <div className="widgetCircle"
                            style={getWidgetCircleStyle(stats.changePercentage?.product, 'aqua')}>
                            {stats.changePercentage?.product > 0 ? (
                                <span className="text-green-500">{stats.changePercentage?.product}%</span>
                            ) : (
                                <span className="text-red-500">{stats.changePercentage?.product}%</span>
                            )}
                        </div>
                    </article>
                </section>

                <section className="graphContainer">
                    <div className="revenue-chart">
                        <h2 className="chart-heading">Revenue & Transaction</h2>
                        <Barchart
                            data_1={stats.chart?.orderMonthRevenue ?? []}
                            data_2={stats.chart?.orderMonthCounts ?? []}
                            title_1="Revenue"
                            title_2="Transaction"
                            bgColor_1="rgb(0,115,255)"
                            bgColor_2="rgba(53,162,235,0.8)"
                            label={months}
                        />
                    </div>

                    <div className="dashboard-categories">
                        <h2 className="inventory-heading">Inventory</h2>
                        <div className="category">
                            {stats.categoryCount && stats.categoryCount.map((i, index) => {
                                const [heading, value] = Object.entries(i)[0];
                                return (
                                    <div className="category-item" key={index}>
                                        <h5>{heading}</h5>
                                        <div className="categorystyle1">
                                            <div className="categorystyle2" style={{ backgroundColor: `hsl(${value * 4},${value}%,50%)`, width: `${value}%` }}>
                                            </div>
                                        </div>
                                        <span className="category-span">{value}%</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className="transectionContainer">
                    <div className="gender-chart">
                        <h2 className="gender-heading">Gender Ratio</h2>
                        <GenderChart
                            labels={["Female", "Male"]}
                            data={[stats.genderRatio?.female ?? 0, stats.genderRatio?.male ?? 0]}
                            backgroundColor={["hsl(340,82%,56%)", "rgba(53,162,235,0.8)"]}
                            cutout={90}
                        />
                        <p className="p"><BiMaleFemale /></p>
                    </div>

                    <div className="transection-chart">
                        <h2 className="transection-heading">Transaction</h2>
                        <Table orders={stats.modifiedLatestTransaction} />
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Dashboard;

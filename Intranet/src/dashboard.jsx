import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { BsGraphUp, BsCheck2Square, BsPeople, BsCreditCard2Back, BsCurrencyDollar } from 'react-icons/bs';
import { AiOutlineDollar, AiOutlineFileSync, AiOutlineHistory, AiOutlineProfile, AiOutlineIssuesClose, AiOutlineClockCircle } from "react-icons/ai";
import './Dashboard.css';
import CustomerOrderCard from './CustomerOrderCard';


const COLORS = ['#FFCC00', '#FF9900', '#CCC', '#3366FF'];

const barData = [
    { monthIndex: 0, name: 'Jan', value: 120000 },
    { monthIndex: 1, name: 'Feb', value: 90000 },
    { monthIndex: 2, name: 'Mar', value: 160000 },
    { monthIndex: 3, name: 'Apr', value: 145000 },
    { monthIndex: 4, name: 'May', value: 190000 },
    { monthIndex: 5, name: 'Jun', value: 180000 },
    { monthIndex: 6, name: 'Jul', value: 210000 },
    { monthIndex: 7, name: 'Aug', value: 240000 },
    { monthIndex: 8, name: 'Sep', value: 280000 },
    { monthIndex: 9, name: 'Oct', value: 300000 },
    { monthIndex: 10, name: 'Nov', value: 320000 },
    { monthIndex: 11, name: 'Dec', value: 350000 },
];



const addTrendData = (data) => {
    const n = data.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;

    data.forEach(point => {
        const x = point.monthIndex;
        sumX += x;
        sumY += point.value;
        sumXY += x * point.value;
        sumX2 += x * x;
    });

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    return data.map(point => ({
        ...point,
        trend: slope * point.monthIndex + intercept,
    }));
};

const combinedData = addTrendData(barData);

const Dashboard = () => {
    return (
        <Container fluid className="p-4 dashboard-container">
            <Row className="g-3 row_1">
                {/* Górne kafelki */}
                <Col className="col1" md={6}>
                    <Row className="row1_1">
                        <Col md={6}>
                            <Card className="stat-card card-tile shadow-sm p-3">
                                <Card.Body className="d-flex justify-content-between align-items-start mb-2">
                                    <div className="stat-icon bg-opacity-10">
                                        <AiOutlineDollar  className="fas fa-chart-line fs-1"/>
                                    </div>
                                    <span className="badge bg-success">+3%</span>
                                </Card.Body>
                                <h5 className="mb-1">Revenue</h5>
                                <h3 className="mb-3">$84,245</h3>
                                <div className="progress mb-2">
                                    <div className="progress-bar bg-success" role="progressbar" style={{ width: "84%" }} ></div>
                                </div>
                                <small className="text-muted">Monthly target: $100,000</small>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card className="stat-card card-tile shadow-sm p-3">
                                <Card.Body className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="stat-icon bg-opacity-10">
                                        <AiOutlineFileSync className="fas fa-chart-line fs-1" />
                                    </div>
                                    <span className="badge bg-danger">-5.5%</span>
                                </Card.Body>
                                <h5 className="mb-1">Orders Today</h5>
                                <h3 className="mb-3">145</h3>
                                <div className="progress mb-2">
                                    <div className="progress-bar bg-danger" role="progressbar" style={{ width: "23%" }} ></div>
                                </div>
                                <small className="text-muted">Daily target: 550</small>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="row1_2">
                        <Col md={6}>
                            <Card className="stat-card card-tile shadow-sm p-3">
                                <Card.Body className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="stat-icon bg-opacity-10">
                                        <AiOutlineHistory className="fas fa-chart-line  fs-1" />
                                    </div>
                                    <span className="badge bg-success">+4.5%</span>
                                </Card.Body>
                                <h5 className="mb-1">Month Total</h5>
                                <h3 className="mb-3">25,091</h3>
                                <div className="progress mb-2">
                                    <div className="progress-bar bg-success" role="progressbar" style={{ width: "75%" }} ></div>
                                </div>
                                <small className="text-muted"> (to previous month)</small>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card className="stat-card card-tile shadow-sm p-3">
                                <Card.Body className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="stat-icon bg-opacity-10">
                                        <AiOutlineProfile className="fas fa-chart-line fs-1" />
                                    </div>
                                    <span className="badge bg-success">+17.5%</span>
                                </Card.Body>
                                <h5 className="mb-1">Orders in Progress</h5>
                                <h3 className="mb-3">25,091</h3>
                                <div className="progress mb-2">
                                    <div className="progress-bar bg-success" role="progressbar" style={{ width: "75%" }} ></div>
                                </div>
                                <small className="text-muted"> (to previous month)</small>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col md={6} className="col2 h-100">
                    <CustomerOrderCard/>

                </Col>
            </Row>

            {/* Wiersz: wykres słupkowy */}
            <Row className="g-3 mt-3">
                <Col>
                    <Card id="card-chart" className="shadow-sm">
                        <Card.Body>
                            <Card.Title>Sales Dynamics</Card.Title>
                            <ResponsiveContainer width="100%" height={420}>
                                <BarChart data={combinedData}>
                                    <XAxis
                                        dataKey="monthIndex"
                                        tickFormatter={(value) => barData[value]?.name}
                                    />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#4e73df" radius={[15, 15, 0, 0]} />
                                    <Line
                                        type="monotone"
                                        dataKey="trend"
                                        stroke="#ff7300"
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Wiersz: Dane Płatności, Users, Subskrypcje, Zysk*/}
            <Row>
                <Col lg={3}>
                    <Card className="stat-card card-tile shadow-sm p-3 card-danger">
                        <Card.Body className="d-flex justify-content-between align-items-center mb-3">
                            <div className="stat-icon bg-opacity-10">
                                <AiOutlineIssuesClose className="fas  text-danger fa-chart-line  fs-1" />
                            </div>
                          
                        </Card.Body>
                        <h5 className="mb-1">Missing Products</h5>
                        <h3 className="mb-3">14</h3>
                        
                        <small className="text-muted">Orders with missing stock items</small>
                    </Card>
                </Col>
                <Col lg={3}>
                    <Card className="stat-card card-tile shadow-sm p-3">
                        <Card.Body className="d-flex justify-content-between align-items-center mb-3">
                            <div className="stat-icon bg-opacity-10">
                                <AiOutlineClockCircle className="fas fa-chart-line fs-1" />
                            </div>

                        </Card.Body>
                        <h5 className="mb-1">Average Order Time</h5>
                        <h3 className="mb-3">42 hours</h3>

                        <small className="text-muted">Order processing time</small>
                    </Card>
                </Col>
                <Col lg={3}>
                    <Card className="stat-card card-tile shadow-sm p-3">
                        <Card.Body className="d-flex justify-content-between align-items-center mb-3">
                            <div className="stat-icon bg-opacity-10">
                                <AiOutlineDollar className="fas fa-chart-line  fs-1" />
                            </div>

                        </Card.Body>
                        <h5 className="mb-1">Average basket value</h5>
                        <h3 className="mb-3">1351 $</h3>

                        <small className="text-muted">Calculated for the last week or month</small>
                    </Card>
                </Col>
                <Col lg={3} className="h-100">
                    <Card className="stat-card card-tile shadow-sm p-3">
                        <Card.Body>
                            <h6 className="mb-2 fw-semibold">Target vs Sales</h6>
                            <div className="d-flex justify-content-between align-items-center mb-1">
                                <span className="text-muted">Sales</span>
                                <span className="fw-bold">70%</span>
                            </div>
                            <div className="progress" style={{ height: '8px' }}>
                                <div
                                    className="progress-bar bg-warning"
                                    role="progressbar"
                                    style={{ width: '70%' }}
                                    aria-valuenow="70"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                ></div>
                            </div>
                            <small className="text-muted mt-2 d-block">Target: 100%</small>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

          
        </Container>
    );
};

export default Dashboard;

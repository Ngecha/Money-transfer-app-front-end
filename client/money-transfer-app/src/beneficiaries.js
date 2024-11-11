import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Beneficiaries = () => {
    const beneficiaries = [
        {
            dateAdded: '03/07/2021',
            name: 'Keza Ana',
            role: 'Project Manager',
            email: 'keza@co.ke',
            lastTrans: '02 (05–06 Jul)',
        },
        {
            dateAdded: '01/07/2022',
            name: 'Hirwa Patrick',
            role: 'Software',
            email: 'hirwa@gmail.co',
            lastTrans: '01 (06 Jul)',
        },
    ];

    return (
        <div className="container mt-4">
            {/* Navbar */}
            <nav className="navbar navbar-light bg-light">
                <a className="navbar-brand font-weight-bold" href="#">Visapay</a>
                <ul className="nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#">Home</a>
                    </li>
                    <li className="nav-item">
                            <Link className="nav-link text-secondary" to="/wallet">Wallet</Link>
                        </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="#">Beneficiaries</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Transactions</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Profile</a>
                    </li>
                </ul>
            </nav>

            {/* Action Buttons */}
            <div className="text-center mt-3">
                <button className="btn btn-primary m-4">Add beneficiaries</button>
                <button className="btn btn-primary m-4">remove beneficiaries</button>
            </div>

            {/* Beneficiaries Table */}
            <div className="mt-4 p-3 bg-white shadow-sm rounded">
                <table className="table table-borderless">
                    <thead>
                        <tr>
                            <th scope="col">DATE OF ADDITION</th>
                            <th scope="col">NAME</th>
                            <th scope="col">EMAIL</th>
                            <th scope="col">LAST TRANSACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {beneficiaries.map((beneficiary, index) => (
                            <tr key={index}>
                                <td>{beneficiary.dateAdded}</td>
                                <td>
                                    <strong>{beneficiary.name}</strong>
                                    <br />
                                    <small>{beneficiary.role}</small>
                                </td>
                                <td>{beneficiary.email}</td>
                                <td>{beneficiary.lastTrans}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Beneficiaries;

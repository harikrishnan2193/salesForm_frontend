import React, { useEffect, useState } from 'react';
import { getAllSaleshApi, editSalesApi, deleteSalesApi, allBranchApi } from '../services/allApi';

function SalesSubmit() {
    const [salesDetils, setSalesDetils] = useState([]);
    const [editData, setEditData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [branches, setBranches] = useState([]);

    const getAllSales = async () => {
        const result = await getAllSaleshApi();
        console.log(result.data);
        setSalesDetils(result.data);
    };

    const getAllBranches = async () => {
        const result = await allBranchApi();
        if (result.status === 200) {
            setBranches(result.data);
        }
    };

    useEffect(() => {
        getAllSales();
        getAllBranches();
    }, []);

    const handleEdit = (data) => {
        setEditData(data);
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await editSalesApi(editData._id, editData);
        if (result.status === 200) {
            alert('Details updated successfully');
            setShowModal(false);
            getAllSales();
        } else {
            alert(result.response.data);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            try {
                const result = await deleteSalesApi(id);
                if (result.status === 200) {
                    alert('Sales record deleted successfully');
                    getAllSales();
                } else {
                    alert(result.response.data);
                }
            } catch (error) {
                alert('Error deleting sales record');
            }
        }
    };

    return (
        <>
            <div className="min-h-screen flex justify-center items-center bg-gray-800">
                <div className="max-w-4xl w-full mx-auto p-4 sm:p-6 bg-gray-700 shadow-lg text-white rounded-lg relative z-10 capitalize">
                    <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">Sales Records</h1>
                    <ul className="space-y-4">
                        {salesDetils?.length > 0 ?
                            salesDetils.map((data) => (
                                <li key={data._id} className="flex flex-col items-center justify-center p-3 bg-gray-600 rounded-lg shadow-lg border border-gray-500 text-center">
                                    <div className='w-full'>
                                        <span className="block text-xl font-semibold">{data.salesperson}</span>
                                        <span className="text-sm block text-gray-300 mt-1">{data.amount}</span>
                                        <span className="text-sm block text-gray-300">{data.description}</span>
                                        <span className="block text-sm font-raleway">{data.branch}</span>
                                    </div>
                                    <div className="flex gap-3 mt-4">
                                        <button
                                            className="px-4 py-2 bg-blue-500 text-sm font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all"
                                            onClick={() => handleEdit(data)}
                                        >
                                            <i className="fa-solid fa-pen-to-square"></i> Edit
                                        </button>
                                        <button
                                            className="px-3 py-2 bg-red-500 text-sm font-semibold rounded-lg shadow-md hover:bg-red-600 transition-all"
                                            onClick={() => handleDelete(data._id)}
                                        >
                                            <i className="fa-solid fa-trash"></i> Delete
                                        </button>
                                    </div>
                                </li>
                            ))
                            : <p>No sales details available</p>
                        }
                    </ul>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-white max-w-md w-full">
                        <h2 className="text-xl font-semibold mb-4">Edit Sales Record</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input type="text" value={editData.salesperson} onChange={(e) => setEditData({ ...editData, salesperson: e.target.value })} className="w-full p-2 rounded bg-gray-600 text-white" required />
                            <input type="number" value={editData.amount} onChange={(e) => setEditData({ ...editData, amount: e.target.value })} className="w-full p-2 rounded bg-gray-600 text-white" required />
                            <textarea value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} className="w-full p-2 rounded bg-gray-600 text-white"></textarea>
                            <select value={editData.branch} onChange={(e) => setEditData({ ...editData, branch: e.target.value })} className="w-full p-2 rounded bg-gray-600 text-white">
                                {branches.map((branch) => (
                                    <option key={branch.branchId} value={branch.branchName}>{branch.branchName}</option>
                                ))}
                            </select>
                            <div className="flex justify-between">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-red-500 rounded-lg">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-500 rounded-lg">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default SalesSubmit;

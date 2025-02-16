import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { allBranchApi, salesDetilsApi } from '../services/allApi';

function SalesAdd() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        salesperson: '',
        branch: '',
        amount: '',
        description: ''
    });
    const [errors, setErrors] = useState({});
    const [branches, setBranches] = useState([])


    const getAllBranches = async () => {
        const result = await allBranchApi()
        if (result.status === 200) {
            setBranches(result.data)
        }
    }

    const validate = () => {
        let tempErrors = {};
        if (!formData.salesperson.trim()) {
            tempErrors.salesperson = 'Salesperson Name is required';
        } else if (!/^[a-zA-Z ]+$/.test(formData.salesperson.trim())) {
            tempErrors.salesperson = 'Only letters are allowed';
        }
        if (formData.branch === '') tempErrors.branch = 'Please select a branch';
        if (!formData.amount || isNaN(formData.amount) || formData.amount < 1) tempErrors.amount = 'Please enter a ammout';
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            const { salesperson, branch, amount, description } = formData
            if (!salesperson || !branch || !amount) {
                alert('Please fill all the required fileds')
            }
            else {
                const result = await salesDetilsApi(formData)
                if (result.status === 200) {
                    console.log(result.data);
                    alert('Detils added successfully')
                    setFormData({ salesperson: '', branch: '', amount: '', description: '' })
                    navigate('/salesresult')
                }
                else {
                    alert(result.response.data);
                }
            }
        }
    };

    useEffect(() => {
        getAllBranches()
    }, [])

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-800">
            <form onSubmit={handleSubmit} className="bg-gray-700 p-6 rounded-lg shadow-lg w-full max-w-md text-white space-y-4">
                <h2 className="text-xl font-semibold text-center">Add Sales Record</h2>

                <div>
                    <label className="block mb-1">Salesperson Name</label>
                    <input type="text" name="salesperson" value={formData.salesperson} onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-600 text-white focus:ring-2 focus:ring-blue-500" />
                    {errors.salesperson && <p className="text-red-500 text-sm">{errors.salesperson}</p>}
                </div>

                <div>
                    <label className="block mb-1">Branch</label>
                    <select name="branch" value={formData.branch} onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-600 text-white focus:ring-2 focus:ring-blue-500">
                        <option value="">Select an option</option>
                        {branches.map((branch) => (
                            <option key={branch.branchId} value={branch.branchName}>{branch.branchName}</option>
                        ))}
                    </select>
                    {errors.branch && <p className="text-red-500 text-sm">{errors.branch}</p>}
                </div>

                <div>
                    <label className="block mb-1">Amount</label>
                    <input type="number" name="amount" value={formData.amount} onChange={handleChange} min="1"
                        className="w-full p-2 rounded bg-gray-600 text-white focus:ring-2 focus:ring-blue-500" />
                    {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
                </div>

                <div>
                    <label className="block mb-1">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-600 text-white focus:ring-2 focus:ring-blue-500"></textarea>
                </div>

                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 p-2 rounded-lg text-white font-semibold">Submit</button>
            </form>
        </div>
    );
}

export default SalesAdd;
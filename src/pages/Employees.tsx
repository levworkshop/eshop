import { useEffect, useState } from "react";

interface IEmployee {
    employeeID: number;
    firstName: string;
    lastName: string;
    streetAddress: string;
    city: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
}

function Employees() {
    const [employees, setEmployees] = useState<Array<IEmployee>>([]);

    useEffect(() => {
        fetch('http://localhost/eshop/api/get_employees.php')
            .then(res => res.json())
            .then(json => {
                setEmployees(json);
            })
    }, []);

    function statusFormat(value: boolean): string {
        return !value ? '' : 'Active';
    }


    return (
        <>
            <div className="bg-dark p-4">
                <button className="btn btn-primary">
                    Add Employee
                </button>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Employee ID</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Address</th>
                        <th scope="col">Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(emp =>
                            <tr
                                key={emp.employeeID}
                            >
                                <td>
                                    <a href="">
                                        {emp.employeeID}
                                    </a>
                                </td>
                                <td>{emp.firstName}</td>
                                <td>{emp.lastName}</td>
                                <td>{emp.streetAddress}, {emp.city}</td>
                                <td>{statusFormat(emp.status)}</td>
                                <td>
                                    <button
                                        className="btn btn-default"
                                    >
                                        <i className="bi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    );
}

export default Employees;
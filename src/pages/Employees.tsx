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
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Employee ID</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Address</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(emp =>
                            <tr
                                key={emp.employeeID}
                            >
                                <td>{emp.employeeID}</td>
                                <td>{emp.firstName}</td>
                                <td>{emp.lastName}</td>
                                <td>{emp.streetAddress}, {emp.city}</td>
                                <td>{statusFormat(emp.status)}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    );
}

export default Employees;
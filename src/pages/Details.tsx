import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IEmployee } from "./Employees";

enum eCity {
    ramatGan = 'Ramat Gan',
    telAviv = 'Tel-Aviv',
    petachTikva = 'Petach Tikva'
}

function Details() {
    const { id } = useParams();
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [city, setCity] = useState<eCity>(eCity.telAviv);
    const [status, setStatus] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const cities = Object.values(eCity); // [ramatGan, telAviv, petachTikva]

    useEffect(() => {
        if (!id) return;

        fetch(`http://localhost/eshop/api/get_emp.php?id=${id}`)
            .then(res => res.json())
            .then(json => {
                if (json.length === 0) return;
                const data: IEmployee = json[0];

                setFirstName(data.firstName);
                setLastName(data.lastName);
                setAddress(data.streetAddress);
                handleCityChange(data.city);
                setStatus(data.status);

                //setCityList(json)
            })
    }, []);

    function handleCityChange(value: string) {
        const city = value as eCity;
        setCity(city);
    }

    return (
        <div className="p-4">
            <div className="mb-3">
                <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                    placeholder="First Name"
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                    placeholder="Last Name"
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    placeholder="Address"
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <select
                    value={city}
                    onChange={(e) => handleCityChange(e.target.value)}
                    className="form-control"
                >
                    {
                        cities.map(city =>
                            <option
                                key={city}
                            >
                                {city}
                            </option>
                        )
                    }
                </select>
            </div>
            <div className="form-check mt-2">
                <input
                    type="checkbox"
                    className="ceckbox"
                    checked={status}
                    onChange={(e) => setStatus(!status)}
                />
                <label className="form-check-label">
                    Active
                </label>
            </div>

            <div className="mt-3">
                <button className="btn btn-primary me-3">
                    Submit
                </button>

                <Link
                    to="/"
                    className="btn btn-secondary"
                >
                    Cancel
                </Link>
            </div>

            {
                error &&
                <div className="text-danger">
                    {error}
                </div>
            }

        </div>
    );
}

export default Details;
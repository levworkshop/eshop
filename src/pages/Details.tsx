import Joi from "joi";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IEmployee, resJson } from "./Employees";

enum eCity {
    ramatGan = 'Ramat Gan',
    telAviv = 'Tel-Aviv',
    petachTikva = 'Petach Tikva'
}

function Details() {
    const navigate = useNavigate();
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

    function handleSubmit() {
        const schema = Joi.object().keys({
            firstName: Joi.string().required().min(2),
            lastName: Joi.string().required().min(2),
            address: Joi.string().required().min(3),
        })

        const { error, value } = schema.validate({
            firstName,
            lastName,
            address
        })

        if (error) {
            setError(error.message);
            return;
        }

        if (!id) { // add
            value.city = city;
            value.status = status;

            fetch('http://localhost/eshop/api/add_emp.php', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(value)
            })
                .then(res => res.json())
                .then((json: resJson) => {
                    if (json.ok === "true") {
                        navigate('/');
                    }
                    else {
                        setError(`Failed to add employee`);
                    }
                })
        }
        else { // update

        }
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
                <button
                    onClick={handleSubmit}
                    className="btn btn-primary me-3"
                >
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
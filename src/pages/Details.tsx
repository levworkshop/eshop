import { Link, useParams } from "react-router-dom";

function Details() {
    const { id } = useParams();

    return (
        <div className="p-4">
            <div className="mb-3">
                <input
                    type="text"
                    placeholder="First Name"
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <input
                    type="text"
                    placeholder="Last Name"
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <input
                    type="text"
                    placeholder="Address"
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <select
                    className="form-control"
                >
                    <option>Tel-Aviv</option>
                    <option>Ramat Gan</option>
                </select>
            </div>
            <div className="form-check mt-2">
                <input
                    type="checkbox"
                    className="ceckbox"
                    checked
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

            <div className="text-danger"></div>
        </div>
    );
}

export default Details;
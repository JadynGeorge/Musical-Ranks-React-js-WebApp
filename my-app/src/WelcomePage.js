import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-bootstrap";



export default function WelcomePage() {
	return (
		<div className="bg-dark text-white min-vh-100">
			<div className="container bg-dark w-75 rounded-lg py-5 px-5">
				<div className="text-center font-weight-bold h2 pb-3 text-white">
					Musical Ranks
				</div>

				<section className="row">
					<div className="col-lg text-center pb-0 pb-2">
						<button className="btn btn-primary px-3 py-2">
							<Link to="/login" className="font-weight-bold text-xl text-dark">LOG IN </Link>
						</button>
					</div>
					<div className="col-lg text-center pt-0 pt-2">
						<button className="btn btn-success px-3 py-2">
							<Link to="/signup" className="font-weight-bold text-xl text-dark">CREATE ACCOUNT</Link>
						</button>
					</div>
				</section>
			</div>
		</div>
	);
}
import {useDispatch, useSelector} from "react-redux";
import {getLocationResults, setSearch} from "../redux/slices/locationSlice";
import {debounce} from "lodash";
import LocationResult from "./LocationResult";

export default function LocationPrompt() {
	const dispatch = useDispatch();

	const searchResults = useSelector(state => state.location.results);

	const sendRequest = (e) => {
		let req = e.target.value.trim();

		if (req !== "") {
			dispatch(setSearch(req));
			debouncedGetLocationResults();
		}
	}

	const debouncedGetLocationResults = debounce(() => dispatch(getLocationResults()), 200);

	return (
		<div>
			<h1>Please, set your location</h1>
			<input type={"text"} onChange={e => sendRequest(e)}/>
			<div>
				{
					searchResults.length !== 0 ?
						searchResults.map(x => <LocationResult name={x.name} region={x.region} country={x.country} key={x.id}/>) :
						<p>type smth</p>
				}
			</div>
		</div>
	)
}
import {css} from "@emotion/css";
import {useDispatch} from "react-redux";
import {setLocation} from "../redux/slices/locationSlice";

export default function LocationResult(props) {
	const dispatch = useDispatch();

	const setLocationResult = () => {
		dispatch(setLocation(props.name));
		localStorage.setItem("location", props.name);
		window.location.reload();
	}

	return (
		<div
			onClick={() => setLocationResult()}
			className={css`
          padding: 10px;
          cursor: pointer;
			`}
		>
			{props.name}, {props.region}, {props.country}
		</div>
	)
}
import {css} from "@emotion/css";

import WeatherApp from "./components/WeatherApp";
import {useEffect, useState} from "react";
import {fetchCurrentWeather} from "./redux/slices/currentWeatherSlice";
import {useDispatch, useSelector} from "react-redux";
import {fetchHourlyWeather} from "./redux/slices/hourlyWeatherSlice";
import LocationPrompt from "./components/LocationPrompt";
import {setLocation} from "./redux/slices/locationSlice";
import {fetchForecast} from "./redux/slices/forecastSlice";

function App() {
	const dispatch = useDispatch();

	const isLoading = useSelector(state => state.forecast.loading);
	
	const [isLocationPromptVisible, setLocationPromptVisible] = useState(false);

	useEffect(() => {
		async function setupApp() {
			let location = window.localStorage.getItem("location");

			if (!location) {
				setLocationPromptVisible(true);
			} else {
				dispatch(setLocation(location));
				dispatch(fetchCurrentWeather());
				dispatch(fetchHourlyWeather());
				dispatch(fetchForecast());
			}
		}

		setupApp()
	}, [dispatch]);

	return (
		<div className={css`
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
		`}>
			{
				isLocationPromptVisible ?
					(<LocationPrompt/>) :
					isLoading ?
						(<p>loading</p>) :
						(<WeatherApp/>)
			}
		</div>
	);
}

export default App;

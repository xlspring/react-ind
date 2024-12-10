import {configureStore} from "@reduxjs/toolkit";

import currentWeatherSlice from "./slices/currentWeatherSlice";
import hourlyWeatherSlice from "./slices/hourlyWeatherSlice";
import locationSlice from "./slices/locationSlice";
import forecastSlice from "./slices/forecastSlice";

const store = configureStore({
	reducer: {
		current: currentWeatherSlice,
		hourly: hourlyWeatherSlice,
		location: locationSlice,
		forecast: forecastSlice
	}
});

export default store;
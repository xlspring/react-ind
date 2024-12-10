import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

export const fetchForecast = createAsyncThunk(
	"forecast/fetch",
	async (_, {getState}) => {
		const state = getState();
		const res = await fetch(`${process.env.REACT_APP_WEATHER_BASE_URL}/forecast.json?${
			new URLSearchParams({
				q: state.location.location,
				days: 7,
				key: process.env.REACT_APP_WEATHER_API_KEY
			})
		}`);
		console.log(res.status);
		return await res.json();
	}
)

const forecastSlice = createSlice({
	name: "forecast",
	initialState: {
		data: {},
		loading: true,
		error: null
	},
	reducers: {
		setWeather(state, action) {
			state.data = action.payload;
		}
	},
	extraReducers: builder => {
		builder.addCase(fetchForecast.pending, state => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(fetchForecast.fulfilled, (state, action) => {
			state.loading = false;
			state.error = null;
			state.data = action.payload;
		});
		builder.addCase(fetchForecast.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})
	}
});

// export const {setWeather} = hourlyWeatherSlice.actions;

export default forecastSlice.reducer;
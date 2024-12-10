import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

export const fetchHourlyWeather = createAsyncThunk(
	"hourlyWeather/fetch",
	async (_, {getState}) => {
		const state = getState();
		const date = new Date();
		const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
		const res = await fetch(`${process.env.REACT_APP_WEATHER_BASE_URL}/history.json?${
			new URLSearchParams({
				q: state.location.location,
				dt: formattedDate,
				key: process.env.REACT_APP_WEATHER_API_KEY
			})
		}`);
		console.log(res.status);
		return await res.json();
	}
)

const hourlyWeatherSlice = createSlice({
	name: "hourlyWeather",
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
		builder.addCase(fetchHourlyWeather.pending, state => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(fetchHourlyWeather.fulfilled, (state, action) => {
			state.loading = false;
			state.error = null;
			state.data = action.payload;
		});
		builder.addCase(fetchHourlyWeather.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})
	}
});

export const {setWeather} = hourlyWeatherSlice.actions;

export default hourlyWeatherSlice.reducer;
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

export const fetchCurrentWeather = createAsyncThunk(
	"currentWeather/fetch",
	async (_, {getState}) => {
		const state = getState();
		console.log(process.env);
		const res = await fetch(`${process.env.REACT_APP_WEATHER_BASE_URL}/current.json?${
			new URLSearchParams({
				q: state.location.location,
				key: process.env.REACT_APP_WEATHER_API_KEY
			})
		}`);
		console.log(res.status);
		return await res.json();
	}
)

const currentWeatherSlice = createSlice({
	name: "currentWeather",
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
		builder.addCase(fetchCurrentWeather.pending, state => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(fetchCurrentWeather.fulfilled, (state, action) => {
			state.loading = false;
			state.error = null;
			state.data = action.payload;
		});
		builder.addCase(fetchCurrentWeather.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})
	}
});

export const {setWeather} = currentWeatherSlice.actions;

export default currentWeatherSlice.reducer;
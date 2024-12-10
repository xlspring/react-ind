import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const getLocationResults = createAsyncThunk(
	"location/getLocationResults",
	async (_, thunkAPI) => {
		const state = thunkAPI.getState();

		const res = await fetch(`${process.env.REACT_APP_WEATHER_BASE_URL}/search.json?${
			new URLSearchParams({
				q: state.location.search,
				key: process.env.REACT_APP_WEATHER_API_KEY
			})
		}`);

		console.log(res);

		return await res.json();
	}
);

const locationSlice = createSlice({
	name: "location",
	initialState: {
		location: "",
		search: "",
		results: []
	},
	reducers: {
		setLocation(state, action) {
			state.location = action.payload;
		},
		setSearch(state, action) {
			state.search = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getLocationResults.fulfilled, (state, action) => {
			state.results = action.payload;
		});
	}
});

export const {setLocation, setSearch} = locationSlice.actions;
export default locationSlice.reducer;
import {css} from "@emotion/css";
import WeatherHeader from "./WeatherHeader";
import {HourlyWeather, HourlyWeatherItem} from "./HourlyWeather";
import {DailyWeather, DailyWeatherItem} from "./DailyWeather";
import {useSelector} from "react-redux";

export default function WeatherApp() {
	const currentWeather = useSelector(state => state.current);
	const hourlyWeather = useSelector(state => state.hourly.data);
	const forecast = useSelector(state => state.forecast.data);

	return (
		<div>
			<div className={css`
          border: 1px red solid;
          border-radius: 20px;
          height: 95vh;
          width: 400px;
          overflow: clip;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
			`}>
				{
					<WeatherHeader
						location={currentWeather.data.location.name}
						temp={currentWeather.data.current.temp_c}
						condition={currentWeather.data.current.condition.text}
					/>
				}
				<DailyWeather>
					{
						forecast.forecast.forecastday.map(x => <DailyWeatherItem
							day={x.date}
							icon={x.day.condition.icon}
							mintemp={x.day.mintemp_c}
							maxtemp={x.day.maxtemp_c}
						/>)
					}
				</DailyWeather>
				<HourlyWeather>
					{hourlyWeather.forecast.forecastday[0].hour.map(x => <HourlyWeatherItem
						time={new Date(x.time).toLocaleString("ua-UA", {
							hour: "2-digit",
							minute: "2-digit",
							hourCycle: "h24"
						})} temperature={x.temp_c} icon={x.condition.icon}/>)}
				</HourlyWeather>
			</div>
		</div>
	);
}


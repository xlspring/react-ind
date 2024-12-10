import {css} from "@emotion/css";

export function DailyWeather(props) {
	return (
		<div className={css`
        border: 1px red solid;
        border-radius: 10px;
        padding: 10px;
        overflow-y: scroll;

		`}>
			{props.children}
		</div>
	)
}

export function DailyWeatherItem(props) {
	return (
		<div className={css`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        padding: 10px 20px;
		`}>
			<p>{props.day}</p>
			<img src={props.icon} alt={""} className={css`
          height: 30px;
          width: 30px;
			`}/>
			<div className={css`
          display: flex;
          gap: 10px;
          align-items: center;

          p {
              min-width: 30px;
              text-align: center;
          }
			`}>
				<p>{props.mintemp}°</p>
				<meter value={props.maxtemp}
							 max="10"
							 min="-10">
				</meter>
				<p>{props.maxtemp}°</p>
			</div>
		</div>
	)
}
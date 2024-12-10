import {css} from "@emotion/css";

export function HourlyWeather(props) {
	return (
		<div className={css`
        border: 1px red solid;
        border-radius: 10px;
        padding: 20px;
        display: flex;
        gap: 40px;
        height: fit-content;

        overflow-x: scroll;
        overflow-y: hidden;
		`}>
			{props.children}
		</div>
	);
}

export function HourlyWeatherItem(props) {
	return (
		<div className={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
		`}>
			<span className={css`
          font-variant: small-caps;
			`}>{props.time}</span>
			<img src={props.icon} alt={""} className={css`
          height: 30px;
          width: 30px;
			`}/>
			<h3>{props.temperature}°</h3>
		</div>
	)
}
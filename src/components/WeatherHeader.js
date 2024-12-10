import {css} from "@emotion/css";

export default function WeatherHeader(props) {
	return (
		<div className={css`
        width: 100%;
        display: flex;
        place-content: center;
        text-align: center;
        padding: 100px 0;
        cursor: not-allowed;
		`} onClick={() => {
			window.localStorage.clear();
			window.location.reload();
		}
		}>
			<div>
				<span className={css`
            font-size: 18px;
            font-variant: small-caps;
				`}>location</span>
				<h4 className={css`
            font-size: 36px;
            font-weight: 400;
				`}>{props.location}</h4>
				<h1 className={css`
            font-size: 108px;
            font-weight: 200;
				`}>{props.temp}°</h1>
				<p className={css`
            font-size: 24px;
				`}>{props.condition}</p>
				{/*<p className={css`*/}
				{/*    font-size: 24px;*/}
				{/*`}>H: 87° L: 61°</p>*/}
			</div>
		</div>
	)
}
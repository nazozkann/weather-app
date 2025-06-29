import { format } from "date-fns";

export default function WeatherCard({ data }) {
  const {
    name,
    sys: { country },
    main: { temp },
    weather: [{ description, icon }],
  } = data;
  const todaysDate = format(new Date(), "EEEE, d MMMM");

  return (
    <div>
      <h2>
        {name},{country}
      </h2>
      <p>{todaysDate}</p>
      <img
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
        className="mx-auto"
      />
      <div>
        <p>{Math.round(temp)}°C</p>
        <p>{description}</p>
      </div>
    </div>
  );
}

import { useParams } from "react-router-dom";

export default function DetailsPage() {
  const { day } = useParams();
  return (
    <div>
      <h1>Weather Details for {day}</h1>
      <p>Here you can find detailed weather information for {day}.</p>
    </div>
  );
}

export default function GeoErrorComponent({ error }) {
  return (
    <div>
      <p>Error fetching geolocation: {error}</p>
    </div>
  );
}

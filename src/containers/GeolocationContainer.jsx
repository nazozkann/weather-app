import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function GeolocationContainer({ onLocationUpdate, onError }) {
  const { t } = useTranslation();
  const [coords, setCoords] = useState(null);
  const [geoError, setGeoError] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          const newCoords = { lat: latitude, lon: longitude };
          setCoords(newCoords);
          onLocationUpdate?.(newCoords);
        },
        (err) => {
          let errorMessage;
          switch (err.code) {
            case err.PERMISSION_DENIED:
              errorMessage = t("error_geolocation_denied");
              break;
            case err.POSITION_UNAVAILABLE:
              errorMessage = t("error_geolocation_unavailable");
              break;
            case err.TIMEOUT:
              errorMessage = t("error_geolocation_timeout");
              break;
            default:
              errorMessage = t("error_geolocation_unknown");
          }
          setGeoError(errorMessage);
          onError?.(errorMessage);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 600000 }
      );
    }
  }, [t, onLocationUpdate, onError]);

  return { coords, geoError };
}

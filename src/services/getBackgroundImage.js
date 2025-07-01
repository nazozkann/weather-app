import ClearSkyIcon from "../assets/backgrounds/clear-sky.webp";
import FewCloudsIcon from "../assets/backgrounds/few-clouds.webp";
import ScatteredCloudsIcon from "../assets/backgrounds/scattered-coluds.webp";
import BrokenCloudsIcon from "../assets/backgrounds/broken-clouds.webp";
import ShowerRainIcon from "../assets/backgrounds/shower-rain.webp";
import RainIcon from "../assets/backgrounds/rain.webp";
import ThunderstormIcon from "../assets/backgrounds/thunderstorm.webp";
import SnowIcon from "../assets/backgrounds/snow.webp";
import MistIcon from "../assets/backgrounds/mist.webp";

export const getBackgroundImage = (description) => {
  const desc = description.toLowerCase();

  if (
    desc.includes("clear sky") ||
    desc.includes("cielo despejado") ||
    desc.includes("despejado")
  ) {
    return ClearSkyIcon;
  }

  if (
    desc.includes("few clouds") ||
    desc.includes("pocas nubes") ||
    desc.includes("algo nuboso")
  ) {
    return FewCloudsIcon;
  }

  if (
    desc.includes("scattered clouds") ||
    desc.includes("nubes dispersas") ||
    desc.includes("nubes esparcidas")
  ) {
    return ScatteredCloudsIcon;
  }

  if (
    desc.includes("broken clouds") ||
    desc.includes("nubes rotas") ||
    desc.includes("muy nuboso")
  ) {
    return BrokenCloudsIcon;
  }

  if (
    desc.includes("shower rain") ||
    desc.includes("lluvia de ducha") ||
    desc.includes("chubascos")
  ) {
    return ShowerRainIcon;
  }

  if (
    desc.includes("rain") ||
    desc.includes("lluvia") ||
    desc.includes("lloviendo")
  ) {
    return RainIcon;
  }

  if (
    desc.includes("thunderstorm") ||
    desc.includes("tormenta") ||
    desc.includes("tormenta eléctrica")
  ) {
    return ThunderstormIcon;
  }

  if (
    desc.includes("snow") ||
    desc.includes("nieve") ||
    desc.includes("nevando")
  ) {
    return SnowIcon;
  }

  if (
    desc.includes("mist") ||
    desc.includes("fog") ||
    desc.includes("niebla") ||
    desc.includes("neblina") ||
    desc.includes("bruma")
  ) {
    return MistIcon;
  }

  return ClearSkyIcon;
};

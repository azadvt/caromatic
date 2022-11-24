import { ReactComponent as piechart} from "../assets/icons/piechart.svg"
import { ReactComponent as car} from "../assets/icons/car.svg"
import{ReactComponent as booking} from '../assets/icons/booking.svg'
export default function getIcon(iconName) {
    switch (iconName) {
      
      case "piechart":
      return piechart;
      case "car":
        return car;
      case "booking":
        return booking
      default:
        return null;
    }
  }
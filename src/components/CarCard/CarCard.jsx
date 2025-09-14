import { Link } from "react-router-dom";
import css from "./CarCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectFavorites } from "../../redux/favCars/selectors";
import { toggleFavorite } from "../../redux/favCars/slice";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import formatMileage from "../../utilits/Mileage";

export default function CarCard({ car }) {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);

  const pieces = car.address.split(",").map((p) => p.trim());
  const city = pieces[pieces.length - 2];
  const country = pieces[pieces.length - 1];

  const isFavorite = favorites.some((fav) => fav.id === car.id);

  const handleFavorite = () => {
    dispatch(toggleFavorite(car));

    if (isFavorite) {
      iziToast.info({
        title: "Removed",
        message: `${car.brand} ${car.model} removed from favorites`,
        position: "topRight",
      });
    } else {
      iziToast.success({
        title: "Added",
        message: `${car.brand} ${car.model} added to favorites`,
        position: "topRight",
      });
    }
  };

  return (
    <div className={css.card}>
      <div className={css.imgBox}>
        <img src={car.img} alt={`${car.brand} ${car.model}`} />

        {/* Favourite button */}
        <button
          type="button"
          aria-pressed={isFavorite}
          onClick={handleFavorite}
          className={`${css.fav} ${isFavorite ? css.active : ""}`}
        >
          <svg width="18" height="18" className={css.icon}>
            <use href="/public/icons.svg#icon-heart"></use>
          </svg>
        </button>
      </div>

      <div className={css.descWraper}>
        <div className={css.title}>
          {car.brand} <span>{car.model}</span>, {car.year}{" "}
        </div>
        <div>${car.rentalPrice}</div>
      </div>

      <div className={css.detailsWraper}>
        <div className={css.details}>
          <p>{city}</p>
          <p>{country}</p>
          <p>{car.rentalCompany}</p>
        </div>
        <div className={css.details}>
          <p>{car.type}</p>
          <p className={css.noBorder}>{formatMileage(car.mileage)}</p>
        </div>
      </div>

      <Link to={`/catalog/${car.id}`} className={css.link}>
        Read more
      </Link>
    </div>
  );
}

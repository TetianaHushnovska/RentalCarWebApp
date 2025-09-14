import style from "../../styles/container.module.css";
import css from "./CarDetailsPage.module.css";
import Header from "../../components/Header/Header";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentCar,
  selectEror,
  selectIsLoading,
} from "../../redux/cars/selectors";
import { useEffect } from "react";
import { fetchCarById } from "../../redux/cars/operations";
import clsx from "clsx";
import BookingForm from "../../components/BookingForm/BookingForm";
import Loader from "../../components/Loader/Loader";
import formatMileage from "../../utilits/Mileage";

export default function CarDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const car = useSelector(selectCurrentCar);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectEror);

  useEffect(() => {
    dispatch(fetchCarById(id));
  }, [dispatch, id]);

  if (isLoading) return <Loader />;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!car) return <p>No car found</p>;

  const pieces = car.address?.split(",").map((p) => p.trim()) || [];
  const city = pieces[pieces.length - 2] || "";
  const country = pieces[pieces.length - 1] || "";

  return (
    <>
      <Header />
      <section className={clsx(style.container, css.section)}>
        <div className={css.booking}>
          <div>
            <img
              src={car.img}
              alt={`${car.brand} ${car.model}`}
              className={css.img}
            />
          </div>

          <BookingForm />
        </div>

        <div className={css.details}>
          <div className={css.wraper}>
            <p className={css.title}>
              {car.brand} {car.model}, {car.year}
            </p>
            <p className={css.id}>Id: {car.id}</p>
          </div>

          <div className={css.wraper}>
            <p>
              <svg width="16" height="16" className={css.icon}>
                <use href="/icons.svg#icon-location"></use>
              </svg>
              {city}, {country}
            </p>
            <p>Mileage: {formatMileage(car.mileage)}</p>
          </div>

          <p className={css.price}>$ {car.rentalPrice}</p>

          <p className={css.desc}>{car.description}</p>

          <div className={css.listTitle}>Rental Conditions: </div>
          <ul className={css.list}>
            {car.rentalConditions.map((condition, index) => (
              <li key={index}>
                <svg width="16" height="16" className={css.icon}>
                  <use href="/icons.svg#icon-check-circle"></use>
                </svg>
                {condition}
              </li>
            ))}
          </ul>

          <div className={css.listTitle}>Car Specifications:</div>
          <ul className={css.list}>
            <li>
              <svg width="16" height="16" className={css.icon}>
                <use href="/icons.svg#icon-calendar"></use>
              </svg>
              Year: {car.year}
            </li>
            <li>
              <svg width="16" height="16" className={css.icon}>
                <use href="/icons.svg#icon-car"></use>
              </svg>
              Type: {car.type}
            </li>
            <li>
              <svg width="16" height="16" className={css.icon}>
                <use href="/icons.svg#icon-fuel-pump"></use>
              </svg>
              Fuel Consumption: {car.fuelConsumption}
            </li>
            <li>
              <svg width="16" height="16" className={css.icon}>
                <use href="/icons.svg#icon-gear"></use>
              </svg>
              Engine Size: {car.engineSize}
            </li>
          </ul>

          <div className={css.listTitle}>Accessories and functionalities:</div>
          <ul className={css.list}>
            {car.accessories.map((accessories, index) => (
              <li key={index}>
                <svg width="16" height="16" className={css.icon}>
                  <use href="/icons.svg#icon-check-circle"></use>
                </svg>
                {accessories}
              </li>
            ))}
            {car.functionalities.map((functionalities, index) => (
              <li key={index}>
                <svg width="16" height="16" className={css.icon}>
                  <use href="/icons.svg#icon-check-circle"></use>
                </svg>
                {functionalities}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

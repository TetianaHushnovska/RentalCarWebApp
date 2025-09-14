import css from "./CarList.module.css";
import style from "../../styles/container.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCars } from "../../redux/cars/operations";
import CarCard from "../CarCard/CarCard";
import { loadMore } from "../../redux/cars/slice";
import Loader from "../Loader/Loader";

export default function CarList() {
  const dispatch = useDispatch();
  const { cars, page, isLoading, error, total } = useSelector(
    (store) => store.cars
  );

  useEffect(() => {
    dispatch(fetchCars({ page }));
  }, [dispatch, page]);

  if (isLoading && cars.length === 0) {
    return <Loader />;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!isLoading && cars.length === 0) {
    return (
      <section className={style.container}>
        <p className={css.noResults}>
          Sorry, no cars match your filter😔
          <br />
          Try changing the criteria.
        </p>
      </section>
    );
  }

  const handleLoadMore = () => {
    dispatch(loadMore());
  };

  return (
    <section className={style.container}>
      <ul className={css.list}>
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </ul>

      {/* Load More button */}

      {!isLoading && cars.length < total && (
        <button onClick={handleLoadMore} className={css.moreBtn}>
          Load More
        </button>
      )}

      {isLoading && cars.length > 0 && <Loader />}
    </section>
  );
}

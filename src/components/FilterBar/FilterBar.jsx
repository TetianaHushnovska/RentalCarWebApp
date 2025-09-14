import { useDispatch, useSelector } from "react-redux";
import css from "./FilterBar.module.css";
import { useEffect, useState } from "react";
import { resetCars, setFilter } from "../../redux/cars/slice";
import { fetchCars, getBrands } from "../../redux/cars/operations";
import { selectBrands, selectMileage } from "../../redux/cars/selectors";
import { priceOptions } from "../../const/const";
import Select from "react-select";
import MileageInput from "../MileageInput/MileageInput";
import { customSelectBrandStyles } from "./custBrand";
import { customSelectPriceStyles } from "./custPrice";
import CustomSingleValue from "../CustomSingleValue/CustomSingleValue";

export default function FilterBar() {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);
  const filters = useSelector(selectMileage);

  const [localMin, setLocalMin] = useState(filters.minMileage || "");
  const [localMax, setLocalMax] = useState(filters.maxMileage || "");

  // бренди з бекунду для селекту
  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const options = (brands || []).map((brand) => ({
    value: brand,
    label: brand,
  }));

  const handleBrandChange = (option) => {
    dispatch(setFilter({ brand: option?.value || "" }));
  };

  const handlePriceChange = (option) => {
    dispatch(setFilter({ rentalPrice: option?.value || "" }));
  };

  const handleSubmit = () => {
    dispatch(resetCars());
    dispatch(setFilter({ minMileage: localMin, maxMileage: localMax }));
    dispatch(
      fetchCars({
        page: 1,
        limit: 12,
        brand: filters.brand,
        price: filters.rentalPrice,
        minMileage: localMin,
        maxMileage: localMax,
      })
    );
  };

  return (
    <div className={css.wraper}>
      <div className={css.form}>
        {/* Brand */}
        <div className={css.group}>
          <label className={css.label}>Car brand</label>
          <Select
            options={options}
            placeholder="Choose a brand"
            components={{
              IndicatorSeparator: () => null,
            }}
            value={options.find((opt) => opt.value === filters.brand) || null}
            onChange={handleBrandChange}
            isClearable
            styles={customSelectBrandStyles}
          ></Select>
        </div>

        {/* Price */}
        <div className={css.group}>
          <label htmlFor="price" className={css.label}>
            Price/ 1 hour
          </label>
          <Select
            options={priceOptions}
            placeholder="Choose a price"
            components={{
              IndicatorSeparator: () => null,
              SingleValue: (props) => (
                <CustomSingleValue {...props} prefix="To $" />
              ),
            }}
            value={
              priceOptions.find((o) => o.value === filters.rentalPrice) || null
            }
            onChange={handlePriceChange}
            isClearable
            styles={customSelectPriceStyles}
          ></Select>
        </div>

        {/* Mileage */}
        <MileageInput
          localMin={localMin}
          localMax={localMax}
          setLocalMax={setLocalMax}
          setLocalMin={setLocalMin}
        ></MileageInput>

        <button type="submit" onClick={handleSubmit} className={css.btn}>
          Search
        </button>
      </div>
    </div>
  );
}

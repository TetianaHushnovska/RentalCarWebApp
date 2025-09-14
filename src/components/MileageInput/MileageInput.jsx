import css from "./MileageInput.module.css";
import mileageInput from "../../utilits/MileageInput";

export default function MileageInput({
  localMin,
  localMax,
  setLocalMin,
  setLocalMax,
}) {
  return (
    <div className={css.wrapper}>
      <label className={css.label}>Сar mileage / km</label>
      <div>
        <input
          type="text"
          placeholder="From"
          value={localMin ? `From ${mileageInput(localMin)}` : "From"}
          onChange={(event) =>
            setLocalMin(event.target.value.replace(/\D/g, ""))
          }
          className={css.inputFirst}
        ></input>
        <input
          type="text"
          placeholder="To"
          value={localMax ? `To ${mileageInput(localMax)}` : "To"}
          onChange={(event) =>
            setLocalMax(event.target.value.replace(/\D/g, ""))
          }
          className={css.inputSecond}
        ></input>
      </div>
    </div>
  );
}

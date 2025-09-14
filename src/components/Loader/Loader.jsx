import { BeatLoader } from "react-spinners";

export default function Loader({ loading }) {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
    >
      <BeatLoader color="#3470FF" loading={loading} size={12} />
    </div>
  );
}

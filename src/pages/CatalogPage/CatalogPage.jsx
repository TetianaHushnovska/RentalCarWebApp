import CarList from "../../components/ CarList/CarList";
import FilterBar from "../../components/FilterBar/FilterBar";
import Header from "../../components/Header/Header";
import container from "../../styles/container.module.css";

export default function CatalogPage() {
  return (
    <>
      <Header />
      <section className={container}>
        <FilterBar />
        <CarList />
      </section>
    </>
  );
}

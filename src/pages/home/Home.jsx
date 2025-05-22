import React from "react";
import Header from "../../components/header/Header";
import ExploreMenu from "../../components/exploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import "./Home.css";

const Home = () => {
  const [category, setSelectedCategory] = React.useState("all");
  const [searchText, setSearchTerm] = React.useState("");

  return (
    <main className=" container home-main">
      <section className="app-section">
        <Header />
        <ExploreMenu
          category={category}
          setSelectedCategory={setSelectedCategory}
        />
        <FoodDisplay category={category} searchText={searchText} />
      </section>
    </main>
  );
};

export default Home;

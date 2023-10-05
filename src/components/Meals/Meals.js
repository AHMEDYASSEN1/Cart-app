import { Fragment } from "react";
import MealsSummary from "./MealsSummary";
import AvillableMeals from "./AvillableMeals";

const Meals = () => {
  return (
    <Fragment>
      <MealsSummary />
      <AvillableMeals />
    </Fragment>
  );
};


export default Meals;
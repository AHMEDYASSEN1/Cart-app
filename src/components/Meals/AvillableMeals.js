import { useEffect, useState } from "react";
import react from "react";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import clasess from "./AvillableMeals.module.css";


const AvillableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('https://react-http-df52b-default-rtdb.firebaseio.com//meals.json');

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

      fetchMeals().catch(error => {
        setIsLoading(false);
        setHttpError(error.message);
      });

  }, []);

  if (isLoading) {
    return (
      <section className={clasess.mealsLoading}>
        <p>Loading...</p>
      </section>
    )
  }

  if (httpError) {
    return <section className={clasess.mealsError}>
      <p>{httpError}</p>
    </section>
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      discription={meal.discription}
      price={meal.price}
    />
  ));

  return (
    <section className={clasess.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvillableMeals;

import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import { SpinnerDotted } from "spinners-react";



const AvailableMeals = () => {
  const [meals, setMaels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchMels = async () => {
      const response = await fetch(
        "https://food-order-7c880-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("owibka");
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
      setMaels(loadedMeals);
      setIsLoading(false);
    };

    fetchMels().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  if (isLoading) {
    return <section style={{textAlign:'center', marginTop:'50px'}}>{<SpinnerDotted/> }</section>;
  }
  if (error) {
    return (
      <section className={classes.error}>
        <h1>{error}</h1>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;

import React, { useContext } from 'react'
import { PizzaContext } from '../contexts/PizzaContext'
import { useParams } from 'react-router-dom';
import PizzaDisplay from '../components/PizzaDisplay';

const PizzaItem = () => {
    const {all_pizzas} = useContext(PizzaContext);
    console.log(all_pizzas);
    const {pizzaId} = useParams();
    const pizza = all_pizzas?.find((pizza)=>pizza._id===pizzaId);
  return (
    <div>
      {pizza ?
      (
        <>
          {/* <Breadcrumb pizza={pizza} /> */}
          <PizzaDisplay pizza={pizza} />
          {/* <DescriptionBox /> */}
          {/* <RelatedProducts pizza={pizza} /> */}
        </>
      ) : null}
    </div>
  )
}

export default PizzaItem
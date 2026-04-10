import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import ProductCards from "../ProductCrads/ProductCards";
import ProductData from '../../data/cards.json';
import Cart from "../Cart/Cart";
import "./main.css";

function Main() {
  const [count, setCount] = useState(0);
  const [username, setUsername] = useState("");
  const [countLength, setCountLength] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartId, setCartId] = useState([]);

  function addCountCards(){
    setCountLength(countLength + 1)
  }

  function addCartId(newCartId){
    const newId = ProductData.find((item) => item.id === newCartId);
    if(newId){
      setCartId([...cartId, newId]);
      setCountLength(count => count + 1);
      console.log(newId);
    }else{
    toast.error('Ops...');
  }
}

  function toggleCart(){
    setIsCartOpen(!isCartOpen)
  }

  useEffect(() => {
    async function getUsersData() {
      const token = localStorage.getItem("token");
      console.log(token);
      if (!token || token === "undefined") return;

      try {
        const response = await fetch("https://newbie0.onrender.com/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setCount(data.basket.length);
          setUsername(data.username);
        }
      } catch (err) {
        console.error(err);
        setCount(count);
        toast.error("No response from the server");
      }
    }
    getUsersData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
  <>
  <Cart cartId={cartId}  isOpen={isCartOpen} onClose={toggleCart} />
      <Header 
      onCartClick={toggleCart}
      quality={countLength}
      username={username}
      />
      <main>
      <SideBar/>
      <section className="column-cards">
        {ProductData.map((item) => (
          <ProductCards
          id={item.id}
          title={item.title}
          img={item.img}
          description={item.description}
          price={item.price}
          reviews={item.reviews}
          addCountCards={addCountCards}
          clickId={addCartId}
          />
        ))}
      </section>
      </main>
  </>
  );
}

export default Main;

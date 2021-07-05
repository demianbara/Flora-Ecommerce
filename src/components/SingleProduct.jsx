import React from "react";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/SingleProduct.css";
import Reviews from "../components/Reviews";
import { message } from 'antd'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { setCart } from '../state/cart';

function SingleProduct() {

  const [product, setProduct] = useState({});


  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart)

  const user = useSelector(state => state.user)

  const { id } = useParams();

  const cartProduct = useSelector(state => state.cart).filter(prod => prod.ProductId === product.id )

  useEffect(() => {
    dispatch(setCart())
    axios
      .get(`/api/products/${id}`)
      .then((res) => res.data)
      .then((product) => {
        setProduct(product);        
        let options = "";
        for (var i = 1; i <= product.stock; i++) {
          options += `<option value=${i}>${i}</option>`;
        }
        document.getElementById("quantity").innerHTML = options;
      });
  }, []);

  const handleClick = (e) => {
    e.preventDefault();

    console.log('PRODUCT', cartProduct)

    if(cartProduct.length && cartProduct[0].cantidad + Number(document.getElementById('quantity').value) >= product.stock) {
      message.error('No more stock available')
      return
    }

    if (user.id) {
      axios.post('/api/shop/add', {ProductId: product.id, cantidad: Number(document.getElementById('quantity').value)})
      .then(() => {
        message.success('Product added')
        dispatch(setCart())
      })
      .catch(err => message.error('Unable to add'))
    }
    else {
      let localProduct = {ProductId: product.id, cantidad: Number(document.getElementById('quantity').value)}
      let storageProducts = window.localStorage.getItem('CART') ? `${window.localStorage.getItem('CART')} AND ${JSON.stringify(localProduct)}` : JSON.stringify(localProduct)
      window.localStorage.setItem('CART', storageProducts)
      message.success('Product added')
      dispatch(setCart())
    }
  }

  return (
    
    <div className="product">
    {console.log('CANTIDAD', cartProduct)}
      <div className="productImg">
        <img src={product.imagen} alt={product.nombre} />
      </div>
      <div className="productText">
        <h1>{product.nombre}</h1>
        <h2>{product.descripcion}</h2>
        <p>Precio: {product.precio}</p>
        <p>Stock: {product.stock}</p>
        <div className="addToCart">
          <select type='integer' id="quantity"></select>
          <button onClick={handleClick} className="cartButton" type="button">
            Agregar al carrito
          </button>
        </div>
      </div>

      <Reviews />
    </div>
  );
}

export default SingleProduct;

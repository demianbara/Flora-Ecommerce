import React from "react";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/SingleProduct.css";
import Reviews from "../components/Reviews";
import { message } from 'antd'

function SingleProduct() {

  const [product, setProduct] = useState({});

  const { id } = useParams();

  useEffect(() => {
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
    axios.post('/api/shop/add', {ProductId: product.id, cantidad: document.getElementById('quantity').value})
    .then(() => message.success('Product added'))
    .catch(err => message.error('Unable to add'))
  }

  return (
    <div className="product">
      <div className="productImg">
        <img src={product.imagen} alt={product.nombre} />
      </div>
      <div className="productText">
        <h1>{product.nombre}</h1>
        <h2>{product.descripcion}</h2>
        <p>Precio: {product.precio}</p>
        <p>Stock: {product.stock}</p>
        <div className="addToCart">
          <select id="quantity"></select>
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

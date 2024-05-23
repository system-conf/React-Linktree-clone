import React, { useState, useEffect } from "react";
import "./BarmenHesaplayici.css";

const BarmenHesaplayici = ({ darkMode }) => {
  const [newProducts, setNewProducts] = useState({});
  const [productName, setProductName] = useState("");
  const [productAmount, setProductAmount] = useState("");
  const [productUnit, setProductUnit] = useState("gram");
  const [total, setTotal] = useState(0);

  useEffect(() => {}, [darkMode]);

  const addNewProduct = () => {
    if (
      productName &&
      !isNaN(parseFloat(productAmount)) &&
      parseFloat(productAmount) > 0
    ) {
      const productId = productName.replace(/\s+/g, "_").toLowerCase();
      const updatedProducts = {
        ...newProducts,
        [productId]: { initial: parseFloat(productAmount), unit: productUnit },
      };
      setNewProducts(updatedProducts);
      updateTotal(updatedProducts);

      // Clear input fields after adding a product
      setProductName("");
      setProductAmount("");
      setProductUnit("gram");
    }
  };

  const updateFromNewProduct = (productId, value) => {
    const productAmount = parseFloat(value);
    if (!isNaN(productAmount) && productAmount > 0) {
      const factor = productAmount / newProducts[productId].initial;
      updateValues(factor, productId);
    }
  };

  const updateValues = (factor, source) => {
    let total = 0;
    const updatedProducts = { ...newProducts };
    for (const key in newProducts) {
      if (source !== key) {
        updatedProducts[key].value = (
          newProducts[key].initial * factor
        ).toFixed(2);
      }
      total += parseFloat(updatedProducts[key].value) || 0;
    }
    setTotal(total);
    setNewProducts(updatedProducts);
  };

  const resetValues = () => {
    const resetProducts = { ...newProducts };
    for (const key in resetProducts) {
      resetProducts[key].value = resetProducts[key].initial;
    }
    setNewProducts(resetProducts);
    updateTotal(resetProducts);
  };

  const updateTotal = (products) => {
    let total = 0;
    for (const key in products) {
      total += parseFloat(products[key].value || products[key].initial) || 0;
    }
    setTotal(total);
  };

  const increaseAmount = (productId) => {
    const updatedProducts = { ...newProducts };
    updatedProducts[productId].value = (
      parseFloat(
        updatedProducts[productId].value || updatedProducts[productId].initial
      ) + 1
    ).toFixed(2);
    setNewProducts(updatedProducts);
    updateTotal(updatedProducts);
  };

  const decreaseAmount = (productId) => {
    const updatedProducts = { ...newProducts };
    const newValue =
      parseFloat(
        updatedProducts[productId].value || updatedProducts[productId].initial
      ) - 1;
    if (newValue >= 0) {
      updatedProducts[productId].value = newValue.toFixed(2);
      setNewProducts(updatedProducts);
      updateTotal(updatedProducts);
    }
  };

  const deleteProduct = (productId) => {
    const updatedProducts = { ...newProducts };
    delete updatedProducts[productId];
    setNewProducts(updatedProducts);
    updateTotal(updatedProducts);
  };

  return (
    <div className={`container ${darkMode ? "dark-mode" : ""}`}>
      <h1 className="barmen-header">Barmen Hesaplayıcı</h1>

      <h2 className="subHeader">Yeni Ürün Ekle</h2>
      <div>
        <label htmlFor="yeni_urun_isim" className="label">
          Ürün İsmi:
        </label>
        <input
          placeholder="isim"
          type="text"
          id="yeni_urun_isim"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="input"
        />
        <br />
        <label htmlFor="yeni_urun_miktar" className="label">
          Miktar:
        </label>
        <input
          placeholder="miktar"
          type="number"
          id="yeni_urun_miktar"
          value={productAmount}
          onChange={(e) => setProductAmount(e.target.value)}
          className="input"
        />
        <br />
        <label htmlFor="yeni_urun_birim" className="label">
          Birim:
        </label>
        <select
          id="yeni_urun_birim"
          value={productUnit}
          onChange={(e) => setProductUnit(e.target.value)}
          className="select"
        >
          <option value="gram">gram</option>
          <option value="ml">ml</option>
          <option value="cl">cl</option>
        </select>
        <br />
        <button onClick={addNewProduct} className="button">
          Ürün Ekle
        </button>
        <button onClick={resetValues} className="button">
          Reset
        </button>
      </div>
      <div id="newProductSection">
        {Object.entries(newProducts).map(([productId, product]) => (
          <div key={productId} className="productRow">
            <label htmlFor={productId} className="productLabel">
              {productId.replace("_", " ")} ({product.unit}):
            </label>
            <input
              type="number"
              id={productId}
              value={product.value || product.initial}
              onChange={(e) => updateFromNewProduct(productId, e.target.value)}
              className="productInput"
            />
            <button
              onClick={() => increaseAmount(productId)}
              className="adjustButton"
            >
              +
            </button>
            <button
              onClick={() => decreaseAmount(productId)}
              className="adjustButton"
            >
              -
            </button>
            <button
              onClick={() => deleteProduct(productId)}
              className="adjustButton"
            >
              Sil
            </button>
          </div>
        ))}
      </div>
      <div className="totals">
        <h2>Genel Toplam</h2>
        <p id="genel_toplam">Toplam Miktar: {total.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default BarmenHesaplayici;

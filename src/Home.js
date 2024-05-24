import React, { useState } from "react";

const Home = () => {
  const initialValues = {
    kabuk: 25,
    sitrikAsit: 30,
    sekerSurubu: 1000,
    meyveSuyu: 150,
  };

  const [values, setValues] = useState(initialValues);

  const updateValues = (factor, source) => {
    setValues((prevValues) => {
      const newValues = { ...prevValues };
      if (source !== "kabuk") {
        newValues.kabuk = (initialValues.kabuk * factor).toFixed(2);
      }
      if (source !== "sitrik_asit") {
        newValues.sitrikAsit = (initialValues.sitrikAsit * factor).toFixed(2);
      }
      if (source !== "seker_surubu") {
        newValues.sekerSurubu = (initialValues.sekerSurubu * factor).toFixed(2);
      }
      if (source !== "meyve_suyu") {
        newValues.meyveSuyu = (initialValues.meyveSuyu * factor).toFixed(2);
      }
      return newValues;
    });
  };

  const updateFromKabuk = (e) => {
    const kabuk = parseFloat(e.target.value);
    if (!isNaN(kabuk) && kabuk > 0) {
      const factor = kabuk / initialValues.kabuk;
      updateValues(factor, "kabuk");
    }
  };

  const updateFromSitrikAsit = (e) => {
    const sitrikAsit = parseFloat(e.target.value);
    if (!isNaN(sitrikAsit) && sitrikAsit > 0) {
      const factor = sitrikAsit / initialValues.sitrikAsit;
      updateValues(factor, "sitrik_asit");
    }
  };

  const updateFromSekerSurubu = (e) => {
    const sekerSurubu = parseFloat(e.target.value);
    if (!isNaN(sekerSurubu) && sekerSurubu > 0) {
      const factor = sekerSurubu / initialValues.sekerSurubu;
      updateValues(factor, "seker_surubu");
    }
  };

  const updateFromMeyveSuyu = (e) => {
    const meyveSuyu = parseFloat(e.target.value);
    if (!isNaN(meyveSuyu) && meyveSuyu > 0) {
      const factor = meyveSuyu / initialValues.meyveSuyu;
      updateValues(factor, "meyve_suyu");
    }
  };

  const increaseAmount = (source) => {
    setValues((prevValues) => {
      const newValues = { ...prevValues };
      newValues[source] = (parseFloat(newValues[source]) + 1).toFixed(2);
      const factor = newValues[source] / initialValues[source];
      updateValues(factor, source);
      return newValues;
    });
  };

  const decreaseAmount = (source) => {
    setValues((prevValues) => {
      const newValues = { ...prevValues };
      const newValue = parseFloat(newValues[source]) - 1;
      if (newValue >= 0) {
        newValues[source] = newValue.toFixed(2);
        const factor = newValues[source] / initialValues[source];
        updateValues(factor, source);
      }
      return newValues;
    });
  };

  const resetValues = () => {
    setValues(initialValues);
  };

  return (
    <div className="container container-home">
      <h1 className="barmen-header">Barmen Hesaplayıcı</h1>
      <div className="productRow">
        <label htmlFor="kabuk" className="label marginsifir">
          Kabuk (gram):
        </label>
        <input
          style={{ marginBottom: 0 }}
          type="number"
          id="kabuk"
          value={values.kabuk}
          onChange={updateFromKabuk}
          className="input"
        />
        <button
          onClick={() => increaseAmount("kabuk")}
          className="adjustButton marginsifir"
        >
          +
        </button>
        <button
          onClick={() => decreaseAmount("kabuk")}
          className="adjustButton marginsifir"
        >
          -
        </button>
      </div>
      <br />
      <div className="productRow">
        <label htmlFor="sitrik_asit" className="label marginsifir">
          Sitrik Asit (gram):
        </label>
        <input
          type="number"
          id="sitrik_asit"
          value={values.sitrikAsit}
          onChange={updateFromSitrikAsit}
          className="input marginsifir"
        />
        <button
          onClick={() => increaseAmount("sitrikAsit")}
          className="adjustButton marginsifir"
        >
          +
        </button>
        <button
          onClick={() => decreaseAmount("sitrikAsit")}
          className="adjustButton marginsifir"
        >
          -
        </button>
      </div>
      <br />
      <div className="productRow">
        <label htmlFor="seker_surubu" className="label marginsifir">
          Şeker Şurubu (ml):
        </label>
        <input
          type="number"
          id="seker_surubu"
          value={values.sekerSurubu}
          onChange={updateFromSekerSurubu}
          className="input marginsifir"
        />
        <button
          onClick={() => increaseAmount("sekerSurubu")}
          className="adjustButton marginsifir"
        >
          +
        </button>
        <button
          onClick={() => decreaseAmount("sekerSurubu")}
          className="adjustButton marginsifir"
        >
          -
        </button>
      </div>
      <br />
      <div className="productRow">
        <label htmlFor="meyve_suyu" className="label marginsifir">
          Meyve Suyu (ml):
        </label>
        <input
          type="number"
          id="meyve_suyu"
          value={values.meyveSuyu}
          onChange={updateFromMeyveSuyu}
          className="input marginsifir"
        />
        <button
          onClick={() => increaseAmount("meyveSuyu")}
          className="adjustButton marginsifir"
        >
          +
        </button>
        <button
          onClick={() => decreaseAmount("meyveSuyu")}
          className="adjustButton marginsifir"
        >
          -
        </button>
      </div>
      <br />
      <button onClick={resetValues} className="button">
        Reset
      </button>
    </div>
  );
};

export default Home;

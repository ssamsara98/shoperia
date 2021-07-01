import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import serverApi from '~/api/server-api';
import priceHelper from '~/utils/price-helper';

const CartItemTotal = () => {
  const { items, loading } = useSelector((state) => state.cart);
  const [isCheckout, setIsCheckout] = useState(false);
  const [form, setForm] = useState({ province: '', city: '', courier: '', cost: 0 });
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [costs, setCost] = useState([]);

  useEffect(() => {
    async function fetchProvince() {
      try {
        const { data } = await serverApi.get('/api/raja-ongkir/province');
        setProvinces(() => data.rajaongkir.results);
      } catch (err) {}
    }
    fetchProvince();
    return () => {};
  }, []);

  useEffect(() => {
    async function fetchProvince() {
      try {
        if (form.province) {
          const { data } = await serverApi.get('/api/raja-ongkir/city', {
            params: { province: form.province },
          });
          setCities(() => data.rajaongkir.results);
        }
      } catch (err) {}
    }
    fetchProvince();
    return () => {};
  }, [form.province]);

  useEffect(() => {
    async function fetchProvince() {
      try {
        if (form.city) {
          const { data } = await serverApi.post('/api/raja-ongkir/cost', {
            origin: 431,
            destination: form.city,
            courier: form.courier,
            weight: 10000,
          });
          console.log(data.rajaongkir.results[0].costs);
          setCost(() => data.rajaongkir.results[0].costs);
        }
      } catch (err) {}
    }
    fetchProvince();
    return () => {};
  }, [form.city, form.courier]);

  const calculatePrice = (items) => {
    const tmp = items
      .filter((item) => item.quantity <= item.product.stock)
      .map((item) => item.quantity * item.product.price);
    return tmp.length > 0 ? tmp.reduce((a, b) => a + b) : 0;
  };

  const calculateGoods = (items) => {
    const tmp = items
      .filter((item) => item.quantity <= item.product.stock)
      .map((item) => item.quantity);

    return `${tmp.length > 0 ? tmp.reduce((a, b) => a + b) : 0} with ${tmp.length} different items`;
  };

  const handleSelect = (e) => {
    if (e.target.name === 'province')
      return setForm((prev) => ({
        ...prev,
        city: '',
        courier: '',
        cost: 0,
        [e.target.name]: e.target.value,
      }));
    if (e.target.name === 'courier')
      return setForm((prev) => ({
        ...prev,
        cost: 0,
        [e.target.name]: e.target.value,
      }));
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex flex-col space-y-2 w-full px-5 py-3 bg-white rounded">
        <div className="w-full">
          <strong className="font-bold">Total Goods</strong>
          <p>{calculateGoods(items)}</p>
        </div>
        <div className="w-full text-xl">
          <strong className="font-bold">Total Price</strong>
          <p className="text-sm">Goods</p>
          <p className="text-xl">Rp{priceHelper(calculatePrice(items))}</p>
          <p className="text-sm">Shipment</p>
          <p className="text-xl">Rp{priceHelper(form.cost)}</p>
          <p className="text-sm">Total</p>
          <p className="text-xl">Rp{priceHelper(calculatePrice(items) + parseInt(form.cost))}</p>
        </div>
      </div>
      <div className="flex flex-col space-y-2 w-full px-5 py-3 bg-white rounded">
        <div className="flex space-x-4">
          <div className="w-full">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="w-full">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>
        <div>
          <label htmlFor="province">Province</label>
          <select
            name="province"
            id="province"
            className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            defaultValue={form.province}
            onChange={handleSelect}
          >
            <option disabled value="">
              -- Choose Province --
            </option>
            {provinces.map((province) => (
              <option value={province.province_id} key={province.province_id}>
                {province.province}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <select
            name="city"
            id="city"
            className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 disabled:bg-cool-gray-300"
            defaultValue={form.city}
            onChange={handleSelect}
            disabled={!form.province}
          >
            <option value="">-- Choose City --</option>
            {cities.map((city) => (
              <option value={city.city_id} key={city.city_id}>
                {city.city_name} ({city.type})
              </option>
            ))}
          </select>
        </div>
        {form.province && form.city && (
          <div>
            <p>Courier</p>
            <div className="flex justify-between">
              <label class="inline-flex items-center">
                <input
                  type="radio"
                  name="courier"
                  checked={form.courier === 'jne'}
                  value="jne"
                  onChange={handleSelect}
                />
                <span class="ml-2">JNE</span>
              </label>
              <label class="inline-flex items-center">
                <input
                  type="radio"
                  name="courier"
                  checked={form.courier === 'tiki'}
                  value="tiki"
                  onChange={handleSelect}
                />
                <span class="ml-2">Tiki</span>
              </label>
              <label class="inline-flex items-center">
                <input
                  type="radio"
                  name="courier"
                  checked={form.courier === 'pos'}
                  value="pos"
                  onChange={handleSelect}
                />
                <span class="ml-2">Pos Indonesia</span>
              </label>
            </div>
          </div>
        )}
        {form.province && form.city && form.courier && !!costs.length && (
          <div>
            <div className="flex flex-col justify-between">
              <p>Services</p>
              {costs.map((cost) => (
                <label class="inline-flex items-center" key={cost.service}>
                  <input
                    type="radio"
                    name="cost"
                    checked={form.cost === `${cost.cost[0].value}`}
                    value={cost.cost[0].value}
                    onChange={handleSelect}
                  />
                  <span class="ml-2">
                    {cost.service} - {cost.cost[0].value}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
        <div>
          <label htmlFor="address">City</label>
          <textarea
            name="address"
            id="address"
            className="mt-1 block w-full h-24"
            placeholder="Input address here"
          ></textarea>
        </div>
      </div>
      <div className="py-2">
        <button
          className="w-full px-3 py-5 rounded bg-sky-600 hover:bg-sky-700 active:bg-sky-800 disabled:bg-sky-600 text-white disabled:opacity-75"
          disabled={items.length === 0 || loading}
        >
          {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Checkout'}
        </button>
      </div>
    </div>
  );
};

export default CartItemTotal;

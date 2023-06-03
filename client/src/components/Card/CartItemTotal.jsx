import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import serverApi from '~/api/server-api';
import priceHelper from '~/utils/price-helper';

const CartItemTotal = () => {
  const { items, loading } = useSelector((state) => state.cart);
  const rsAuth = useSelector((state) => state.auth);
  const [isCheckout, setIsCheckout] = useState(false);
  const [weight, setWeight] = useState(0);
  const [form, setForm] = useState({
    name: '',
    telephone: '',
    province: '',
    province_id: null,
    city: '',
    city_id: null,
    district: '',
    postal_code: '',
    address: '',
    courier: '',
    service: '',
    cost: 0,
  });
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [costs, setCost] = useState([]);

  useEffect(() => {
    setForm((prev) => ({ ...prev, name: rsAuth.user.name }));
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
    const tmp = items
      .filter((item) => item.quantity <= item.product.stock)
      .map((item) => item.quantity * item.product.weight);
    const weight = tmp.length > 0 ? tmp.reduce((a, b) => a + b) / 1000 : 0;
    setWeight(() => weight);
    setCost([]);
    setForm((prev) => ({
      ...prev,
      courier: '',
      service: '',
      cost: 0,
    }));
    return () => {};
  }, [items]);

  useEffect(() => {
    async function fetchProvince() {
      try {
        if (form.province_id) {
          const { data } = await serverApi.get('/api/raja-ongkir/city', {
            params: { province: form.province_id },
          });
          setCities(() => data.rajaongkir.results);
        }
      } catch (err) {}
    }
    fetchProvince();
    return () => {};
  }, [form.province_id]);

  useEffect(() => {
    async function fetchProvince() {
      try {
        if (weight > 30) setCost(() => []);
        if (form.city_id && form.courier && weight <= 30) {
          const { data } = await serverApi.post('/api/raja-ongkir/cost', {
            origin: 431,
            destination: form.city_id,
            courier: form.courier,
            weight: weight * 1000,
          });
          setCost(() => data.rajaongkir.results[0].costs);
        }
      } catch (err) {}
    }
    fetchProvince();
    return () => {};
  }, [form.city_id, form.courier]);

  useEffect(() => {
    const t = setTimeout(() => {
      const truth = Object.keys(form)
        .map((key) => !!form[key])
        .reduce((a, b) => a && b);
      if (truth) setIsCheckout(true);
      else setIsCheckout(false);
    }, 500);
    return () => {
      clearTimeout(t);
    };
  }, [form]);

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

  const handleNamed = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleProvince = (e) => {
    const province = provinces[e.target.value];
    setForm((prev) => ({
      ...prev,
      province: province.province,
      province_id: province.province_id,
      city: '',
      city_id: null,
      courier: '',
      service: '',
      cost: 0,
    }));
  };
  const handleCity = (e) => {
    const city = cities[e.target.value];
    setForm((prev) => ({
      ...prev,
      city: `${city.type} ${city.city_name}`,
      city_id: city.city_id,
      postal_code: city.postal_code,
      cost: 0,
    }));
  };
  const handleCourier = (e) => {
    setForm((prev) => ({
      ...prev,
      courier: e.target.value,
      cost: 0,
    }));
  };
  const handleCost = (e) => {
    console.log(e);
    console.log(e.target.value);
    const cost = costs[e.target.value];
    setForm((prev) => ({
      ...prev,
      service: cost.service,
      cost: cost.cost[0].value,
    }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setIsCheckout(false);
    try {
      const data = {
        consignee: {
          name: form.name,
          telephone: form.telephone,
          province: form.province,
          city: form.city,
          district: form.district,
          address: form.address,
          postalCode: form.postal_code,
        },
        courier: form.courier,
        service: form.service,
        shippingCost: parseInt(form.cost),
      };
      await serverApi.post('/api/v1/order/place-order', data);
      window.location.href = '/account/orders';
    } catch (err) {
      console.error(err);
    } finally {
      setIsCheckout(false);
    }
  };

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex flex-col space-y-2 w-full px-5 py-3 bg-white rounded">
        <div className="w-full">
          <strong className="font-bold">Total Goods</strong>
          <p>{calculateGoods(items)}</p>
        </div>
        <div className="w-full">
          <strong className="font-bold">Total Weight</strong>
          <p className={weight > 30 ? 'text-rose-600' : ''}>{weight} Kg</p>
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
              name="name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 disabled:bg-cool-gray-300"
              value={form.name}
              onChange={handleNamed}
              disabled={!items.length}
            />
          </div>
          <div className="w-full">
            <label htmlFor="telephone">Telephone</label>
            <input
              type="text"
              id="telephone"
              name="telephone"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 disabled:bg-cool-gray-300"
              value={form.telephone}
              onChange={handleNamed}
              disabled={!items.length}
            />
          </div>
        </div>
        {/* province */}
        <div>
          <label htmlFor="province">Province</label>
          <select
            name="province"
            id="province"
            className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 disabled:bg-cool-gray-300"
            defaultValue={form.province}
            onChange={handleProvince}
            disabled={!items.length}
          >
            <option disabled value="">
              -- Choose Province --
            </option>
            {provinces.map((province, idx) => (
              <option value={idx} key={province.province_id}>
                {province.province}
              </option>
            ))}
          </select>
        </div>
        {/* city */}
        <div>
          <label htmlFor="city">City</label>
          <select
            name="city"
            id="city"
            className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 disabled:bg-cool-gray-300"
            defaultValue={form.city}
            onChange={handleCity}
            disabled={!form.province}
          >
            <option value="">-- Choose City --</option>
            {cities.map((city, idx) => (
              <option value={idx} key={city.city_id}>
                {city.city_name} ({city.type})
              </option>
            ))}
          </select>
        </div>
        {/* courier */}
        {form.province && form.city && (
          <div>
            <p>Courier</p>
            <div className="flex justify-between">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="courier"
                  checked={form.courier === 'jne'}
                  value="jne"
                  onChange={handleCourier}
                  disabled={weight > 30}
                  className="disabled:bg-cool-gray-300"
                />
                <span className="ml-2">JNE</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="courier"
                  checked={form.courier === 'tiki'}
                  value="tiki"
                  onChange={handleCourier}
                  disabled={weight > 30}
                  className="disabled:bg-cool-gray-300"
                />
                <span className="ml-2">Tiki</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="courier"
                  checked={form.courier === 'pos'}
                  value="pos"
                  onChange={handleCourier}
                  disabled={weight > 30}
                  className="disabled:bg-cool-gray-300"
                />
                <span className="ml-2">Pos Indonesia</span>
              </label>
            </div>
          </div>
        )}
        {/* costs */}
        {form.province && form.city && form.courier && !!costs.length && (
          <div>
            <div className="flex flex-col justify-between">
              <p>Services</p>
              {costs.map((cost, idx) => (
                <label className="inline-flex items-center" key={cost.service}>
                  <input
                    type="radio"
                    name="cost"
                    checked={form.cost === cost.cost[0].value && form.service === cost.service}
                    value={idx}
                    onChange={handleCost}
                  />
                  <span className="ml-2">
                    {cost.service} - {cost.cost[0].value}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
        {/* district */}
        <div className="flex space-x-4">
          <div className="w-full">
            <label htmlFor="district">District</label>
            <input
              type="text"
              id="district"
              name="district"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 disabled:bg-cool-gray-300"
              value={form.district}
              onChange={handleNamed}
              disabled={!items.length}
            />
          </div>
          <div className="w-full">
            <label htmlFor="postal_code">Postal Code</label>
            <input
              type="text"
              id="postal_code"
              name="postal_code"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 disabled:bg-cool-gray-300"
              value={form.postal_code}
              onChange={handleNamed}
              disabled={!items.length}
            />
          </div>
        </div>
        {/* address */}
        <div>
          <label htmlFor="address">Address</label>
          <textarea
            name="address"
            id="address"
            className="mt-1 block w-full h-24 disabled:bg-cool-gray-300"
            placeholder="Input address here"
            value={form.address}
            onChange={handleNamed}
            disabled={!items.length}
          ></textarea>
        </div>
      </div>
      <div className="py-2">
        <button
          className="w-full px-3 py-5 rounded bg-sky-600 hover:bg-sky-700 active:bg-sky-800 disabled:bg-cool-gray-500 text-white disabled:opacity-75"
          disabled={items.length === 0 || loading || !isCheckout}
          onClick={handleCheckout}
        >
          {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Checkout'}
        </button>
      </div>
    </div>
  );
};

export default CartItemTotal;

// App.jsx
import { useState } from "react";

export default function App() {
  const [role, setRole] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const wasteData = [
    { type: "Plastic Bottles", qty: "20 kg", price: "₹15/kg", location: "Delhi" },
    { type: "Cardboard", qty: "10 kg", price: "₹8/kg", location: "Jaipur" },
  ];

  const plantNeeds = [
    { need: "PET Plastic", qty: "50 kg", rate: "₹20/kg" },
    { need: "E-waste", qty: "5 kg", rate: "₹100/kg" },
  ];

  const companyData = [
    { product: "Recycled Plastic Pellets", qty: "100 kg", price: "₹35/kg" },
    { product: "Processed Cardboard Sheets", qty: "50 kg", price: "₹18/kg" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {!loggedIn ? (
        <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm text-center">
          <h1 className="text-3xl font-bold text-green-700 mb-3">♻ EcoLink</h1>
          <p className="text-gray-600 mb-4">Choose your role to continue</p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                setRole("ragpicker");
                setLoggedIn(true);
              }}
              className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Rag Supplier
            </button>
            <button
              onClick={() => {
                setRole("plant");
                setLoggedIn(true);
              }}
              className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Recycling Plant
            </button>
            <button
              onClick={() => {
                setRole("company");
                setLoggedIn(true);
              }}
              className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Company
            </button>
          </div>
        </div>
      ) : (
        <Dashboard
          role={role}
          wasteData={wasteData}
          plantNeeds={plantNeeds}
          companyData={companyData}
          logout={() => setLoggedIn(false)}
        />
      )}
    </div>
  );
}

function Dashboard({ role, wasteData, plantNeeds, companyData, logout }) {
  return (
    <div className="bg-white w-full max-w-4xl rounded-2xl shadow-md p-6">
      <div className="flex justify-between items-center mb-5 border-b pb-3">
        <h2 className="text-2xl font-semibold text-green-700 capitalize">
          {role} Dashboard
        </h2>
        <button onClick={logout} className="text-gray-500 hover:underline text-sm">
          Logout
        </button>
      </div>

      {role === "ragpicker" && (
        <>
          <h3 className="text-lg font-semibold mb-2 text-green-700">
            🗑 Your Listed Waste
          </h3>
          <div className="grid gap-3">
            {wasteData.map((w, i) => (
              <Card
                key={i}
                title={w.type}
                details={Qty: ${w.qty} | Price: ${w.price} | Location: ${w.location}}
              />
            ))}
          </div>
        </>
      )}

      {role === "plant" && (
        <>
          <h3 className="text-lg font-semibold mb-2 text-green-700">♻ Available Waste</h3>
          <div className="grid gap-3 mb-5">
            {wasteData.map((w, i) => (
              <Card
                key={i}
                title={w.type}
                details={Qty: ${w.qty} | Price: ${w.price} | Location: ${w.location}}
              />
            ))}
          </div>

          <h3 className="text-lg font-semibold mb-2 text-green-700">
            📋 Your Requirements
          </h3>
          <div className="grid gap-3">
            {plantNeeds.map((n, i) => (
              <Card
                key={i}
                title={n.need}
                details={Qty: ${n.qty} | Rate: ${n.rate}}
              />
            ))}
          </div>
        </>
      )}

      {role === "company" && (
        <>
          <h3 className="text-lg font-semibold mb-2 text-green-700">
            🏭 Recycled Materials Available
          </h3>
          <div className="grid gap-3">
            {companyData.map((c, i) => (
              <Card
                key={i}
                title={c.product}
                details={Qty: ${c.qty} | Price: ${c.price}}
              />
            ))}
          </div>
        </>
      )}

      {/* Price Calculator (for all users) */}
      <div className="mt-6 border-t pt-4">
        <PriceCalculator />
      </div>
    </div>
  );
}

function Card({ title, details }) {
  return (
    <div className="border rounded-xl p-4 bg-gray-50 hover:shadow-md transition">
      <h4 className="font-semibold text-green-700">{title}</h4>
      <p className="text-gray-600 text-sm mt-1">{details}</p>
    </div>
  );
}

function PriceCalculator() {
  const [type, setType] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState(null);

  const rates = { plastic: 15, cardboard: 8, metal: 60, ewaste: 100 };

  const calculate = () => {
    if (type && qty) {
      const rate = rates[type] || 10;
      setPrice(rate * parseFloat(qty));
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-green-700 mb-2">💰 Price Calculator</h3>
      <div className="flex flex-col sm:flex-row gap-2">
        <select
          onChange={(e) => setType(e.target.value)}
          className="border p-2 rounded-lg w-full sm:w-1/3"
        >
          <option value="">Select Type</option>
          <option value="plastic">Plastic</option>
          <option value="cardboard">Cardboard</option>
          <option value="metal">Metal</option>
          <option value="ewaste">E-waste</option>
        </select>
        <input
          type="number"
          placeholder="Quantity (kg)"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          className="border p-2 rounded-lg w-full sm:w-1/3"
        />
        <button
          onClick={calculate}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition w-full sm:w-1/3"
        >
          Calculate
        </button>
      </div>
      {price !== null && (
        <p className="mt-3 text-gray-700">
          Estimated Value:{" "}
          <span className="font-semibold text-green-700">₹{price}</span>
        </p>
      )}
    </div>
  );
}
"use client";
import { useState } from "react";

const ACCENT = "blue";

export default function FarmToTablePage() {
  const [location, setLocation] = useState("");
  const [cuisineType, setCuisineType] = useState("American");
  const [seasonalWindow, setSeasonalWindow] = useState("Year-Round");
  const [budgetTier, setBudgetTier] = useState("$$ (Casual)");
  const [certificationReqs, setCertificationReqs] = useState("");
  const [distanceRadius, setDistanceRadius] = useState("50 miles");
  const [menuStyle, setMenuStyle] = useState("Full-Service");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!location.trim()) { setError("Please enter your restaurant location."); return; }
    setLoading(true); setError(""); setOutput("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location, cuisineType, seasonalWindow, budgetTier, certificationReqs, distanceRadius, menuStyle }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setOutput(data.output);
    } catch (err: any) { setError(err.message); } finally { setLoading(false); }
  };

  const btnClass = loading
    ? `px-8 py-3 rounded-lg font-semibold text-white bg-${ACCENT}-700 cursor-not-allowed`
    : `px-8 py-3 rounded-lg font-semibold text-white bg-${ACCENT}-600 hover:bg-${ACCENT}-500 transition-all`;

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className={`text-4xl font-bold mb-3 bg-gradient-to-r from-${ACCENT}-400 to-${ACCENT}-600 bg-clip-text text-transparent`}>AI Farm-to-Table Sourcing Plan</h1>
        <p className="text-gray-400 text-sm">Generate comprehensive farm-to-table sourcing plans for restaurants</p>
      </div>
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-200">Restaurant & Sourcing Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1 text-gray-300">Restaurant Location *</label>
            <input value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. Portland, Oregon" className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-gray-200" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Cuisine Type</label>
            <select value={cuisineType} onChange={e => setCuisineType(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-gray-200">
              <option>American</option><option>Italian</option><option>French</option><option>Japanese</option><option>Mexican</option><option>Indian</option><option>Chinese</option><option>Mediterranean</option><option>Korean</option><option>Thai</option><option>Farm-to-Table/Organic</option><option>Fusion</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Seasonal Window</label>
            <select value={seasonalWindow} onChange={e => setSeasonalWindow(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-gray-200">
              <option>Year-Round</option><option>Spring-Summer Only</option><option>Fall-Winter Only</option><option>Spring Only</option><option>Multi-seasonal rotation</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Budget Tier</label>
            <select value={budgetTier} onChange={e => setBudgetTier(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-gray-200">
              <option>$ (Budget)</option><option>$$ (Casual)</option><option>$$$ (Upscale)</option><option>$$$$ (Fine Dining)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Distance Radius</label>
            <select value={distanceRadius} onChange={e => setDistanceRadius(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-gray-200">
              <option>25 miles</option><option>50 miles</option><option>100 miles</option><option>150 miles</option><option>250 miles</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Menu Style</label>
            <select value={menuStyle} onChange={e => setMenuStyle(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-gray-200">
              <option>Full-Service</option><option>Fast-Casual</option><option>Cafe/Bistro</option><option>Fine Dining</option><option>Food Truck/Mobile</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Certification Requirements</label>
            <input value={certificationReqs} onChange={e => setCertificationReqs(e.target.value)} placeholder="e.g. USDA Organic, Non-GMO, GAP Certified" className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-gray-200" />
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-6">
        <button onClick={handleGenerate} disabled={loading} className={btnClass}>
          {loading ? "Generating..." : "Generate Farm-to-Table Plan"}
        </button>
      </div>
      {error && <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-red-300 text-sm mb-6">{error}</div>}
      {output && (
        <div className="bg-gray-800/70 border border-gray-700 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-200">Farm-to-Table Sourcing Plan</h2>
          <pre className="text-gray-300 text-sm whitespace-pre-wrap font-sans">{output}</pre>
        </div>
      )}
    </main>
  );
}

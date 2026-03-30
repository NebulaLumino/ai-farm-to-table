"use client";
import { useState } from "react";
const CUISINES = ["Any","Italian","French","Japanese","Mexican","American","Indian","Thai","Chinese","Mediterranean","Korean","Spanish","Greek","Middle Eastern"];
export default function FarmToTablePage() {
  const [location, setLocation] = useState("");
  const [cuisine, setCuisine] = useState("Any");
  const [focus, setFocus] = useState("Full supply chain");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleGenerate = async () => {
    if (!location.trim()) { setError("Please enter your restaurant location."); return; }
    setLoading(true); setError(""); setOutput("");
    try {
      const res = await fetch("/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location, cuisine, focus }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setOutput(data.output);
    } catch (err: any) { setError(err.message); } finally { setLoading(false); }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3" style={{ color: "hsl(75, 70%, 50%)" }}>AI Farm-to-Table Supply Chain Mapper</h1>
          <p className="text-gray-400 text-lg">Map a local farm-to-table supply chain with specific producers, seasonal availability, and sustainability benefits</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Restaurant Location *</label>
              <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Portland, Oregon or Austin, Texas" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-lime-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Cuisine Type</label>
              <select value={cuisine} onChange={(e) => setCuisine(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-lime-500">
                {CUISINES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Focus Area</label>
              <select value={focus} onChange={(e) => setFocus(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-lime-500">
                <option>Full supply chain</option>
                <option>Produce only</option>
                <option>Proteins only</option>
                <option>Dairy & eggs</option>
                <option>Specialty/ artisanal goods</option>
              </select>
            </div>
            <button onClick={handleGenerate} disabled={loading} className="w-full py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-50" style={{ backgroundColor: "hsl(75, 70%, 50%)" }}>{loading ? "Mapping..." : "Map Supply Chain"}</button>
            {error && <p className="text-red-400 text-sm">{error}</p>}
          </div>
          <div className="lg:col-span-2">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 min-h-[500px]">
              <h2 className="text-lg font-semibold text-gray-300 mb-4">Farm-to-Table Supply Chain Map</h2>
              {output ? <div className="prose prose-invert prose-sm max-w-none text-gray-300 whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: output.replace(/\n/g, "<br>") }} /> : <p className="text-gray-600 italic">Your supply chain map will appear here...</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

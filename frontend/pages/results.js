import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Results() {
  const router = useRouter();
  const { q } = router.query;
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    if (!q) return;
    axios
      .get(`http://localhost:5000/api/compare?q=${q}`)
      .then(res => setPrices(res.data));
  }, [q]);

  return (
    <div className="p-10">
      <h2 className="text-xl font-bold mb-4">Results for "{q}"</h2>

      <table className="border w-full">
        <thead>
          <tr>
            <th className="border p-2">Platform</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Link</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((p, i) => (
            <tr key={i}>
              <td className="border p-2">{p.platform}</td>
              <td className="border p-2">
                {p.price ? `₹${p.price}` : "Not found"}
              </td>
              <td className="border p-2">
                <a className="text-blue-500" href={p.url} target="_blank">
                  Buy
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

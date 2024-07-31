import { useEffect, useState } from "react";
import localhost from "../config";
import { useTranslation } from "react-i18next";

export default function SizeGuide(data) {
  const [category, setCategory] = useState("");
  const [sizeGuide, setSizeGuide] = useState([]);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      setCategory(data.data.category.name);
      switch (data.data.category.name) {
        case "Colliers":
          const response_sizeNecklaces = await fetch(
            `${localhost}/api/sizeNecklaces`
          );
          if (response_sizeNecklaces.ok) {
            const data = await response_sizeNecklaces.json();
            setSizeGuide(data.sizeNecklaces);
          }
          break;
        case "Alliances":
        case "Bagues":
          const response_rings = await fetch(`${localhost}/api/sizeRings`);
          if (response_rings.ok) {
            const data = await response_rings.json();
            setSizeGuide(data.sizeRings);
          }
          break;
        case "Bracelets":
          const response_bracelets = await fetch(
            `${localhost}/api/sizeBracelets`
          );
          if (response_bracelets.ok) {
            const data = await response_bracelets.json();
            setSizeGuide(data.sizeBracelets);
          }
          break;
        default:
          setSizeGuide([]);
      }
    };
    fetchData();
  }, []);

  const openSizeGuide = () => {
    setIsSizeGuideOpen(true);
  };

  const closeSizeGuide = () => {
    setIsSizeGuideOpen(false);
  };
  return (
    <>
      {sizeGuide.length > 0 ? (
        <>
          <label htmlFor="size" className="block text-lg font-primary">
            {t("sizeGuidePage.tailleChoose")}
          </label>
          <select
            id="size"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
          >
            {sizeGuide.map((elem) => (
              <option value={elem.name}>{elem.name}</option>
            ))}
          </select>
          <button
            onClick={openSizeGuide}
            className="mt-2 text-sm text-blue-500 underline"
          >
            {t("sizeGuidePage.button")}
          </button>
        </>
      ) : (
        t("sizeGuidePage.error")
      )}

      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-4 max-w-lg max-h-full overflow-auto">
            <button
              onClick={closeSizeGuide}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>

            <div className="text-center">
              {sizeGuide.length > 0 ? (
                sizeGuide[0].diameter ? (
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">
                      {t("sizeGuidePage.guideRings")}
                    </h2>
                    <div className="flex">
                      <ul>
                        <li className="border px-4 py-2">
                          {t("sizeGuidePage.taille")}
                        </li>
                        {sizeGuide.map((elem) => (
                          <li className="border px-4 py-2">{elem.name}</li>
                        ))}
                      </ul>
                      <ul>
                        <li className="border px-4 py-2">
                          {t("sizeGuidePage.circonférence")}
                        </li>
                        {sizeGuide.map((elem) => (
                          <li className="border px-4 py-2">
                            {elem.circumference}
                          </li>
                        ))}
                      </ul>
                      <ul>
                        <li className="border px-4 py-2">
                          {t("sizeGuidePage.diamètre")}
                        </li>
                        {sizeGuide.map((elem) => (
                          <li className="border px-4 py-2">{elem.diameter}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : category === "Colliers" ? (
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">
                      {t("sizeGuidePage.guideNecklaces")}
                    </h2>
                    <div className="flex">
                      <ul>
                        <li className="border px-4 py-2">
                          {t("sizeGuidePage.taille")}
                        </li>
                        {sizeGuide.map((elem) => (
                          <li className="border px-4 py-2">{elem.name}</li>
                        ))}
                      </ul>
                      <ul>
                        <li className="border px-4 py-2">
                          {t("sizeGuidePage.longueur")}
                        </li>
                        {sizeGuide.map((elem) => (
                          <li className="border px-4 py-2">{elem.value}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">
                      {t("sizeGuidePage.guideBracelets")}
                    </h2>
                    <div className="flex">
                      <ul>
                        <li className="border px-4 py-2">
                          {t("sizeGuidePage.taille")}
                        </li>
                        {sizeGuide.map((elem) => (
                          <li className="border px-4 py-2">{elem.name}</li>
                        ))}
                      </ul>
                      <ul>
                        <li className="border px-4 py-2">
                          {t("sizeGuidePage.longueur")}
                        </li>
                        {sizeGuide.map((elem) => (
                          <li className="border px-4 py-2">{elem.value}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

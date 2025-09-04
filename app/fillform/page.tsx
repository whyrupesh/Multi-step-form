"use client";
import useProductForm from "@/store/page";

const StartForm = () => {
  const { step, setStep, product, updateProduct, reset } = useProductForm();

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-lg border rounded-xl shadow-lg p-6">
    
        {/* i have made small indicator here */}
        <div className="flex justify-between mb-6">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`flex-1 h-2 mx-1 rounded ${
                step >= s ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Step 1: Name */}
        {step === 1 && (
          <div>
            <h1 className="text-xl font-semibold mb-4">Step 1: Product Name</h1>
            <input
              className="w-full border rounded-lg p-3 mb-4"
              value={product.name}
              onChange={(e) => updateProduct({ name: e.target.value })}
              placeholder="Product Name"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={nextStep}
                className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Image */}
        {step === 2 && (
          <div>
            <h1 className="text-xl font-semibold mb-4">Step 2: Upload Image</h1>
            <input
              type="file"
              accept="image/*"
              className="w-full border rounded-lg p-3 mb-4"
              onChange={(e) =>
                updateProduct({ image: e.target.files ? e.target.files[0] : null })
              }
            />
            {product.image && (
              <p className="text-sm text-green-600">✅ Image selected</p>
            )}
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="bg-gray-300 px-5 py-2 rounded-lg hover:bg-gray-400"
              >
                ← Prev
              </button>
              <button
                onClick={nextStep}
                className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Price & Tax */}
        {step === 3 && (
          <div>
            <h1 className="text-xl font-semibold mb-4">Step 3: Pricing</h1>
            <h1>Product Price:</h1>
            <input
              type="number"
              className="w-full border rounded-lg p-3 mb-4"
              value={product.price}
              onChange={(e) => updateProduct({ price: Number(e.target.value) })}
              placeholder="Product Price"
            />
            <h1>Tax(%):</h1>
            <input
              type="number"
              className="w-full border rounded-lg p-3 mb-4"
              value={product.tax}
              onChange={(e) => updateProduct({ tax: Number(e.target.value) })}
              placeholder="Tax (%)"
            />
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="bg-gray-300 px-5 py-2 rounded-lg hover:bg-gray-400"
              >
                ← Prev
              </button>
              <button
                onClick={nextStep}
                className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Review & Submit */}
        {step === 4 && (
          <div>
            <h1 className="text-xl font-semibold mb-4">Step 4: Review</h1>
            <div className="border p-4 rounded-lg mb-4 space-y-2">
              <p>
                <strong>Name:</strong> {product.name}
              </p>
              <p>
                <strong>Price:</strong> ${product.price}
              </p>
              <p>
                <strong>Tax:</strong> {product.tax}%
              </p>
              <p>
                <strong>Image:</strong>{" "}
                {product.image ? product.image.name : "No file selected"}
              </p>
            </div>
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="bg-gray-300 px-5 py-2 rounded-lg hover:bg-gray-400"
              >
                ← Prev
              </button>
              <button
                onClick={() => {
                  alert("Form submitted!");
                  reset();
                }}
                className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600"
              >
                Submit ✔
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StartForm;

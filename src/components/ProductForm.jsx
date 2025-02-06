import { useState } from "react";

const ProductForm = ({ onSubmitData }) => {
    const [inputs, setInputs] = useState([{ id: 1, product: "", quantity: "" }]);
    const [date, setDate] = useState("");

    const handleAddInput = () => {
        setInputs([...inputs, { id: inputs.length + 1, product: "", quantity: "" }]);
    };

    const handleRemoveInput = (id) => {
        setInputs(inputs.filter((input) => input.id !== id));
    };

    const handleChange = (index, field, value) => {
        const newInputs = [...inputs];
        newInputs[index][field] = value;
        setInputs(newInputs);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmitData({ inputs, date }); // ✅ Send data along with date to GeminiModel
    };

    return (
        <div className="form-container">
            <h3>Waste Input Form</h3>
            <form onSubmit={handleSubmit}>
                {inputs.map((input, index) => (
                    <div key={input.id} className="input-group">
                        <input
                            type="text"
                            placeholder="Product (e.g., Banana Peels)"
                            value={input.product}
                            onChange={(e) => handleChange(index, "product", e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Quantity (e.g., 2 kg)"
                            value={input.quantity}
                            onChange={(e) => handleChange(index, "quantity", e.target.value)}
                            required
                        />
                        {inputs.length > 1 && (
                            <button type="button" className="remove-btn" onClick={() => handleRemoveInput(input.id)}>
                                ❌
                            </button>
                        )}
                    </div>
                ))}

                {/* 📅 Date Input Field */}
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />

                <button type="button" className="add-btn" onClick={handleAddInput}>
                    +
                </button>
                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    );
};

export default ProductForm;
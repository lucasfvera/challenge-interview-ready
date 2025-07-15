/**
Build an autocomplete component
ref: https://github.com/user-attachments/assets/da852701-94f4-48c7-bb32-3daad55cb8e9
- It should allow multiple selection with checkboxes
- Selected elements should show as tags with a button to delete the
  selection.
- Filtering by search text
- Toggle button for expand/collapse list

In a real interview situation you should be able to have the main
functionalities (without styles) in 60 minutes.




STEPS
1. Create a mocked list of items and show them in the screen
2. Add checkboxes and allow multiple selection
3. Submit selection and remove those from the list
4. Show the selected items in some other place (eventually the input)
5. Allow removing elements by clicking them and re-add them to the list
6. Build the input structure: label, input, and submit
7. Filter the results by user input
8. Show/Hide list with a toggle button

Nice to have
- Style the list
- Debounce the input in case we are actually fetching from an API

 */

import React from "react";
import "./App.css";
import "./normalize.css";

const fruits = [
  "Apple",
  "Banana",
  "Orange",
  "Strawberry",
  "Grape",
  "Watermelon",
  "Pineapple",
  "Mango",
  "Kiwi",
  "Blueberry",
  "Raspberry",
  "Peach",
  "Pear",
  "Plum",
  "Cherry",
  "Lemon",
  "Lime",
  "Avocado",
  "Pomegranate",
  "Coconut",
];

export default function App() {
  const [selectedFruits, setSelectedFruits] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [showList, setShowList] = React.useState(false);
  const localFruits = [...fruits];

  const handleSubmit = (e) => {
    e.preventDefault();
    const formValues = new FormData(e.target);
    let fruitsToAdd = [];
    // When submitting checkboxes we get [name,state]
    for (const checkedFruit of formValues.keys()) {
      fruitsToAdd.push(checkedFruit);
    }
    setSelectedFruits((prev) => [...prev, ...fruitsToAdd]);
  };

  const removeSelectedFruit = (id) => {
    const newSelection = selectedFruits.filter((sel) => sel !== id);
    setSelectedFruits(newSelection);
  };

  return (
    <div>
      <input
        type="text"
        name="searchTerm"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      <div>
        <p>Selected Fruits</p>
        {selectedFruits.map((selected) => (
          <button
            key={selected}
            onClick={() => removeSelectedFruit(selected)}
            className="chip"
          >
            {selected}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="toggle" onClick={() => setShowList((prev) => !prev)}>
          Fruits
          {(showList || searchTerm.length > 0) && (
            <>
              <ul>
                {localFruits
                  .filter((f) => !selectedFruits.includes(f))
                  .filter((fr) => fr.toLocaleLowerCase().startsWith(searchTerm))
                  .map((fruit) => (
                    <label key={fruit}>
                      <input type="checkbox" id={fruit} name={fruit} />
                      {fruit}
                    </label>
                  ))}
              </ul>
              <button>Confirm selection</button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

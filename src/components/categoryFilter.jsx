const categories = [
  ,
  "all",
  "Face",
  "Eye",
  "Lip",
  "Cheek",
  "Value & Gift Sets",
  "Makeup Palettes",
  "Brushes & Applicators",
  "Accessories",
  "Nail",
  "Mini Size",
  "Vegan",
];

function CategoryFilter({ catFilter, setCatFilter }) {
  return (
    <fieldset>
      <legend>
        <strong>Category</strong>
      </legend>
      {categories.map((cat) => (
        <label htmlFor={cat} key={cat}>
          {cat}
          <input
            type="radio"
            name="categories"
            id={cat}
            value={cat}
            checked={cat === catFilter}
            onChange={(e) => setCatFilter(e.target.value)}
          />
        </label>
      ))}
    </fieldset>
  );
}

export default CategoryFilter;

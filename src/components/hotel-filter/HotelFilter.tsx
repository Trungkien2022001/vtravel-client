// components/Filters.js

export default function Filters({ filters, setFilters }) {
    const handleFilterChange = (event) => {
      setFilters({
        ...filters,
        [event.target.name]: event.target.value,
      });
    };
  
    return (
      <div className="w-64 bg-white border p-4 rounded-lg shadow-sm">
        <h2 className="text-lg font-bold mb-4">Filters</h2>
  
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Stars</h3>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <label key={star} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="stars"
                  value={star}
                  onChange={handleFilterChange}
                  className="form-checkbox"
                />
                <span>{star} Stars</span>
              </label>
            ))}
          </div>
        </div>
  
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Budget</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="budget"
                value="0-100"
                onChange={handleFilterChange}
                className="form-radio"
              />
              <span>Less than USD 100</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="budget"
                value="100-500"
                onChange={handleFilterChange}
                className="form-radio"
              />
              <span>USD 100 - USD 500</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="budget"
                value="500-1000"
                onChange={handleFilterChange}
                className="form-radio"
              />
              <span>USD 500 - USD 1000</span>
            </label>
          </div>
        </div>
  
        <div>
          <h3 className="font-semibold mb-2">Nearby Locations</h3>
          <div className="space-y-2">
            {['Central Fish Market', 'Shorbanty House', 'Fakieh Aquarium'].map(
              (location) => (
                <label key={location} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="location"
                    value={location}
                    onChange={handleFilterChange}
                    className="form-checkbox"
                  />
                  <span>{location}</span>
                </label>
              )
            )}
          </div>
        </div>
      </div>
    );
  }
  
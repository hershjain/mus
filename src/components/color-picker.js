import React, { useState, useRef } from 'react';
import { SketchPicker } from 'react-color';

const ColorPicker = ({ color, onChange }) => {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);

  // Toggle picker visibility
  const handleClick = () => setShowPicker(!showPicker);

  // Handle color change and hide picker after selection
  const handleChange = (newColor) => {
    onChange(newColor.hex);
    setShowPicker(false); // Close after selecting
  };

  // Close picker when clicking outside
  const handleClickOutside = (e) => {
    if (pickerRef.current && !pickerRef.current.contains(e.target)) {
      setShowPicker(false);
    }
  };

  // Attach event listener to close on outside click
  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div style={{ display: 'inline-block', margin: '0 10px' }}>
      {/* Color display box */}
      <div
        onClick={handleClick}
        style={{
          width: '24px',
          height: '24px',
          borderRadius: '4px',
          backgroundColor: color,
          border: '1px solid #ccc',
          cursor: 'pointer',
        }}
      ></div>

      {/* Color picker with preset colors */}
      {showPicker && (
        <div ref={pickerRef} style={{ position: 'absolute', zIndex: 2 }}>
          <SketchPicker
            color={color}
            onChange={handleChange}
            presetColors={['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33A6']}
            disableAlpha
            styles={{
              default: {
                picker: {
                  boxShadow: 'none',
                  padding: '8px',
                  width: '160px',
                },
                controls: {
                  display: 'none',
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;

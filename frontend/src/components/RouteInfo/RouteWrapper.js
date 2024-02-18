import * as React from 'react';
import RouteInfo from './RouteInfo'; 

export default function RouteWrapper() {
  const accordionData = [
    { id: 1, risk: 'Low', time: '5 minutes', percentPlowed: '80' },
    { id: 2, risk: 'High', time: '12 minutes', percentPlowed: '30' },
    { id: 3, risk: 'High', time: '15 minutes', percentPlowed: '20' },
    { id: 3, risk: 'Medium', time: '50 minutes', percentPlowed: '20' },
    // Add more items as needed
  ];

  const handleAccordionButtonClick = (id) => {
    // Handle the button click in RouteWrapper, you can emit the id or perform any other action
    console.log(`Button clicked for Accordion ${id} in RouteWrapper`);
  };

  return (
    <div>
      <RouteInfo accordionData={accordionData} onAccordionButtonClick={handleAccordionButtonClick} />
    </div>
  );
}

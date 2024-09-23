import { Button } from "@/components/ui/button";

const BusSelect = ({ setSelectedBuses, selectedBuses, buses }) => {
 
  const handleBusClick = (busId) => {
    if (busId === "all") {
      if (!selectedBuses.includes("all")) {
        // If 'All Buses' is clicked, set 'all' as the only selected
        setSelectedBuses(["all"]);
      }
    } else {
      // Toggle the bus selection
      setSelectedBuses((prevSelectedBuses) => {
        // If 'all' is selected, deselect it when a specific bus is selected
        let filteredSelection = prevSelectedBuses.filter((b) => b !== "all");

        // Check if the bus is already selected
        if (filteredSelection.includes(busId)) {
          // If it's already selected, remove it from the array
          filteredSelection = filteredSelection.filter((b) => b !== busId);
          if (filteredSelection.length === 0) {
            return ["all"];
          }
          return filteredSelection;
        } else {
          // If it's not selected, add it to the array
          return [...filteredSelection, busId];
        }
      });
    }
  };
  return (
    <div className="grid grid-cols-5 gap-2">
      <Button
        variant={selectedBuses.includes("all") ? "contained" : "outline"}
        color="info"
        className="col-span-1 lg:col-span-1"
        onClick={() => handleBusClick("all")}
      >
        All Buses
      </Button>
      {buses.map((bus) => (
        <Button
          key={bus.macAddress}
          variant={
            selectedBuses.includes(bus.macAddress) ? "contained" : "outline"
          }
          color="primary"
          className="col-span-1 lg:col-span-1"
          onClick={() => handleBusClick(bus.macAddress)}
        >
          {bus.busName}
        </Button>
      ))}
    </div>
  );
};

export default BusSelect;

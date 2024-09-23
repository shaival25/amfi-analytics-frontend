"use client";
import ReportsSnapshot from "./components/reports-snapshot";
import ReportsArea from "./components/reports-area";
import BusSelect from "./components/bus-select";
import HeatMapArea from "./components/heat-maps/heat-map";
import UserInteractions from "./components/user-interactions/user-interactions";
import FeedBackInsights from "./components/feedback-insights/feedbackInsights";
import HeapMapDatePicker from "./components/heat-maps/date-picker";
import HeapMapTimeSlot from "./components/heat-maps/time-slot";
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Cookies from "js-cookie";
import handleError from "@/validation/unauthorized";
import { useRouter } from "next/navigation";
import { MFLogo } from "@/components/svg";
import { BeatLoader } from "react-spinners";

const DashboardPageView = () => {
  const [selectedBuses, setSelectedBuses] = useState(["all"]);
  const [date, setDate] = useState(new Date());
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);

  const dashboardRef = useRef();
  const [showPrintLogo, setShowPrintLogo] = useState(false);
  const [backgroundBlur, setBackgroundBlur] = useState(false);
  const [buses, setBuses] = useState([]);
  const [heatMaps, setHeatMaps] = useState([]);
  const router = useRouter();

  const [feedbackInsights, setFeedBackInsights] = useState({});

  const fetchHeatMaps = async () => {
    try {
      const formattedDate = date.toLocaleDateString("en-CA");
      const timeSlotsArray = Object.keys(selectedTimeSlots).filter(
        (timeSlot) => selectedTimeSlots[timeSlot]
      );
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/heat-map`,
        {
          selectedBuses: selectedBuses,
          selectedDate: formattedDate,
          selectedTimeSlots: timeSlotsArray.map((slot) => {
            const [start, end] = slot.split(" - ");
            return `${start}:00`;
          }),
        },
        {
          headers: {
            "x-auth-token": Cookies.get("authToken"),
          },
        }
      );

      if (response.status === 200) {
        setHeatMaps(response.data.heatMaps);
      }
    } catch (error) {
      handleError(error, router);
    }
  };

  useEffect(() => {
    fetchHeatMaps();
  }, [selectedBuses, date, selectedTimeSlots]);

  const fetchFeedbackInsights = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/analytics/feedback-insights`,
      {
        selectedBuses,
      },
      {
        headers: {
          "x-auth-token": Cookies.get("authToken"),
        },
      }
    );
    if (response.status === 200) {
      setFeedBackInsights(response.data);
    }
  };

  useEffect(() => {
    fetchFeedbackInsights();
  }, [selectedBuses]);

  const fetchAllBuses = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/bus`,
        {
          headers: {
            "x-auth-token": Cookies.get("authToken"),
          },
        }
      );
      if (response.status === 200) {
        setBuses(response.data);
      }
    } catch (error) {
      handleError(error, router);
    }
  };
  useEffect(() => {
    fetchAllBuses();
  }, []);

  const getSelectedBusNames = () => {
    if (selectedBuses.includes("all")) return ["All Buses"];

    return buses
      .filter((bus) => selectedBuses.includes(bus.macAddress))
      .map((bus) => bus.busName);
  };

  const handlePrint = useReactToPrint({
    content: () => dashboardRef.current,
    documentTitle: `Dashboard Report - ${getSelectedBusNames().join(
      ", "
    )} - ${new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }).format(new Date())}`,
    copyStyles: true,
    pageStyle: ``,
    onBeforePrint: () => {
      setShowPrintLogo(false);
    },
    onAfterPrint: () => {
      setShowPrintLogo(false), setBackgroundBlur(false);
    },
  });

  const displayLogo = () => {
    setBackgroundBlur(true);

    setTimeout(() => {
      setShowPrintLogo(true);
    }, 100);
    setTimeout(() => {
      handlePrint();
    }, 1001);
  };

  return (
    <div style={{ position: "relative" }}>
      <div className="space-y-6" ref={dashboardRef}>
        {showPrintLogo && (
          <div
            className="print-logo"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <MFLogo height="100px" width="500px" />
          </div>
        )}
        <div className="flex items-center flex-wrap justify-between gap-4">
          <div className="text-2xl font-medium text-default-800 ">
            Analytics
          </div>
          {!showPrintLogo && (
            <Button
              onClick={displayLogo}
              className="btn btn-primary"
              style={{ backgroundColor: "#35C2DB", marginTop: "20px" }}
            >
              Export to PDF
            </Button>
          )}
        </div>
        {!showPrintLogo && (
          <BusSelect
            selectedBuses={selectedBuses}
            setSelectedBuses={setSelectedBuses}
            buses={buses}
          />
        )}

        {/* reports area */}
        <div className="grid grid-cols-1  gap-2 ">
          <div className="col-span-1 lg:col-span-1">
            <ReportsSnapshot selectedBuses={selectedBuses} />
          </div>
        </div>
        <div className="grid grid-cols-3  gap-2 ">
          <ReportsArea selectedBuses={selectedBuses} />
        </div>
        <UserInteractions selectedBuses={selectedBuses} />
        <Card>
          <CardHeader>Feedback Insights</CardHeader>
          <CardContent>
            <FeedBackInsights feedbackInsights={feedbackInsights} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-none pb-0">
            <div className="flex items-center gap-2 flex-wrap ">
              <div className="flex-1">
                <div className="text-xl font-semibold text-default-800">
                  Heat Maps
                </div>
              </div>
              <div className="flex gap-2">
                <HeapMapTimeSlot
                  selectedTimeSlots={selectedTimeSlots}
                  setSelectedTimeSlots={setSelectedTimeSlots}
                />
                <HeapMapDatePicker date={date} setDate={setDate} />
              </div>
            </div>
          </CardHeader>
          <CardContent className=" mb-2">
            <HeatMapArea
              className="grid grid-cols-4 gap-2 mt-2"
              heatMaps={heatMaps}
            />
          </CardContent>
        </Card>
      </div>
      {backgroundBlur && (
        <div
          style={{
            height: "100%",
            width: "100%",
            backdropFilter: "blur(50px)",
            position: "absolute",
            top: "0",
            left: "0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "25%",
            fontWeight: "bold",
            fontSize: "24px",
            gap: "20px",
          }}
        >
          Hang on we are preparing your data
          <BeatLoader color="#16A34A" />
        </div>
      )}
    </div>
  );
};

export default DashboardPageView;

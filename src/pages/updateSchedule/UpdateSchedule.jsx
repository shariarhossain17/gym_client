import React, { useState } from "react";

import "react-clock/dist/Clock.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLoaderData, useParams } from "react-router-dom";
import Swal from "sweetalert2";
const formatTime12Hour = (date) => {
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return `${hours}:${minutes}:${seconds} ${ampm}`;
};

const UpdateSchedule = () => {
  const data = useLoaderData();
  const { id } = useParams();
  const [startDate, setStartDate] = useState(data?.formattedDate);
  const [selectedTime, setSelectedTime] = useState(data?.formatHour);
  const [scheduleData, setScheduleData] = useState(data);

  const [title, setTitle] = useState(data?.title);
  const [day, setDay] = useState(data?.day);

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };
  const handleUpdateSchedule = (e) => {
    e.preventDefault();

    const updateData = {
      title,
      day,
      formattedDate: startDate,
    };
    fetch(`http://localhost:8800/schedule/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("data updateed");
      })
      .catch((error) => console.error("Error updating status:", error));
  };

  return (
    <div>
      <div className="bg-[#F4F3F0] lg:p-24">
        <h2 className="text-3xl text-center font-bold">Update Gym Schedule</h2>
        <form onSubmit={handleUpdateSchedule}>
          <div className="flex gap-6 ">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text font-bold">Title</span>
              </label>
              <input
                type="text"
                name="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control lg:w-1/2 mt-6 md:mt-0">
              <label className="label font-bold">
                <span className="label-text">Day</span>
              </label>
              <DatePicker
                className="input input-bordered w-full"
                value={startDate}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </div>
          <div className="flex gap-6 ">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text font-bold">Day</span>
              </label>

              <select
                value={day}
                className="input input-bordered "
                name="day"
                id="day"
                onChange={(e) => setDay(e.target.value)}
              >
                <option value="sunday">Sunday</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
              </select>
            </div>
            <div className="form-control lg:w-1/2 mt-6 md:mt-0">
              <label className="label font-bold">
                <span className="label-text">Time</span>
              </label>

              <DatePicker
                className="input input-bordered w-full"
                readOnly
                value={selectedTime}
                onChange={handleTimeChange}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </div>
          </div>

          {/* End of Labels */}
          <input
            type="submit"
            value="Update Schedule"
            className="btn w-full bg-pink-500 text-white mt-6"
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateSchedule;
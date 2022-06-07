import Head from "next/head";
import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import logo from "../assets/images/logo.jpg";
import DatePicker from "react-datepicker";
import moment from "moment";
import styles from "../styles/Home.module.css";
import styless from "../styles/Navbar.module.css";
import * as Inputs from "../inputs/inputFields";
import { OriginPlace } from "../data/originPlaceData";
import { DestintionPlace } from "../data/destinitionPlaceData";
import { Trips } from "../data/tripsData";
import { GiAirplaneDeparture } from "react-icons/gi";
import { GiAirplaneArrival } from "react-icons/gi";
import { GiDuration } from "react-icons/gi";
import { FaDollarSign } from "react-icons/fa";
import { VscSearch } from "react-icons/vsc";
import { MdDateRange } from "react-icons/md";

export default function Home() {
  let priceSearch;
  let durationSearch;
  let pricrdurationSearch;

  const [filte_price, setFilterPrice] = useState("");
  const [filte_duration, setFilterDuration] = useState("");
  const [start_date, setStartDate] = useState(null);
  const [end_date, setEndDate] = useState(null);
  const [origin_place, setOriginPlace] = useState();
  const [dest_place, setDestintionPlace] = useState();
  const [found, setFound, , getFound] = useState(false);
  const [trpiz, setTripz] = useState(Trips);
  useEffect(() => {}, [
    start_date,
    end_date,
    trpiz,
    filte_duration,
    filte_price,
    found,
    priceSearch,
    durationSearch,
  ]);

  const searchPrice = (event) => {
    setFilterPrice(event.target.value);
  };

  const searchDuration = (event) => {
    setFilterDuration(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    for (var i = 0; i < Trips.length; i++) {
      if (
        Trips[i].originPlaceValue === origin_place &&
        Trips[i].destintionPlace === dest_place &&
        Trips[i].startDate === moment(start_date).format("YYYY-MM-DD") &&
        Trips[i].endDate === moment(end_date).format("YYYY-MM-DD")
      ) {
        setFound(true);
        setTripz([Trips[i]]);
        break;
      } else {
        setTripz([]);
      }
    }
  };
  const startSearch = () => {
    if (filte_price != "" && filte_duration != "") {
      pricrdurationSearch = Trips.filter(
        (trip) => trip.price <= filte_price && trip.duration == filte_duration
      );
      console.log(pricrdurationSearch);
      setTripz(pricrdurationSearch);
    } else if (filte_price != "") {
      console.log(filte_price);
      priceSearch = Trips.filter((trip) => trip.price <= filte_price);
      console.log(priceSearch);
      setTripz(priceSearch);
    } else if (filte_duration != "") {
      console.log(filte_price);
      durationSearch = Trips.filter((trip) => trip.duration == filte_duration);
      console.log(durationSearch);
      setTripz(durationSearch);
    }
    setFilterPrice("");
    setFilterDuration("");
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Flight System</title>
        <meta name="Flight System" content="Flight System" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.backgroundheader}>
          <div className={styless.navbarup}>
            <a>
              <Image src={logo} alt="" />
            </a>
            <div
              className="container"
              style={{ marginRight: "0px", marginLeft: "0px" }}
            >
              <div className="row">
                <div className="col-12 col-md-3">
                  <Inputs.DropdownButton
                    data={OriginPlace}
                    placeholde="Origin Place"
                    value={origin_place}
                    onChange={(event) => setOriginPlace(event.target.value)}
                  />
                </div>

                <div className="col-12 col-md-3">
                  {" "}
                  <Inputs.DropdownButton
                    data={DestintionPlace}
                    placeholde="Destintion Place"
                    value={dest_place}
                    onChange={(event) => setDestintionPlace(event.target.value)}
                  />
                </div>
                <div
                  className="col-12 col-md-3"
                  style={{ marginBottom: "0.5rem", textAlign: "initial" }}
                >
                  <DatePicker
                    placeholderText="Depart Date"
                    dateFormat="dd/MM/yyyy"
                    value={start_date}
                    selected={start_date}
                    onChange={(date) => {
                      setStartDate(date);
                      console.log(
                        "start date is" + moment(date).format("YYYY-MM-DD")
                      );
                    }}
                  />
                </div>
                <div
                  className="col-12 col-md-3"
                  style={{ marginBottom: "0.5rem", textAlign: "initial" }}
                >
                  {" "}
                  <DatePicker
                    placeholderText="Return Date"
                    dateFormat="dd/MM/yyyy"
                    selected={end_date}
                    value={end_date}
                    onChange={(date) => {
                      setEndDate(date);
                      console.log(
                        "end date is" + moment(date).format("YYYY-MM-DD")
                      );
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={styless.containersearch}>
              <Inputs.InputButton
                value="Search"
                className="searchbutton"
                onClick={onSubmit}
              />
            </div>
          </div>
          <div className={styless.navbarbottom}>
            <a>
              <VscSearch />
            </a>
            <div
              className="container"
              style={{ marginRight: "0px", marginLeft: "15px" }}
            >
              <div className="row">
                <div className="col-6 col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Max Price"
                    value={filte_price}
                    onChange={searchPrice}
                  />
                </div>
                <div className="col-6 col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Duration"
                    value={filte_duration}
                    onChange={searchDuration}
                  />
                </div>
              </div>
            </div>
            <Inputs.InputButton
              className="filterbutton"
              value="Filter"
              onClick={startSearch}
            />
          </div>
        </div>
        <div className="container">
          <div className="row">
            {trpiz.length >= 0 ? (
              trpiz.map((trip, index) => {
                return (
                  <div
                    className="col-md-4"
                    style={{ marginBottom: "1rem" }}
                    key={trip.id}
                  >
                    <div className="col">
                      <div className="card">
                        <Image
                          src={"/" + `${trip.img}`}
                          height={200}
                          width={200}
                          alt=""
                        />
                        <div className="card-body">
                          <h5 className="card-title">
                            <GiAirplaneDeparture />
                            From : {trip.originPlaceValue}
                          </h5>
                          <h5>
                            <GiAirplaneArrival />
                            To : {trip.destintionPlace}
                          </h5>
                          <h6 className="card-title">
                            {" "}
                            <GiDuration />
                            Duration : {trip.duration}
                          </h6>

                          <h6 className="card-title">
                            {" "}
                            <FaDollarSign />
                            Price : {trip.price}
                          </h6>
                          <h6 className="card-title">
                            {" "}
                            <MdDateRange />
                            Start Date : {trip.startDate}
                          </h6>
                          <h6 className="card-title">
                            {" "}
                            <MdDateRange />
                            End Date : {trip.endDate}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

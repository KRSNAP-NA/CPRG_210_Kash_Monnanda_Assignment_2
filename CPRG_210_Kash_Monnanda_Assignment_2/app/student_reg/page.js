"use client";

import { useActionState, useEffect, useState } from "react";
import { registerStudent } from "./actions";

const initialState = { errors: {}, message: "" };

export default function StudentRegPage() {
  const [state, formAction, isPending] = useActionState(registerStudent, initialState);
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({ status: "idle", data: null, message: "" });

  useEffect(() => {
    const normalizedCity = city.trim();
    if (normalizedCity.length < 2) {
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(async () => {
      setWeather({ status: "loading", data: null, message: "" });

      try {
        const response = await fetch(
          `/api/weather?city=${encodeURIComponent(normalizedCity)}`,
          { signal: controller.signal }
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Weather could not be retrieved.");
        }

        setWeather({ status: "success", data, message: "" });
      } catch (error) {
        if (error.name !== "AbortError") {
          setWeather({
            status: "error",
            data: null,
            message: error.message || "Weather could not be retrieved.",
          });
        }
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [city]);

  const fieldError = (name) =>
    state.errors?.[name] ? (
      <p id={`${name}-error`} className="form-error">
        {state.errors[name]}
      </p>
    ) : null;

  const inputClassName = "form-control";

  return (
    <section className="registration-page">
      <div className="registration-intro">
        <p className="eyebrow">
          <span aria-hidden="true">🍂</span> Thanksgiving edition
        </p>
        <h1 className="registration-title">Student registration</h1>
        <p className="registration-subtitle">
          Create your student profile and connect with your campus community.
          Wishing you a warm and happy Thanksgiving.
        </p>
      </div>

      <form action={formAction} className="registration-form">
        {state.message && (
          <p role="alert" className="form-alert">
            {state.message}
          </p>
        )}

        <section className="form-section" aria-labelledby="personal-heading">
          <div className="form-section-heading">
            <span className="form-section-number" aria-hidden="true">01</span>
            <div>
              <h2 id="personal-heading" className="form-section-title">Personal details</h2>
              <p className="form-section-description">The basics so classmates know who you are.</p>
            </div>
          </div>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="firstName" className="form-label">First name</label>
              <input id="firstName" name="firstName" autoComplete="given-name" required className={inputClassName} aria-invalid={Boolean(state.errors?.firstName)} aria-describedby={state.errors?.firstName ? "firstName-error" : undefined} placeholder="e.g. Jordan" />
              {fieldError("firstName")}
            </div>
            <div className="form-field">
              <label htmlFor="lastName" className="form-label">Last name</label>
              <input id="lastName" name="lastName" autoComplete="family-name" required className={inputClassName} aria-invalid={Boolean(state.errors?.lastName)} aria-describedby={state.errors?.lastName ? "lastName-error" : undefined} placeholder="e.g. Lee" />
              {fieldError("lastName")}
            </div>
            <div className="form-field">
              <label htmlFor="email" className="form-label">Email address</label>
              <input id="email" name="email" type="email" autoComplete="email" required className={inputClassName} aria-invalid={Boolean(state.errors?.email)} aria-describedby={state.errors?.email ? "email-error" : undefined} placeholder="you@example.com" />
              {fieldError("email")}
            </div>
            <div className="form-field">
              <label htmlFor="phone" className="form-label">Phone number <span className="form-optional">Optional</span></label>
              <input id="phone" name="phone" type="tel" autoComplete="tel" className={inputClassName} placeholder="(403) 555-0123" />
            </div>
          </div>
        </section>

        <section className="form-section" aria-labelledby="academic-heading">
          <div className="form-section-heading">
            <span className="form-section-number" aria-hidden="true">02</span>
            <div>
              <h2 id="academic-heading" className="form-section-title">Your studies</h2>
              <p className="form-section-description">Share what you are studying and where you are in your program.</p>
            </div>
          </div>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="program" className="form-label">Program</label>
              <input id="program" name="program" required className={inputClassName} aria-invalid={Boolean(state.errors?.program)} aria-describedby={state.errors?.program ? "program-error" : undefined} placeholder="e.g. Software Development" />
              {fieldError("program")}
            </div>
            <div className="form-field">
              <label htmlFor="year" className="form-label">Year of study</label>
              <select id="year" name="year" required defaultValue="" className={inputClassName} aria-invalid={Boolean(state.errors?.year)} aria-describedby={state.errors?.year ? "year-error" : undefined}>
                <option value="" disabled>Select your year</option>
                {[1, 2, 3, 4, 5].map((year) => (
                  <option key={year} value={year}>Year {year}</option>
                ))}
              </select>
              {fieldError("year")}
            </div>
            <div className="form-field">
              <label htmlFor="idNumber" className="form-label">Student ID number</label>
              <input id="idNumber" name="idNumber" minLength={9} maxLength={9} required className={inputClassName} aria-invalid={Boolean(state.errors?.idNumber)} aria-describedby={state.errors?.idNumber ? "idNumber-error" : "idNumber-hint"} placeholder="9 characters" />
              {fieldError("idNumber")}
              {!state.errors?.idNumber && <p id="idNumber-hint" className="form-section-description">Enter your 9-character student ID.</p>}
            </div>
          </div>
        </section>

        <section className="form-section" aria-labelledby="address-heading">
          <div className="form-section-heading">
            <span className="form-section-number" aria-hidden="true">03</span>
            <div>
              <h2 id="address-heading" className="form-section-title">Location</h2>
              <p className="form-section-description">Your address helps complete your student profile.</p>
            </div>
          </div>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="streetAddress" className="form-label">Street address</label>
              <input id="streetAddress" name="streetAddress" autoComplete="street-address" required className={inputClassName} aria-invalid={Boolean(state.errors?.streetAddress)} aria-describedby={state.errors?.streetAddress ? "streetAddress-error" : undefined} placeholder="Street and number" />
              {fieldError("streetAddress")}
            </div>
            <div className="form-field">
              <label htmlFor="city" className="form-label">City</label>
              <input
                id="city"
                name="city"
                autoComplete="address-level2"
                required
                value={city}
                onChange={(event) => {
                  setCity(event.target.value);
                  setWeather({ status: "idle", data: null, message: "" });
                }}
                className={inputClassName}
                aria-invalid={Boolean(state.errors?.city)}
                aria-describedby={state.errors?.city ? "city-error" : undefined}
                placeholder="e.g. Calgary"
              />
              {fieldError("city")}
            </div>
            <div className="form-field">
              <label htmlFor="province" className="form-label">Province</label>
              <input id="province" name="province" autoComplete="address-level1" required className={inputClassName} aria-invalid={Boolean(state.errors?.province)} aria-describedby={state.errors?.province ? "province-error" : undefined} placeholder="e.g. Alberta" />
              {fieldError("province")}
            </div>
            <div className="form-field">
              <label htmlFor="postalCode" className="form-label">Postal code</label>
              <input id="postalCode" name="postalCode" autoComplete="postal-code" required pattern="[A-Za-z][0-9][A-Za-z][ -]?[0-9][A-Za-z][0-9]" title="Enter a Canadian postal code, such as T2P 0W4." className={inputClassName} aria-invalid={Boolean(state.errors?.postalCode)} aria-describedby={state.errors?.postalCode ? "postalCode-error" : undefined} placeholder="e.g. T2P 0W4" />
              {fieldError("postalCode")}
            </div>
          </div>
        </section>

        <div
          aria-live="polite"
          className={`weather-panel${weather.status === "error" ? " weather-error" : ""}`}
        >
          <span className="weather-icon" aria-hidden="true">☼</span>
          <span>
            {weather.status === "loading" && `Checking the weather in ${city.trim()}...`}
            {weather.status === "error" && weather.message}
            {weather.status === "success" && `Weather in ${weather.data.city}: ${weather.data.description}, ${weather.data.temperature}°C`}
            {weather.status === "idle" && "Enter a city to see its current weather here."}
          </span>
        </div>

        <div className="form-actions">
          <p className="form-note">Fields marked required must be completed.</p>
          <button type="submit" disabled={isPending} className="submit-button">
            {isPending ? "Adding your profile..." : "Create my profile"}
            {!isPending && <span aria-hidden="true">→</span>}
          </button>
        </div>
      </form>
    </section>
  );
}

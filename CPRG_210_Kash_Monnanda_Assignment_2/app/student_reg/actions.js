"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import db from "../lib/database";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const canadianPostalCodePattern = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

export async function registerStudent(previousState, formData) {
  const student = {
    firstName: String(formData.get("firstName") ?? "").trim(),
    lastName: String(formData.get("lastName") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    program: String(formData.get("program") ?? "").trim(),
    year: String(formData.get("year") ?? "").trim(),
    idNumber: String(formData.get("idNumber") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    streetAddress: String(formData.get("streetAddress") ?? "").trim(),
    city: String(formData.get("city") ?? "").trim(),
    province: String(formData.get("province") ?? "").trim(),
    postalCode: String(formData.get("postalCode") ?? "").trim().toUpperCase(),
  };
  const errors = {};

  for (const field of [
    "firstName",
    "lastName",
    "email",
    "program",
    "year",
    "idNumber",
    "streetAddress",
    "city",
    "province",
    "postalCode",
  ]) {
    if (!student[field]) errors[field] = "This field is required.";
  }

  if (student.email && !emailPattern.test(student.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (student.postalCode && !canadianPostalCodePattern.test(student.postalCode)) {
    errors.postalCode = "Enter a valid Canadian postal code, such as T2P 0W4.";
  }
  if (student.year && !["1", "2", "3", "4", "5"].includes(student.year)) {
    errors.year = "Select a valid year.";
  }
  if (student.idNumber && student.idNumber.length !== 9) {
    errors.idNumber = "Student ID must be exactly 9 characters long.";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, message: "Please correct the highlighted fields." };
  }

  try {
    await db.execute(
      `INSERT INTO students
        (first_name, last_name, email, phone, street_address, city, province_state,
         country, postal_code, program, year, id_number)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        student.firstName,
        student.lastName,
        student.email,
        student.phone || null,
        student.streetAddress,
        student.city,
        student.province,
        "Canada",
        student.postalCode,
        student.program,
        student.year,
        student.idNumber,
      ]
    );
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return {
        errors: {},
        message: "A student with this email address or ID number is already registered.",
      };
    }

    console.error("Failed to register student:", error);
    return {
      errors: {},
      message: "Registration could not be saved. Please check the database connection and try again.",
    };
  }

  revalidatePath("/");
  redirect("/");
}

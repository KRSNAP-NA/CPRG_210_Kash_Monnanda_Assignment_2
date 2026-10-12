# Student Management

A Next.js student directory and registration app. Registration is handled with a
Server Action, records are stored in MySQL, and the form displays current weather
for the entered city using a server-side OpenWeatherMap API key.

## Requirements

- Node.js and npm
- MySQL
- An OpenWeatherMap API key

## Setup

1. Install packages:

   ```bash
   npm install
   ```

2. Use the MySQL database and table provided by our instructor. Apply
   `database/migrations/001_add_student_id_number.sql` to add the Student ID
   field required by the registration form.

3. Set your MySQL connection values and `OPENWEATHER_API_KEY` in `.env.local`.
   Keep `.env.local` private; it is ignored by Git. The weather key is used only
   on the server and is not exposed to the browser.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

The home page shows student records from MySQL and fills any remaining places up
to six with sample students. Successful registration saves the student and
redirects to the directory.

## Styling references and acknowledgements

- **AI styling assistance:** GitHub Copilot in VS Code was used to help create
  the original responsive layouts, component styling, and Thanksgiving color
  palette for this project. The resulting styles are in `app/globals.css`.
- **Next.js:** [CSS in the App Router](https://nextjs.org/docs/app/getting-started/css)
  was consulted for how to organize and load global CSS.
- **Tailwind CSS:** [Tailwind CSS documentation](https://tailwindcss.com/docs)
  was consulted as a reference for the project's existing Tailwind CSS setup.
- **SAIT visual reference:** [SAIT's public website](https://www.sait.ca/)
  informed the red-and-white institutional palette and straightforward
  information layout. This is an unofficial student project; it does not use
  SAIT's logo or represent SAIT. Warm gold and autumn accents were added for
  the Thanksgiving theme.
- **Images:** Student photos are the existing local assets in
  `public/students/`.

No external design template or downloaded theme assets were used; the visual
design was created for this project with AI assistance.

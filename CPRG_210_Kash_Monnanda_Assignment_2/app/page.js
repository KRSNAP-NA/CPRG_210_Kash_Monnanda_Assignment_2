import { connection } from 'next/server';
import db from './lib/database';
import sampleStudents from './data/students';
import StudentCard from './components/StudentCard';
import Link from 'next/link';

export default async function Home() {
  await connection();

  let databaseStudents = [];
  let databaseError = false;

  try {
    const [rows] = await db.query('SELECT * FROM students ORDER BY 1 DESC');
    databaseStudents = rows.map((student, index) => ({
      id: student.student_id ?? student.id ?? student.id_number ?? `student-${index}`,
      name: `${student.first_name} ${student.last_name}`,
      program: student.program,
      year: student.year,
      email: student.email,
      phone: student.phone,
      image: `/students/student_${(index % 6) + 1}.jpg`,
    }));
  } catch (error) {
    console.warn('Failed to load students from the database:', error.code ?? error.message);
    databaseError = true;
  }

  const demoStudents = sampleStudents.filter(
    (sample) =>
      !databaseStudents.some(
        (student) => student.name.toLowerCase() === sample.name.toLowerCase()
      )
  );
  const students =
    databaseStudents.length >= 6
      ? databaseStudents
      : [...databaseStudents, ...demoStudents.slice(0, 6 - databaseStudents.length)];

  return (
    <section className="directory-page">
      <div className="welcome-panel">
        <div className="welcome-copy">
          <p className="eyebrow">Grateful for our community</p>
          <h1 className="welcome-title">Thankful for the people who make campus feel like home.</h1>
          <p className="welcome-description">
            Celebrate the classmates who make our campus brighter. Get to know
            the people learning, creating, and growing alongside you.
          </p>
          <Link href="/student_reg" className="button-link">
            Add your profile <span className="button-arrow" aria-hidden="true">→</span>
          </Link>
        </div>
        <aside className="welcome-aside" aria-label="Directory information">
          <div>
            <p className="welcome-aside-label">In the directory</p>
            <p className="welcome-aside-number">{students.length.toString().padStart(2, '0')}</p>
          </div>
          <p className="welcome-aside-copy">students to be thankful for in our campus community.</p>
        </aside>
      </div>

      <div className="directory-heading">
        <div>
          <p className="section-kicker">The community</p>
          <h2 className="section-title">Meet your classmates</h2>
          <p className="section-description">
            A few of the people who make this campus a place to belong.
          </p>
        </div>
        <span className="student-count">
          <span className="student-count-dot" aria-hidden="true" />
          {students.length} students
        </span>
      </div>

      {databaseError && (
        <p role="alert" className="database-alert">
          Student records could not be loaded from the database. Showing sample students instead.
        </p>
      )}
      <div className="student-grid">
        {students.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>
    </section>
  );
}
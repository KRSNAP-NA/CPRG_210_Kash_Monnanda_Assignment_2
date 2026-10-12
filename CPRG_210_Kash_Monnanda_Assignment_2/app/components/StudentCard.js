import Image from 'next/image';


const StudentCard = ({ student }) => {
    return (
        <article className="student-card">
            <div className="student-card-top">
            <Image
                src={student.image}
                alt={student.name}
                width={150}
                height={150}
                sizes="(max-width: 640px) 112px, 150px"
                className="student-avatar"
                />
                <div>
                    <h3 className="student-name">{student.name}</h3>
                    <span className="student-id">STUDENT #{student.id}</span>
                </div>
            </div>
            <p className="student-program">{student.program}</p>
            {student.tagline && <p className="student-tagline">{student.tagline}</p>}
            <div className="student-meta">
                <span className="student-chip">
                    Year {String(student.year).replace(/^Y/i, "")}
                </span>
            </div>
            {(student.email || student.phone) && (
                <div className="student-contact">
                    {student.email && <span>{student.email}</span>}
                    {student.phone && <span>{student.phone}</span>}
                </div>
            )}
        </article>
    )}

    export default StudentCard;
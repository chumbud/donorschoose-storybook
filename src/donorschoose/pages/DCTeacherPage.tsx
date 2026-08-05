import '../tokens.css';
import './dc-teacher-page.css';
import { DCHeader } from '../DCHeader';
import { DCFooter } from '../DCFooter';
import { DCButton } from '../DCButton';
import { DCAvatar } from '../DCAvatar';
import { DCIcon } from '../DCIcon';
import { DCGiveWidget } from '../DCGiveWidget';
import { DCShareTools } from '../DCShareTools';
import { classroomPhoto } from '../placeholderPhotos';

export interface DCTeacherPageProps {
  /** Whether a donor is signed in (affects the header + follow control). */
  loggedIn?: boolean;
  teacher?: string;
  school?: string;
  location?: string;
}

export function DCTeacherPage({
  loggedIn = false,
  teacher = 'Ms. Mitzy Diaz',
  school = 'Monterey Elementary School',
  location = 'San Bernardino, CA',
}: DCTeacherPageProps) {
  return (
    <div className="dc-tp">
      <DCHeader user={loggedIn ? { name: teacher.split(' ')[1] ?? teacher } : undefined} />

      {/* Purple hero */}
      <div className="dc-tp__hero">
        <div className="dc-tp__hero-inner">
          <div className="dc-tp__profile">
            <DCAvatar className="dc-tp__avatar" name={teacher} placeholder="teacher-1" size={96} ring />
            <h1 className="dc-tp__name">{teacher}</h1>
            <ul className="dc-tp__meta">
              <li>
                <DCIcon name="home" size={16} /> {school}
              </li>
              <li>
                <DCIcon name="location" size={16} /> {location}
              </li>
              <li>
                <DCIcon name="star" size={16} /> Historically underfunded school
              </li>
            </ul>
          </div>

          <DCGiveWidget
            title={`Donate to ${teacher}'s classroom`}
            subtitle="Every donation goes towards supplies this classroom needs"
            amounts={[15, 25, 50, 100]}
            defaultAmount={50}
          />
        </div>
      </div>

      {/* Trust */}
      <section className="dc-tp__section dc-tp__trust">
        <div className="dc-tp__section-inner">
          <p className="dc-tp__eyebrow">Give with confidence</p>
          <h2>Trusted by millions of teachers and donors</h2>
          <p>
            We're a teacher-founded nonprofit with top ratings from Charity Navigator, CharityWatch,
            and Guidestar.
          </p>
          <a href="#">Learn more about DonorsChoose</a>
        </div>
      </section>

      {/* About */}
      <section className="dc-tp__section">
        <div className="dc-tp__section-inner">
          <p className="dc-tp__eyebrow">About DonorsChoose classrooms</p>
          <div className="dc-tp__about-grid">
            <div>
              <p>
                Students across the country come to school each day eager to learn, grow, and reach
                their full potential. Every classroom thrives when students have access to the
                supplies and resources that bring lessons to life, spark curiosity, and build
                confidence. Thanks to generous donors like you, students gain the tools they need to
                succeed in the classroom and beyond.
              </p>
              <DCButton
                variant="secondary"
                icon={<DCIcon name="bookmark" size={16} />}
                style={{ background: 'var(--dc-white)' }}
              >
                {loggedIn ? `Following ${teacher}` : `Follow ${teacher} for updates`}
              </DCButton>
            </div>
            <div
              className="dc-tp__photo"
              role="img"
              aria-label="Classroom"
              style={{
                backgroundImage: `url("${classroomPhoto('teacher-page-classroom')}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </div>
        </div>
      </section>

      {/* How funds are used */}
      <section className="dc-tp__section dc-tp__funds">
        <div className="dc-tp__section-inner">
          <p className="dc-tp__eyebrow">How funds are used</p>
          <h2>Where your generosity actually lands</h2>
          <p>
            There's no shopping cart here — just a classroom and the things kids need to thrive in
            it. Every dollar goes directly toward the moments that make school feel exciting, safe,
            and full of possibility.
          </p>
          <p className="dc-tp__reqlabel">Current requests</p>
          <div className="dc-tp__request">
            <h3>TK/Kinder Special Needs classroom</h3>
            <p>
              "Help me give my students basic teacher supplies to create individualized learning
              materials and maintain a clean, organized, welcoming environment."
            </p>
            <span className="dc-project-card__progress">
              <span className="dc-project-card__progress-fill" style={{ width: '72%' }} />
            </span>
          </div>
        </div>
      </section>

      {/* Pass it on */}
      <section className="dc-tp__section dc-tp__pass">
        <div className="dc-tp__section-inner">
          <h2>Can't give today? Pass it on.</h2>
          <p>
            On average, each share can inspire $50 in donations by helping this teacher reach more
            people.
          </p>
          <DCShareTools heading={null} description={null} platforms={['facebook', 'email', 'nextdoor']} />
        </div>
      </section>

      <DCFooter trustBanner={false} />
    </div>
  );
}

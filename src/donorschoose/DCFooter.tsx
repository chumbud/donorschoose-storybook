import './tokens.css';
import './dc-footer.css';
import { DCButton } from './DCButton';
import { DCIcon } from './DCIcon';

export function DCTrustBanner() {
  return (
    <section className="dc-trust">
      <div className="dc-trust__inner">
        <h2>DonorsChoose is the most trusted classroom funding site for teachers.</h2>
        <p>
          As a teacher-founded nonprofit, we're trusted by thousands of teachers and supporters
          across the country. This classroom request for funding was created by a teacher and
          reviewed by the DonorsChoose team.
        </p>
        <DCButton variant="secondary">See how DonorsChoose works</DCButton>
      </div>
    </section>
  );
}

const COLUMNS = [
  {
    title: 'About Us',
    links: ['Mission', 'Impact', 'Student Focus', 'Finances', 'Staff & Board', 'Careers', 'Web Accessibility'],
  },
  {
    title: 'Ways to Give',
    links: ['Find a project', 'Account credits', 'Gift cards', 'Donor-advised funds', 'Partner with us', 'Give monthly', 'Volunteer with us', 'Leave a legacy gift', 'Unrestricted gift'],
  },
  {
    title: 'Connect',
    links: ['Help center', 'Communities', 'Media / Blog', 'Open data', 'Design playground', 'Contact us'],
  },
];

export interface DCFooterProps {
  /** Show the yellow trust banner above the footer. Defaults to true. */
  trustBanner?: boolean;
}

export function DCFooter({ trustBanner = true }: DCFooterProps) {
  return (
    <>
      {trustBanner && <DCTrustBanner />}
      <footer className="dc-footer">
        <div className="dc-footer__inner">
          <div className="dc-footer__top">
            <div>
              <h3>Supporting teachers and students since 2000</h3>
              <p>
                DonorsChoose makes it easy for anyone to help a classroom in need. Public school
                teachers create classroom project requests, and you can give any amount to the
                project that inspires you.
              </p>
              <p>
                We've earned the highest possible ratings from Charity Watch, Charity Navigator, and
                Guidestar.
              </p>
              <div className="dc-footer__stats">
                <div>
                  <b>6,757,050</b>
                  <span>supporters</span>
                </div>
                <div>
                  <b>3,539,817</b>
                  <span>projects funded</span>
                </div>
              </div>
              <div>EIN: 13-4129457</div>
            </div>

            {COLUMNS.map((col) => (
              <div className="dc-footer__col" key={col.title}>
                <h3>{col.title}</h3>
                <ul>
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="dc-footer__community">
            <div style={{ fontWeight: 700, color: 'var(--dc-black)' }}>Join our community:</div>
            <div className="dc-footer__social">
              <DCIcon name="heart" size={22} title="Instagram" />
              <DCIcon name="link" size={22} title="LinkedIn" />
              <DCIcon name="chat" size={22} title="Facebook" />
              <DCIcon name="video" size={22} title="TikTok" />
            </div>
            <p>
              Information for <a href="#">Teachers</a>, <a href="#">Principals</a>,{' '}
              <a href="#">District Leaders</a>, and <a href="#">Government Officials</a>
            </p>
            <p>
              Open to every public school in America thanks to <a href="#">our partners</a>
            </p>
            <div className="dc-footer__partners">
              {Array.from({ length: 30 }).map((_, i) => (
                <div className="dc-footer__partner" key={i} />
              ))}
            </div>
          </div>

          <div className="dc-footer__legal">
            © 2000–2026 DonorsChoose, a 501(c)(3) not-for-profit corporation.
            <div style={{ marginTop: '0.5rem' }}>
              <a href="#">Privacy policy</a> · <a href="#">Manage Cookies</a> ·{' '}
              <a href="#">Terms of use</a> · <a href="#">Schools</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

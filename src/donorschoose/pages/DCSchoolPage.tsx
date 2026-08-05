import '../tokens.css';
import './dc-page.css';
import { DCHeader } from '../DCHeader';
import { DCFooter } from '../DCFooter';
import { DCProjectCard } from '../DCProjectCard';
import { DCHeading, DCText, DCSubheader } from '../DCText';
import { DCAvatar } from '../DCAvatar';
import { DCIcon } from '../DCIcon';
import { projects } from '../mockProjects';

/** School profile page — hero with school stats, then that school's projects
 *  across every state. */
export function DCSchoolPage() {
  return (
    <div className="dc-page">
      <DCHeader />

      <div className="dc-page__hero">
        <div className="dc-page__container" style={{ paddingBottom: '2rem' }}>
          <div className="dc-page__breadcrumb">
            <a href="#">Schools</a> / Illinois / Lincoln Elementary
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <DCAvatar name="Lincoln Elementary" size={80} shape="rounded" />
            <div>
              <DCHeading level={1} as="h1">
                Lincoln Elementary
              </DCHeading>
              <DCSubheader>
                <DCIcon name="location" size={16} /> Chicago, IL · Public school
              </DCSubheader>
            </div>
          </div>
          <div className="dc-page__stat" style={{ marginTop: '1.5rem' }}>
            <div>
              <b>128</b>
              <span>Projects funded</span>
            </div>
            <div>
              <b>$96k</b>
              <span>Raised all-time</span>
            </div>
            <div>
              <b>34</b>
              <span>Teachers</span>
            </div>
            <div>
              <b>92%</b>
              <span>Students from low-income households</span>
            </div>
          </div>
        </div>
      </div>

      <div className="dc-page__container">
        <DCHeading level={2}>Current projects</DCHeading>
        <DCText variant="discreet" style={{ marginTop: '-0.5rem' }}>
          Every state a project can be in — active, almost there, funded, friends &amp; family, and
          matched.
        </DCText>
        <div className="dc-page__grid" style={{ marginTop: '1.25rem' }}>
          {projects.map((p) => (
            <DCProjectCard key={p.title} {...p} school="Lincoln Elementary" location="Chicago, IL" />
          ))}
        </div>
      </div>
      <DCFooter trustBanner={false} />
    </div>
  );
}

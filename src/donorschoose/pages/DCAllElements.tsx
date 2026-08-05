import { useState } from 'react';
import '../tokens.css';
import './dc-page.css';
import { DCHeader } from '../DCHeader';
import { DCHeading, DCSubheader, DCText } from '../DCText';
import { DCButton } from '../DCButton';
import { DCInput, DCSelect, DCSearchInput, DCCheck } from '../DCInput';
import { DCTooltip } from '../DCTooltip';
import { DCAvatar, DCAvatarGroup } from '../DCAvatar';
import { DCIcon } from '../DCIcon';
import { DCProjectCard } from '../DCProjectCard';
import { DCModal } from '../DCModal';
import { DCMap, DCMapPin, DCMapPopup } from '../DCMap';
import { projects } from '../mockProjects';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section style={{ margin: '2.5rem 0' }}>
    <DCHeading level={3}>{title}</DCHeading>
    {children}
  </section>
);

/** Kitchen-sink page showing every DonorsChoose component together. */
export function DCAllElements() {
  const [open, setOpen] = useState(false);
  return (
    <div className="dc-page">
      <DCHeader user={{ name: 'Jordan' }} />
      <div className="dc-page__container">
        <DCHeading level={1}>Component library</DCHeading>
        <DCSubheader>Every DonorsChoose element in one place.</DCSubheader>

        <Section title="Text">
          <DCHeading level={2}>Heading 2</DCHeading>
          <DCText>
            Body copy in the DonorsChoose stack. <a href="#">Links</a> use link blue.
          </DCText>
          <DCText variant="discreet">Discreet text for captions and metadata.</DCText>
        </Section>

        <Section title="Buttons">
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <DCButton>Give</DCButton>
            <DCButton variant="secondary">Cancel</DCButton>
            <DCButton icon={<DCIcon name="heart" size={20} />}>Favorite</DCButton>
            <DCButton loading>Processing</DCButton>
            <DCButton disabled>Disabled</DCButton>
            <DCButton onClick={() => setOpen(true)}>Open modal</DCButton>
          </div>
        </Section>

        <Section title="Inputs">
          <div style={{ maxWidth: 420, display: 'grid', gap: '0.75rem' }}>
            <DCInput label="Email" placeholder="you@example.com" />
            <DCSelect label="Grade" defaultValue="">
              <option value="">Choose…</option>
              <option>Grades K-2</option>
              <option>Grades 3-5</option>
            </DCSelect>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <DCCheck label="Monthly" defaultChecked />
              <DCCheck type="radio" name="k" label="One-time" defaultChecked />
              <DCCheck type="radio" name="k" label="Recurring" />
            </div>
            <DCSearchInput />
          </div>
        </Section>

        <Section title="Tooltip, avatars & icons">
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <DCTooltip content="100% reaches the classroom" open>
              <DCButton variant="secondary" size="small">
                Hover me
              </DCButton>
            </DCTooltip>
            <DCAvatarGroup
              people={[{ name: 'Ana Ruiz' }, { name: 'Ben Ng' }, { name: 'Cara Poe' }, { name: 'Dev Rao' }, { name: 'Eli Cho' }]}
            />
            <div style={{ display: 'flex', gap: '0.75rem', color: 'var(--dc-grey)' }}>
              {['heart', 'search', 'cart', 'mail', 'star', 'check', 'location'].map((n) => (
                <DCIcon key={n} name={n} size={24} />
              ))}
            </div>
          </div>
        </Section>

        <Section title="Project card — all states">
          <div className="dc-page__grid">
            {projects.map((p) => (
              <DCProjectCard key={p.title} {...p} />
            ))}
          </div>
        </Section>

        <Section title="Map">
          <DCMap height={320}>
            <DCMapPin x={30} y={40} count={8} />
            <DCMapPin x={62} y={34} count={12} active />
            <DCMapPin x={48} y={64} count={3} />
            <DCMapPopup x={62} y={34}>
              <div style={{ fontFamily: 'var(--dc-font-headline)', fontWeight: 700 }}>Chicago, IL</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--dc-grey)' }}>12 projects need funding</div>
            </DCMapPopup>
          </DCMap>
        </Section>
      </div>

      <DCModal
        open={open}
        onClose={() => setOpen(false)}
        title="Complete your donation"
        footer={
          <>
            <DCButton variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </DCButton>
            <DCButton onClick={() => setOpen(false)}>Give $25</DCButton>
          </>
        }
      >
        <DCText>100% of your donation reaches the classroom.</DCText>
      </DCModal>
    </div>
  );
}

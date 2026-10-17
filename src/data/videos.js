// Patient-education videos: ONE definition per video, used by the page that plays it (the video
// player in src/App.jsx), the step list printed under it (so the content works without the video
// and is indexable) and its VideoObject JSON-LD.
// Files live in public/videos/. implant-steps.mp4 is the owner's animation (18 Oct 2026),
// re-encoded to H.264 Main profile with the index at the front (faststart), no audio track.

export const implantStepsVideo = {
  src: '/videos/implant-steps.mp4',
  poster: '/videos/implant-steps-poster.webp',
  // JPEG copy of the same frame (step 7) for the JSON-LD thumbnail.
  thumbnail: '/videos/implant-steps-poster.jpg',
  width: 1080,
  height: 1350,
  duration: 'PT36S',
  uploadDate: '2026-10-18',
  name: 'How a dental implant is placed: the 7 steps',
  description:
    'A short Apex Dental patient-education animation showing how a dental implant is placed in seven steps: checking the bone, numbing and access, preparing the site, placing the implant, healing, the abutment and the crown. Simplified illustration, not to scale.',
  disclaimer: 'Simplified illustration, not to scale. Ask your dentist about your own treatment.',
  steps: [
    {
      title: 'The missing tooth',
      text: "The tooth is gone but the jawbone beneath it is still healthy, and that bone is what will hold the implant. Before treatment, X-rays or a 3D scan check the bone's height and width.",
    },
    {
      title: 'Numbing and access',
      text: 'The area is numbed with local anaesthetic and the dentist opens a small flap of gum to reach the bone. You feel pressure, not pain.',
    },
    {
      title: 'Preparing the site',
      text: "A pilot drill makes a narrow channel, then slightly wider drills shape it to the implant's exact size. Slow drill speeds with constant water spray keep the bone cool.",
    },
    {
      title: 'Placing the implant',
      text: 'The titanium implant is screwed into the bone, where it acts as a new tooth root. The dentist checks that it sits firmly before closing.',
    },
    {
      title: 'Healing',
      text: 'A cover screw goes on and the gum is closed over the implant. Over the following months the bone grows tight against the titanium, which is called osseointegration. This usually takes 3 to 6 months.',
    },
    {
      title: 'Abutment',
      text: 'Once healed, a small connector called an abutment is fixed to the top of the implant and rises just above the gum. The gum settles around it in 1 to 2 weeks.',
    },
    {
      title: 'Crown',
      text: 'A custom crown, shaped and shaded to match your other teeth, is fixed onto the abutment, either cemented or screwed in place. It looks and chews like a natural tooth: brush and floss it like any tooth.',
    },
  ],
};

// Looked up by key from blog posts (src/data/blogPosts.js: a post's `video` field and its
// { type: 'video' } content blocks).
export const videos = {
  'implant-steps': implantStepsVideo,
};

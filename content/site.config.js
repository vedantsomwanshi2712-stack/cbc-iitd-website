// Everything that changes week to week lives here. Edit, save, push: the site updates.
// Leave a value as null to hide that part of the page.
window.SITE = {
  joinUrl: "https://www.jotform.com/253555944387168",

  nextMeetup: {
    title: null,          // e.g. "From prompt to product with Claude Code"
    date: null,           // ISO with time zone, e.g. "2027-01-15T18:00:00+05:30" (countdown appears when set)
    venue: null,          // e.g. "LHC 108"
    note: "Date coming soon. Join the club to get the invite."
  },

  updates: [
    { tag: "Meetup",    title: "Next meetup: date coming soon", body: "Join the club and the invite lands in your inbox.", url: null },
    { tag: "Workshop",  title: "First workshop: Claude Code + Skills", body: "Set up Claude Code live and build your first project in the room.", url: null },
    { tag: "Hackathon", title: "Campus-wide hackathon this spring", body: "Build with Claude, demo it, win prizes. Participants get an extra $50 in API credits.", url: null }
  ],

  perks: [
    { title: "$25 in Claude API credits", body: "For every member. Check in at a meetup with your Claude Console Org ID." },
    { title: "+$50 for hackathon builders", body: "Extra API credits for everyone who builds at the spring hackathon." },
    { title: "Stickers and thinking caps", body: "Claude merch, handed out at meetups and workshops." },
    { title: "More perks for members", body: "Announced at meetups. Show up to find out." }
  ],

  team: [
    { name: "Manogya", role: "Claude Campus Ambassador", photo: null, linkedin: null },
    { name: "Vedant", role: "Claude Campus Ambassador", photo: null, linkedin: null }
  ],

  // Phase 1: approved projects are added here by hand. Phase 2 moves this to a database with voting.
  projects: [],
  submitProjectUrl: null,   // a Google/Jot form for submissions, once made

  social: { instagram: null, linkedin: null }
};

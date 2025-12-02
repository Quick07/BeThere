# BeThere 🎯

A modern web app for college-aged users to coordinate social plans by sharing live statuses, day plans, and joining friends' activities.

![BeThere Preview](./public/preview.png)

## ✨ Features

- **Live Status Updates**: Create and share what you're doing or in the mood for
- **24-Hour Day Tracker**: Visual timeline to schedule and view activities
- **Friend Participation**: See who's joining activities and opt-in without messaging
- **Quick Exit**: Signal "Leaving in 5 min" with visual striped indicator
- **Privacy Controls**: Per-activity visibility settings and friend groups
- **Real-time Updates**: Instant notifications when friends create or update activities
- **Notification Muting**: Granular control over notifications per friend/group

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL (for production)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bethere.git
cd bethere
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. Set up the database (optional for demo mode):
```bash
npm run db:generate
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Database ORM**: Prisma
- **Real-time**: Socket.IO (WebSockets)
- **Drag & Drop**: @dnd-kit
- **Icons**: Lucide React
- **Date Handling**: date-fns

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles & Tailwind
│   ├── layout.tsx         # Root layout with fonts
│   └── page.tsx           # Main application page
├── components/
│   ├── ui/                # Reusable UI primitives
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Avatar.tsx
│   │   └── Badge.tsx
│   ├── layout/            # Layout components
│   │   ├── Header.tsx
│   │   └── AppShell.tsx
│   ├── status/            # Status sidebar
│   │   └── StatusSidebar.tsx
│   ├── tracker/           # Day tracker
│   │   └── DayTracker.tsx
│   ├── activity/          # Activity components
│   │   ├── ActivityBlock.tsx
│   │   └── ActivityModal.tsx
│   ├── friends/           # Friends panel
│   │   └── FriendsPanel.tsx
│   └── notifications/     # Toast notifications
│       └── NotificationToasts.tsx
├── store/                 # Zustand state stores
│   ├── userStore.ts
│   ├── friendsStore.ts
│   ├── activitiesStore.ts
│   ├── notificationsStore.ts
│   └── uiStore.ts
├── hooks/                 # Custom React hooks
│   └── useWebSocket.ts
├── lib/                   # Utilities & constants
│   ├── utils.ts
│   └── constants.ts
├── types/                 # TypeScript types
│   └── index.ts
└── prisma/
    └── schema.prisma      # Database schema
```

## 🎨 Key UI Components

### Status Sidebar
- List of pre-defined and custom statuses
- Drag-and-drop onto day tracker to create activities
- Click to quick-schedule (1-hour block at next available time)

### Day Tracker
- 24-hour scrollable timeline
- Color-coded activity blocks
- Current time indicator
- Drag to reposition, resize activities
- Visual "ending soon" stripes

### Friends Panel
- Online/offline friend grouping (Discord-style)
- Search functionality
- Visibility checkboxes per activity
- Friend groups for batch visibility

### Activity Modal
- Full activity details
- Participant list with avatars
- Join/Leave functionality
- Quick exit button (owner)
- Visibility settings

## 🔒 Privacy Model

1. **Group Default**: Activities inherit visibility from day tracker's assigned group
2. **Per-Activity Override**: Checkboxes allow custom visibility per friend
3. **Blocked Users**: Always excluded from viewing

## 📡 Real-time Events

The app uses WebSockets for real-time updates:

- `activity.created` - New activity from visible friend
- `activity.updated` - Activity time/details changed
- `activity.deleted` - Activity removed
- `activity.endingSoon` - Quick exit triggered
- `participant.joined` - Someone joined an activity
- `participant.left` - Someone left an activity
- `presence.updated` - Friend online/offline status

## 🧪 Demo Mode

The app runs in demo mode by default with pre-seeded data:
- Demo user account
- Sample friends (online/offline)
- Friend groups
- Pre-scheduled activities
- Sample notifications

No database setup required to explore the UI!

## 📝 Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run db:generate # Generate Prisma client
npm run db:push    # Push schema to database
npm run db:studio  # Open Prisma Studio
```

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

Built with ❤️ for making social plans effortless.

